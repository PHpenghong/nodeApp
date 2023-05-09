const express = require('express')
const validator = require('../../utils/validation')
const User = require('../../controllers/UserController')
const multer = require('multer') // 指定路径的

const router = express.Router()

router.post('/register', validator.signupValidation, User.register)

router.post('/logout', User.logout)

router.post('/login', validator.loginValidation, User.login)

router.post('/getUser', validator.signupValidation, User.getUserInfo)

router.post(
  '/uploadAvatar',
  multer({ dest: './static/avatar' }).any(),
  User.uploadAvatar
)

router.post('/search', User.search)

module.exports = router
