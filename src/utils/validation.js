const { check } = require('express-validator')

const signupValidation = [
  check('name', '请输入用户名').not().isEmpty(),
  check('email', '请输入合法的邮箱').isEmail(),
  check('email', '请输入合法的邮箱').isEmail(),
  check('password', '密码至少是6位且最长16位').isLength({ min: 6, max: 16 }),
  check('role', '请选择用户角色').not().isEmpty()
]

const loginValidation = [
  check('email', '请输入合法的邮箱').isEmail(),
  check('password', '密码至少是6位哦').isLength({ min: 6 })
]

module.exports = {
  signupValidation,
  loginValidation
}
