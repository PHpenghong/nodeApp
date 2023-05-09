const resCode = require('../utils/ResCode')
const RoleService = require('../service/RoleService')
const RoleModels = require('../models/Role')

/**
 * 全部角色数据
 */
const getRole = async (req, res) => {
  try {
    const { err: errRole, res: resRole } = await RoleService.getRole()
    if (errRole) {
      throw 'Internal Server Error'
    }
    // let data = []
    // console.log(resRole[0])
    // if (resRole.length > 0) {
    //   data = resRole.map((i) => i.router_id)
    // }
    return resCode(res, 200, '请求成功', resRole)
  } catch (err) {
    return resCode(res, 500, err)
  }
}

/**
 *
 * @param {Number} role
 * @returns
 */
const getRouterRole = async (req, res) => {
  try {
    const { role } = req.body
    if (role === undefined) return resCode(res, 1008)
    const { err: errRole, res: resRole } = await RoleService.getRouterById(role)
    if (errRole) {
      throw 'Internal Server Error'
    }
    let data = []
    if (resRole.length > 0) {
      data = resRole.map((i) => i.router_id)
    }
    return resCode(res, 200, '请求成功', data)
  } catch (err) {
    return resCode(res, 500, err)
  }
}

/**
 *
 * @param {Number} role
 * @param {Array as String[]} role_list
 * @returns
 */
const save = async (req, res) => {
  try {
    const { role, role_list } = req.body
    const { err: errRole, res: resRole } = await RoleService.getRouterById(role)
    if (errRole) {
      throw 'Internal Server Error'
    }
    let nowData = []
    if (resRole.length > 0) {
      nowData = resRole.map((i) => i.router_id)
    }
    const delData = nowData.filter((i) => !~role_list.indexOf(i))
    const addData = role_list.filter((i) => !~nowData.indexOf(i))
    const saveRes = await RoleModels.save(role, delData, addData)
    if (saveRes.some((i) => i.err)) {
      await RoleModels.save(role, addData, delData)
      return resCode(res, 1009, '修改失败')
    }

    return resCode(res, 200, '修改成功')
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const add = async (req, res) => {
  try {
    const { label } = req.body
    const { err: errRole } = await RoleService.addRole(label)
    if (errRole) {
      throw 'Internal Server Error'
    }
    return resCode(res, 200, '修改成功')
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const edit = async (req, res) => {
  try {
    const { id, label } = req.body
    const { err: errRole } = await RoleService.editRoleById(id, label)
    if (errRole) {
      throw 'Internal Server Error'
    }
    return resCode(res, 200, '修改成功')
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const del = async (req, res) => {
  try {
    const { id } = req.body
    const { err: errRole } = await RoleService.delRole(id)
    if (errRole) {
      throw 'Internal Server Error'
    }
    return resCode(res, 200, '删除成功')
  } catch (err) {
    return resCode(res, 500, err)
  }
}

const Role = {
  getRole,
  getRouterRole,
  save,
  add,
  edit,
  del
}

module.exports = Role
