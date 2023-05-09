const mysql_query = require('../db/mysql')

const query = async (sql) => {
  console.log('sql：:', sql)
  return await mysql_query(sql)
}
// const escape = (str) => db.escape(str)

const valType = (val) => {
  const type = typeof val
  let res = ''
  switch (type) {
    case 'string':
      res = `'${val}'`
      break
    case 'boolean':
      res = val ? 1 : 0
      break
    case 'number':
      res = val
      break
  }
  return res
}

const selectLimit = (page, pageSize) =>
  `limit ${valType((page - 1) * pageSize)}, ${valType(pageSize)}`

/**
 *
 * @param {Object} data
 * (col1, col2,...) VALUES (val1, val2,....)
 * @returns
 */
const insertParam = (data) => {
  const arr = Object.keys(data)
  let keyRes = ''
  let valRes = ''
  arr.map((i) => {
    if (data[i] !== null && data[i] !== undefined) {
      keyRes = `${keyRes}${keyRes ? ',' : ''}${i}`
      valRes = `${valRes}${valRes ? ',' : ''}${valType(data[i])}`
    }

    return i
  })
  return `(${keyRes}) VALUES(${valRes})`
}

/**
 *
 * @param {Object} data
 * col1=val1,col2=val2,...
 * @returns
 */
const updateParam = (data) => {
  const arr = Object.keys(data)
  let res = ''
  arr.map((i) => {
    if (data[i] !== null && data[i] !== undefined) {
      res = `${res}${res ? ',' : ''}${i}=${valType(data[i])}`
    }

    return i
  })
  return res
}

/**
 *
 * @param {Object} data
 * @param {String} alias  表格别名
 * @param {Boolean} startAnd true 增加 AND 关键字
 * @param {Array as Object[]} vague 模糊查询字段  {key: string, start: '%', end: '%'}
 * col
 * @returns
 */
const andParam = (data, alias = null, startAnd = false) => {
  let res = ''
  Object.keys(data).map((i) => {
    if (data[i] !== null && data[i] !== undefined) {
      res = `${res}${res ? ' AND ' : ''}${
        alias ? `${alias}.${i}` : i
      } = ${valType(data[i])}`
    }
    return i
  })
  return `${startAnd && res ? ' AND ' : ''}${res}`
}

/**
 * 模糊查询参数处理
 *
 * vagueParam { key: { start: true, end: true, val: 'strVal', alias: null} }
 *
 * @param {*} data  { key: {
 *                            start: true // 匹配开始
 *                            end: true // 匹配结束
 *                            val: strVal // 值
 *                            alias: null // 表格别名
 *                         }
 *                  }
 * @param {*} startAnd
 * @returns
 */
const vagueParam = (data, startAnd = false) => {
  let res = ''
  Object.keys(data).map((i) => {
    if (data[i].val) {
      res = `${res}${res ? ' OR ' : ''}${
        data[i].alias ? `${data[i].alias}.${i}` : i
      } LIKE  '${data[i].end ? '%' : ''}${data[i].val}${
        data[i].start ? '%' : ''
      }'`
    }
    return i
  })
  return res ? `${startAnd ? ' AND ' : ''}(${res})` : ''
}

module.exports = {
  query,
  // escape,
  andParam,
  selectLimit,
  insertParam,
  updateParam,
  valType,
  vagueParam
}
