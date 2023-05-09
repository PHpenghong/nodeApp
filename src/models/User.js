const { getUserList, getUserCount } = require('../service/UserService')
const { reqAll } = require('./index')

const search = async (page, page_size, disable, role, filter) => {
  const param1 = {}
  const param2 = {}
  if (disable !== undefined && disable) {
    if (typeof disable === 'string') {
      disable = parseInt(disable, 10)
    }
    param1.disable = disable
  }

  if (!role || role !== undefined) param2.role_id = role
  const reqList = [
    {
      req: getUserList,
      param: [
        page,
        page_size,
        param1,
        param2,
        {
          name: {
            start: true,
            end: true,
            val: filter,
            alias: 'u'
          },
          email: {
            start: true,
            end: true,
            val: filter,
            alias: 'u'
          }
        }
      ]
    },
    { req: getUserCount, param: [param1, param2] }
  ]
  return reqAll(reqList)
}

const UserModels = {
  search
}

module.exports = UserModels
