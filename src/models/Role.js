const { delRoleRouter, addRoleRouter } = require('../service/RoleService')
const { reqAll } = require('./index')

/**
 *
 * @param {Number} role_id
 * @param {Array as Number[]} delList
 * @param {Array as Number[]} addList
 */
const save = async (role_id, delList = [], addList = []) => {
  const reqList = []
  if (delList.length > 0) {
    delList.map((i) => {
      reqList.push({ req: delRoleRouter, param: [role_id, i] })
      return i
    })
  }
  if (addList.length > 0) {
    addList.map((i) => {
      reqList.push({ req: addRoleRouter, param: [role_id, i] })
      return i
    })
  }
  if (reqList.length === 0) return []
  return reqAll(reqList)
}

const RoleModels = {
  save
}

module.exports = RoleModels
