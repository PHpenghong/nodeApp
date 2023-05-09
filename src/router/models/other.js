const express = require('express')
const svgCaptcha = require('svg-captcha')
const redis = require('../../db/redis')

const router = express.Router()

router.get('/captcha/:timer', async (req, res) => {
  const { timer } = req.params
  const cap = svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 3,
    // 宽度
    width: 80,
    // 高度
    height: 30
  })
  redis.setEx(`${timer}`, 60 * 3, cap.text.toLowerCase())
  req.session.captcha = cap.text // session 存储验证码数值
  res.type('svg') // 响应的类型
  return res.send(cap.data)
})

module.exports = router
