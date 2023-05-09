/**
 *
 * @param {Object} reqArr {req: reqName, param: [param1, param2, ...]}
 * @returns
 *
 * sql函数参数接受一定要用 [] 集合形式 const reqName = ([param1, param2, ...]) => {...}
 */
const reqAll = (reqArr) => {
  const allArr = []
  reqArr.map((i) => {
    allArr.push(promiseFunc(i.req, i.param))
    return i
  })
  return Promise.all(allArr)
}

const promiseFunc = (req, param) =>
  new Promise(async (resolve, reject) => {
    const { err, res } = await req(param)
    if (err) {
      reject(err)
    }
    resolve(res)
  })

module.exports = { reqAll }
