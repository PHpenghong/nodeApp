const Token = require('./token')

const whitelist = ['/api/captcha/', '/api/users/login', '/api/users/register']

const Check = {
  checkToken: async (req, res) => {
    let code = 0
    const { err, result, token } = await Token.checkToken(req)
    if (err) {
      code = 1003
    }
    if (result?.err) {
      code = 1004
    }
    if (result.res?.length > 0) {
      req.body.userInfoObj = result.res[0] || {}
    } else {
      code = 1005
    }
    if (token) {
      res.set({ authorization: token })
    }
    return code
  },
  reqBefore: async (req, res) => {
    if (whitelist.some((route) => req.path.startsWith(route))) {
      return 0
    }
    return await Check.checkToken(req, res)
  }
}

module.exports = Check
