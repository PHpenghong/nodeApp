/**
 * 0    正常
 * 1001 验证码不正确或已过期
 * 1002 用户名或密码错误
 * 1003 缺少Token
 * 1004 未登录或Token过期
 * 1005 邮箱已被注册
 * 1006 文件上传失败
 */
const returnSycc = (res, code, message, data) =>
  res.status(200).send({
    code: 0,
    message,
    data
  })

const returnErr = (res, code, message) =>
  res.status(200).send({
    code,
    message
  })

const returnErr403 = (res, code, message) =>
  res.status(403).send({
    code,
    message
  })

const returnErr500 = (res, message) =>
  res.status(500).send({
    message
  })

module.exports = (res, code, message = '', data = null) => {
  switch (code) {
    case 200:
      returnSycc(res, code, message, data)
      break
    case 500:
      returnErr500(res, message)
      break
    case 1001:
      returnErr(res, code, message || '验证码不正确或已过期')
      break
    case 1002:
      returnErr(res, code, message || '用户名或密码错误')
      break
    case 1003:
      returnErr403(res, code, message || '缺少Token')
      break
    case 1004:
      returnErr403(res, code, message || 'Token过期')
      break
    case 1005:
      returnErr(res, code, message || '邮箱已被注册')
      break
    case 1006:
      returnErr(res, code, message || '邮箱已被注册')
      break
    case 1007:
      returnErr403(res, code, message || '没有权限')
      break
    case 1008:
      returnErr(res, code, message || '缺少参数')
      break
    case 1009:
      returnErr(res, code, message || '操作失败')
      break
    default:
      returnErr(res, code, message || '未知错误，请联系管理员')
      break
  }
}
