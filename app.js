const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const indexRouter = require('./src/router/index')
const session = require('express-session')
const errMiddle = require('./src/middleware/errMiddle')
const Check = require('./src/utils/check')
const resCode = require('./src/utils/ResCode')

const app = express()

app.use(
  session({
    secret: 'SECRET_NODE_KEY', // 设置签名秘钥  内容可以任意填写
    cookie: { maxAge: 60 * 60 * 1000 }, // 设置cookie的过期时间，例：80s后session和相应的cookie失效过期
    resave: true, // 强制保存，如果session没有被修改也要重新保存
    saveUninitialized: false // 如果原先没有session那么久设置，否则不设置
  })
)

if (process.env.APP_ENV === 'production') {
  const logger = require('morgan') // 日志模块
  const fs = require('fs') // 文件模块
  const path = require('path')
  const FileStreamRotator = require('file-stream-rotator')
  const logDirectory = path.join(__dirname, 'logs')

  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

  // 创建输出流
  var errorLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD', // 日期类型
    filename: path.join(logDirectory, '%DATE%-error.log'), // 文件名
    frequency: 'daily', // 每天的频率
    verbose: false
  })
  // 创建输出流
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, '%DATE%-access.log'),
    frequency: 'daily',
    verbose: false
  })
  // 写正常访问请求的log日志
  app.use(
    logger('combined', {
      skip: (req, res) => res.statusCode >= 400,
      stream: accessLogStream
    })
  )
  // 写访问出错的log日志
  app.use(
    logger('combined', {
      skip: (req, res) => res.statusCode < 400,
      stream: errorLogStream
    })
  )
}

app.use(express.json())

// 解析请求体
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// 添加接口拦截器
app.use(async (req, res, next) => {
  try {
    // 从请求头获取 JWT Token
    const code = await Check.reqBefore(req, res)
    if (code != undefined && code > 0) {
      return resCode(res, code)
    }
    next()
  } catch (err) {
    return res.status(401).json({ message: '登录过期，请重新登录' })
  }
})

app.use(cors())

app.use('/api', indexRouter)

// 处理错误
app.use(errMiddle())

app.listen(3000, () => console.log(`服务启动成功：http://localhost:3000`))

module.exports = app
