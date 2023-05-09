const UserService = require('../service/UserService')
const UserModels = require('../models/User')
const bcrypt = require('bcryptjs')
const redis = require('../db/redis')
const Check = require('../utils/check')
const Token = require('../utils/token')
const resCode = require('../utils/ResCode')
const fs = require('fs')
const path = require('path')
const random = require('../utils/random')

/**
 * 注册
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
const register = async (req, res) => {
  const { name, email, password, role } = req.body
  const getUser = await UserService.getUserByEmail(email)
  if (getUser.res.length) {
    return resCode(res, 1005, '邮箱已被注册')
  } else {
    // 如果可以注册，
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return resCode(res, 10000, err)
      } else {
        // 密码加密后，存入数据库
        const resAddUser = await UserService.addUser(name, email, hash)
        if (resAddUser.err) {
          return resCode(res, 10000, resAddUser.err)
        }
        const { err: maxIdErr, res: maxId } = await UserService.maxUserId()
        if (maxIdErr) {
          return resCode(res, 10000, resAddUser.err)
        }
        const { err: roleErr } = UserService.insertRoleUser(
          role,
          maxId[0]['MAX(id)']
        )
        if (roleErr) {
          return resCode(res, 10000, resAddUser.err)
        }
        return resCode(res, 200, '用户注册成功')
      }
    })
  }
}

/**
 * 登录
 * @param {String} email
 * @param {String} password
 */
const login = async (req, res) => {
  let val = null
  const { email, password, code, timer } = req.body
  val = redis.exists(`${timer}`)
  if (val != true) {
    const strCode = await redis.get(`${timer}`)
    if (strCode != code) {
      redis.del(`${timer}`)
      return resCode(res, 1001, '验证码不正确')
    }
  } else {
    redis.del(`${timer}`)
    return resCode(res, 1001, '验证码已过期')
  }
  redis.del(`${timer}`)
  const selectEmail = await UserService.getUserByEmail(email)
  // 用户不存在
  if (selectEmail.err) {
    return res.status(400).send({
      message: selectEmail.err
    })
  }
  if (!selectEmail.res.length) {
    return resCode(res, 1002, '用户名或密码错误')
  }
  if (selectEmail.res[0].disable) {
    return resCode(res, 1002, '用户已禁用')
  }
  // 检查密码是否正确
  bcrypt.compare(
    password,
    selectEmail.res[0].password,
    async (bErr, bResult) => {
      if (bErr) {
        return resCode(res, 1002, '用户名或密码错误')
      }
      if (bResult) {
        const now = +new Date()
        const token = await Token.getToken(selectEmail.res[0].id, now)
        await UserService.userLogin(selectEmail.res[0].id, `${now}`)
        return res.status(200).send({
          code: 0,
          message: '登陆成功',
          token,
          user: selectEmail.res[0]
        })
      }
      return resCode(res, 1002, '用户名或密码错误')
    }
  )
}

/**
 * 获取用户信息
 */
const getUserInfo = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const obj = Object.keys(userInfoObj)
    if (obj.length > 0) {
      const data = {}
      obj.map((i) => {
        if (
          !~[
            'password',
            'create_time',
            'last_login_time',
            'last_update_time'
          ].indexOf(i)
        ) {
          data[i] = userInfoObj[i]
        }
        return i
      })
      return resCode(res, 200, '请求成功', data)
    }
    throw 'Internal Server Error'
  } catch (err) {
    return resCode(res, 500, err)
  }
}

/**
 * 登出
 */
const logout = async (req, res) => {
  const { err } = await Token.checkToken(req)
  if (err) {
    return resCode(res, 1003)
  }
  // if (result?.res) {
  //   const val = redis.exists(`${result.res[0].id}`)
  //   if (val != true) {
  //     redis.del(`${result.res[0].id}`)
  //   }
  // }
  return resCode(res, 200, '请求成功')
}

/**
 * 上传头像
 */
const uploadAvatar = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const id = userInfoObj.id
    console.log('🚀 ~ file: UserController.js:165 ~ uploadAvatar: ~ id', id)
    const { originalname } = req.files[0]
    // 创建一个新路径
    const name = `${random.getCode(10)}${+new Date()}${
      path.parse(originalname).ext
    }`
    const newName = `src/static/avatar/${name}`

    const file_path = `${process.cwd()}/${newName}`
    fs.rename(req.files[0].path, newName, function (err) {
      if (err) {
        return resCode(res, 1006, '上传失败')
      } else {
        return resCode(res, 200, '上传成功', file_path)
      }
    })
  } catch (err) {
    return resCode(res, 500, err)
  }
}

/**
 * 分页查询
 */
const search = async (req, res) => {
  try {
    const { page, page_size, disable, role, filter } = req.body
    if (page === undefined || page_size === undefined) {
      return resCode(res, 1008)
    }
    const searchRes = await UserModels.search(
      page,
      page_size,
      disable,
      role,
      filter
    )
    const resData = {
      data: searchRes[0] || [],
      total: searchRes[1][0]['COUNT(1)'] || 0
    }
    return resCode(res, 200, '请求成功', resData)
  } catch (err) {
    return resCode(res, 500, err)
  }
}

/**
 * 续命
 */
const changeToken = async (req, res) => {
  try {
    return resCode(res, 200, '请求成功', {})
  } catch (err) {
    return resCode(res, 500, err)
  }
}

const User = {
  register,
  login,
  getUserInfo,
  logout,
  uploadAvatar,
  search,
  changeToken
}

module.exports = User
