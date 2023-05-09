const db = require('../utils/dbQuery')

/**
 * @param {String} email
 */
const getUserByEmail = async (email) =>
  db.query(`SELECT * FROM users WHERE email = LOWER(${db.valType(email)});`)
/**
 * @param {String} id
 */
const getUserById = async (id) =>
  db.query(`SELECT * FROM users WHERE id = LOWER(${db.valType(id)});`)
/**
 *
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
const addUser = async (name, email, password) =>
  db.query(
    `INSERT INTO users (name, email, password, create_time) VALUES (${db.valType(
      name
    )}, ${db.valType(email)}, ${db.valType(password)}, now())`
  )
/**
 *
 * @param {String} id
 */
const userLogin = async (id, timer) =>
  db.query(
    `UPDATE users SET last_login = ${db.valType(timer)} WHERE id = ${db.valType(
      id
    )}`
  )
const uploadAvatar = async (id, file) =>
  db.query(
    `UPDATE users SET avatar = ${db.valType(file)} WHERE id = ${db.valType(id)}`
  )

const RouterService = {
  getUserByEmail,
  getUserById,
  addUser,
  userLogin,
  uploadAvatar
}

module.exports = RouterService
