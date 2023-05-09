const db = require('../utils/dbQuery')

/**
 * get user list
 * @param {Number} page
 * @param {Number} page_size
 * @param {Object} param1
 * @param {Object} param2
 * @returns
 */
const getUserList = async ([
  page,
  page_size,
  param1 = {},
  param2 = {},
  vagueParam
]) =>
  db.query(
    `SELECT u.id,u.name,u.email,u.phone,u.avatar, u.disable, ru.role_id  FROM users u ,role_users ru WHERE is_del = 0 AND u.id = ru.user_id ${db.andParam(
      param1,
      'u',
      true
    )} ${db.andParam(param2, 'ru')} ${db.vagueParam(
      vagueParam,
      true
    )} limit ${db.valType(page - 1)}, ${db.valType(page_size)};`
  )

/**
 * 用户总数
 * @param {Object} param1
 * @param {Object} param2
 * @returns
 */
const getUserCount = async ([param1 = {}, param2 = {}]) =>
  db.query(
    `SELECT COUNT(1)  FROM users u,role_users ru WHERE is_del = 0 AND u.id = ru.user_id ${db.andParam(
      param1,
      'u',
      true
    )} ${db.andParam(param2, 'ru')};`
  )

/**
 * @param {String} email
 */
const getUserByEmail = async (email) =>
  db.query(
    `SELECT * FROM users WHERE is_del = 0 AND email = LOWER(${db.valType(
      email
    )});`
  )

/**
 * @param {String} id
 */
const getUserById = async (id) =>
  await db.query(`SELECT * FROM users WHERE id = LOWER(${db.valType(id)});`)

/**
 * 全部用户
 */
const getUserAll = async () => db.query(`SELECT * FROM users WHERE is_del = 0;`)

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
 * max id
 * @returns
 */
const maxUserId = async () => db.query(`SELECT MAX(id) FROM users;`)

/**
 * 用户绑定角色
 * @param {Number} role_id
 * @param {Number} user_id
 * @returns
 */
const insertRoleUser = async (role_id, user_id) =>
  db.query(
    `INSERT INTO role_users (role_id, user_id) VALUES (${db.valType(
      role_id
    )}, ${db.valType(user_id)});`
  )

/**
 *
 * @param {String} id
 * @param {Number} timer
 */
const userLogin = async (id, timer) =>
  db.query(
    `UPDATE users SET last_login = ${db.valType(timer)} WHERE id = ${db.valType(
      id
    )}`
  )

/**
 * 上传头像
 * @param {Number} id
 * @param {String} file
 */
const uploadAvatar = async (id, file) =>
  db.query(
    `UPDATE users SET avatar = ${db.valType(file)} WHERE id = ${db.valType(id)}`
  )

/**
 * 禁用用户
 * @param {Number} id
 */
const disableUser = async (id) =>
  db.query(`UPDATE users SET disable = 1 WHERE id = LOWER(${db.valType(id)});`)

/**
 * 删除用户
 * @param {Number} id
 */
const delUserById = async (id) =>
  db.query(
    `UPDATE users SET is_del = 1, del_time = now() WHERE id = LOWER(${db.valType(
      id
    )});`
  )

const UserService = {
  getUserList,
  getUserCount,
  getUserByEmail,
  getUserById,
  getUserAll,
  addUser,
  maxUserId,
  insertRoleUser,
  userLogin,
  uploadAvatar,
  disableUser,
  delUserById
}

module.exports = UserService
