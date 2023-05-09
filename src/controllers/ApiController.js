const resCode = require('../utils/ResCode')

const save = async (req, res) => {
  try {
    const { userInfoObj, list } = req.body
    const id = userInfoObj.id
    console.log(id)
    console.log('🚀 ~ file: RouterController.js:14 ~ save: ~ list', list)
  } catch (err) {
    return resCode(res, 500, err)
  }
}

const Router = {
  save
}

module.exports = Router
