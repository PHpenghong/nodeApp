const Tools = {
  /**
   * list结构转tree
   * @param data list原始数据
   * @param pid 最外层pid
   */
  listToTree: (arr, pid = 0, pidStr = 'parentId') => {
    const map = {}
    const res = []
    for (let i = 0, len = arr.length; i < len; i++) {
      const obj = arr[i]
      const parentId = obj[pidStr]
      const { id } = obj
      if (!map[id]) {
        map[id] = []
      }
      if (parentId == pid) {
        obj.children = map[id]
        res.push(obj)
        continue
      }
      if (!map[parentId]) {
        map[parentId] = []
      }
      obj.children = map[id]
      map[parentId].push(obj)
    }
    return res
  },
  /**
   * 两次编码url
   * @param url
   * @returns
   */
  decode: (url) => decodeURIComponent(decodeURIComponent(url)),
  /**
   * 两次解码url
   * @param url
   * @returns
   */
  encode: (url) => encodeURIComponent(encodeURIComponent(url)),
  /**
   * 函数节流
   * @param time 间隔时间
   */
  throttle: (time = 500) => {
    let timer = null
    let firstTime = true
    return () =>
      new Promise((resolve) => {
        if (firstTime) {
          resolve()
          firstTime = false
        } else if (!timer) {
          timer = setTimeout(() => {
            if (timer) clearTimeout(timer)
            timer = null
            resolve()
          }, time)
        }
      })
  },
  makeMap: (str, expectsLowerCase = false) => {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true
    }
    return expectsLowerCase
      ? (val) => map[val.toLowerCase()]
      : (val) => map[val]
  },

  clone: (target) => {
    let obj = null
    if (typeof target === 'object') {
      if (target instanceof Array) {
        obj = []
        for (const i in target) {
          obj.push(Tools.clone(target[i]))
        }
      } else if (target === null) {
        obj = null
      } else if (target.constructor === RegExp) {
        obj = target
      } else {
        obj = {}
        for (const key in target) {
          obj[key] = Tools.clone(target[key])
        }
      }
    } else {
      obj = target
    }
    return obj
  },
  generateSessionId: (
    length = 32,
    includeSpecialChar = false,
    includeTimestamp = false
  ) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const specialCharacters = '!@#$%^&*()_-+={}[]|\\:;<>,.?/~`'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    if (includeSpecialChar) {
      for (let i = 0; i < 2; i++) {
        result += specialCharacters.charAt(
          Math.floor(Math.random() * specialCharacters.length)
        )
      }
    }
    if (includeTimestamp) {
      result += Date.now().toString()
    }
    return result
  }
}

module.exports = Tools
