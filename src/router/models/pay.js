const express = require('express')
const Pay = require('../../controllers/AlipayController')
const app = express.Router()

app.post('/alipay', Pay.pay)

module.exports = app
