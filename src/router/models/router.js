const express = require('express')
const Router = require('../../controllers/RouterController')
const app = express.Router()

app.get('/getRouter', Router.getRouter)

app.get('/getList', Router.getList)

app.post('/save', Router.save)

app.post('/edit', Router.edit)

app.delete('/del', Router.del)

module.exports = app
