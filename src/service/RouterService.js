const db = require('../utils/dbQuery')

// const dealWithData = (data) => {
//   const arr = Object.keys(data)
//   let keyRes = ''
//   let valRes = ''
//   arr.map((i) => {
//     keyRes = `${keyRes}${keyRes ? ',' : ''}${i}`
//     valRes = `${valRes}${valRes ? ',' : ''}${db.valType(data[i])}`
//     return i
//   })
//   return `(${keyRes}) VALUES(${valRes})`
// }

// const dealWithUpdateData = (data) => {
//   const arr = Object.keys(data)
//   let res = ''
//   arr.map((i) => {
//     res = `${res}${res ? ',' : ''}${i}=${db.valType(data[i])}`
//     return i
//   })
//   return res
// }

/**
 * @returns role
 * @param {Number} id
 */
const getRoleById = async (id) =>
  db.query(
    `SELECT rr.router_id FROM role_users ru, role_router rr WHERE ru.user_id = ${db.valType(
      id
    )} AND ru.role_id = rr.role_id;`
  )
/**
 * @returns router edit
 * @param {String} id
 * @param {Object} data
 */
const editRouterById = async (id, data) =>
  db.query(
    `UPDATE router SET ${db.updateParam(data)} WHERE id = ${db.valType(id)};`
  )
/**
 * @returns router
 */
const getRouter = async (disable = 0) =>
  db.query(
    `SELECT * FROM router WHERE is_del = 0 AND disable <= ${db.valType(
      disable
    )};`
  )
/**
 * @param {String} id
 */
const getRouterById = async (id) =>
  db.query(`SELECT * FROM router WHERE is_del = 0 AND id = ${db.valType(id)};`)
/**
 *
 * @param {Object} data
 */
const addRouter = async (data) =>
  db.query(`INSERT INTO router${db.insertParam(data)};`)
/**
 *
 * @param {String} id
 */
const delRouter = async (id) =>
  db.query(`UPDATE router SET is_del = 1 WHERE id = ${db.valType(id)};`)

const RouterService = {
  getRoleById,
  editRouterById,
  getRouter,
  getRouterById,
  addRouter,
  delRouter
}

module.exports = RouterService
