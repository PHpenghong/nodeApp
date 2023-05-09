require('../utils/global')
const express = require('express')
const users = require('./models/user')
const other = require('./models/other')
const router = require('./models/router')
const role = require('./models/role')
const pay = require('./models/pay')
const app = express.Router()

app.use('/', other)

app.use('/users', users)

app.use('/router', router)

app.use('/role', role)

app.use('/pay', pay)

module.exports = app
