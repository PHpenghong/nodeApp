const db = require('../utils/dbQuery')

/**
 * @returns role
 * @param {String} id
 */
const getRoleById = async (id) =>
  db.query(
    `SELECT rr.router_id FROM role_users ru, role_router rr WHERE ru.user_id = ${db.valType(
      id
    )} AND ru.role_id = rr.role_id;`
  )
/**
 * 全部角色
 */
const getRole = async () => db.query(`SELECT * FROM role;`)
/**
 * @param {Number} id
 */
const getRouterById = async (role_id) =>
  db.query(
    `SELECT router_id FROM role_router WHERE role_id = ${db.valType(role_id)};`
  )
/**
 * 编辑角色Label
 * @returns router edit
 * @param {String} id
 * @param {Object} data
 */
const editRoleById = async (id, label) =>
  db.query(
    `UPDATE role SET label = ${db.valType(label)} WHERE id = ${db.valType(id)};`
  )
/**
 * 新增角色
 * @param {Number} role_id
 * @param {Number} router_id
 */
const addRole = async (label) =>
  db.query(`INSERT INTO role SET label = ${db.valType(label)};`)
/**
 * 新增角色路由关系
 * @param {Number} role_id
 * @param {Number} router_id
 */
const addRoleRouter = async ([role_id, router_id]) =>
  db.query(
    `INSERT INTO role_router (role_id, router_id) VALUES (${db.valType(
      role_id
    )}, ${db.valType(router_id)});`
  )
/**
 * 删除角色
 * @param {Number} id
 */
const delRole = async (id) =>
  db.query(`DELETE FROM role WHERE id = ${db.valType(id)};`)
/**
 * 删除角色路由关系
 * @param {Number} role_id
 * @param {Number} router_id
 */
const delRoleRouter = async ([role_id, router_id]) =>
  db.query(
    `DELETE FROM role_router WHERE role_id = ${db.valType(
      role_id
    )} AND router_id = ${db.valType(router_id)};`
  )

const RouterService = {
  getRoleById,
  getRole,
  getRouterById,
  editRoleById,
  addRole,
  addRoleRouter,
  delRole,
  delRoleRouter
}

module.exports = RouterService
