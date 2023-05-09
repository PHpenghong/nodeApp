const express = require('express')
const Api = require('../../controllers/ApiController')
const app = express.Router()

app.get('/save', Api.save)

module.exports = app
