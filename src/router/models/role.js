const express = require('express')
const Role = require('../../controllers/RoleController')
const app = express.Router()

app.post('/getRole', Role.getRole)

app.post('/getRouterRole', Role.getRouterRole)

app.post('/save', Role.save)

app.post('/add', Role.add)

app.post('/edit', Role.edit)

app.delete('/del', Role.del)

module.exports = app
