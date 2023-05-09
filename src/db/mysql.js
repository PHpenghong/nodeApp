const mysql = require('mysql')

// 创建mysql连接池
const pool = mysql.createPool({
  host: process.env.MYSQL_CONFIG_HOST || '172.16.39.136',
  port: process.env.MYSQL_CONFIG_PORT || 3306,
  user: process.env.MYSQL_CONFIG_USER || 'root',
  password: process.env.MYSQL_CONFIG_PWD || '123456',
  database: process.env.MYSQL_CONFIG_DB || 'nodeapp'
})

// pool.getConnection(function (err) {
//   if (err) {
//     console.log('连接失败 err：', err)
//   } else {
//     console.log('mysql connection susscces...')
//   }
// })

/**
 * @params sql mysql语句
 * @params callback 查询结果后的回调函数，函数的参数为 数据或者 报错
 */
const mysql_query = (sql) =>
  new Promise((resolve) => {
    pool.getConnection(function (err, conn) {
      if (err) console.log(`POOL ==> ${err}`)
      conn.query(sql, (err, res) => {
        // console.log('in---err:', err)
        // console.log('in---res:', res)
        resolve({ err, res })
      })
      conn.release()
    })
  })

module.exports = mysql_query
