const resCode = require('../utils/ResCode')
const RouterService = require('../service/RouterService')
const { clone } = require('../utils/tools')

const dealWithRouter = (router) =>
  router.map((i) => {
    const resArr = {
      component: i.component || '',
      id: i.id,
      name: i.name || '',
      parentId: i.parentId,
      path: i.path || '',
      sort: i.sort,
      redirect: i.redirect || '',
      meta: {
        title: i.title || '',
        title2: i.title2 || '',
        icon: i.icon || '',
        hidden: i.hidden ? true : false,
        isEdit: i.isEdit ? true : false, // To be deleted
        disable: i.disable ? true : false,
        keepAlive: i.keepAlive ? true : false,
        parentRoute: i.parentRoute || '' // To be deleted
        // permission: []
      }
    }
    return resArr
  })

const getRouter = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const id = userInfoObj.id
    const { err: errRole, res: resRole } = await RouterService.getRoleById(id)
    const { err: errRouter, res: resRouter } = await RouterService.getRouter()
    if (errRole || errRouter) {
      throw 'Internal Server Error'
    }
    let data = []
    if (resRole.length > 0) {
      const routers = resRole.map((i) => i.router_id)
      data = resRouter?.filter((i) => ~routers.indexOf(i.id)) || []
    } else {
      data = resRouter
    }
    data = dealWithRouter(data)
    return resCode(res, 200, '请求成功', data)
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const getList = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const id = userInfoObj.id
    const { err: errRole, res: resRole } = await RouterService.getRoleById(id)
    const { err: errRouter, res: resRouter } = await RouterService.getRouter(1)
    if (errRole || errRouter) {
      throw 'Internal Server Error'
    }
    if (errRole || resRole.length === 0) {
      return resCode(res, 1007)
    }
    const data = dealWithRouter(resRouter)
    return resCode(res, 200, '请求成功', data)
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const save = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const id = userInfoObj.id
    const { err: errRole, res: resRole } = await RouterService.getRoleById(id)
    if (errRole) {
      throw 'Internal Server Error'
    }
    if (errRole || resRole[0].role_id > 1) {
      return resCode(res, 1007)
    }
    const { list } = req.body
    if (list && list.length > 0) {
      const routerArr = list.map((i) => {
        i = { ...i, ...i.meta }
        delete i.meta
        return i
      })
      routerArr.map((i) => {
        RouterService.addRouter(i)
        return i
      })
      return resCode(res, 200, '保存成功')
    }
    return resCode(res, 500, '数据不能为空')
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const edit = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const id = userInfoObj.id
    const { err: errRole, res: resRole } = await RouterService.getRoleById(id)
    if (errRole) {
      throw 'Internal Server Error'
    }
    if (errRole || resRole[0].role_id > 1) {
      return resCode(res, 1007)
    }
    const { list } = req.body
    if (list && list.length > 0) {
      const routerArr = list.map((i) => {
        i = { ...i, ...i.meta }
        delete i.meta
        return i
      })
      routerArr.map((i) => {
        const id = i.id
        const data = clone(i)
        delete data.id
        RouterService.editRouterById(id, data)
        return i
      })
      return resCode(res, 200, '修改成功')
    }
    return resCode(res, 500, '数据不能为空')
  } catch (err) {
    return resCode(res, 500, err)
  }
}
const del = async (req, res) => {
  try {
    const { userInfoObj } = req.body
    const id = userInfoObj.id
    const { err: errRole, res: resRole } = await RouterService.getRoleById(id)
    if (errRole) {
      throw 'Internal Server Error'
    }
    if (errRole || resRole[0].role_id > 1) {
      return resCode(res, 1007)
    }
    const { ids } = req.body
    if (ids && ids.length > 0) {
      ids.map((i) => {
        RouterService.delRouter(i)
        return i
      })
      return resCode(res, 200, '删除成功')
    }
    return resCode(res, 500, '数据不能为空')
  } catch (err) {
    return resCode(res, 500, err)
  }
}

const Router = {
  getRouter,
  getList,
  save,
  edit,
  del
}

module.exports = Router
