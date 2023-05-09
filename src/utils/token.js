const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_PH_NODE_KEY'
const UserService = require('../service/UserService')

const token_time = 60

const dealWithTimer = (time) => {
  if (!time) return false
  const now = Date.now()
  const d = new Date(time)
  const diff = (now - d) / 1000
  return diff < 3600 && diff / 60 > token_time - 5
}

const Token = {
  generateToken: async () => {},
  checkToken: async (req) => {
    try {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
      ) {
        return { err: true }
      }
      const theToken = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(theToken, JWT_SECRET)
      let token = null
      if (dealWithTimer(decoded.timer)) {
        token = await Token.getToken(decoded.id, +new Date())
      }
      const getUserRes = await UserService.getUserById(decoded.id)
      return { err: null, result: getUserRes, token }
    } catch (err) {
      return { err: true }
    }
  },
  getToken: async (id, timer) =>
    jwt.sign({ id, timer }, JWT_SECRET, { expiresIn: 60 * token_time })
  // continueToken: async (token) => {}
}

module.exports = Token
