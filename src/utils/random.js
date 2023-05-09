function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * 生成含大小字母数字的随机数
 * Generate random numbers with large and small alphanumerics
 * @param {*} num  num > 0
 */
const getCode = (num = 6) => {
  if (num <= 0) num = 6
  let code = ''
  for (let i = 0; i < num; i++) {
    const type = getRandom(1, 3)
    switch (type) {
      case 1:
        code += String.fromCharCode(getRandom(48, 57)) // 数字
        break
      case 2:
        code += String.fromCharCode(getRandom(65, 90)) // 大写字母
        break
      case 3:
        code += String.fromCharCode(getRandom(97, 122)) // 小写字母
        break
      // no default
    }
  }
  return code
}
// 转换字节
const changeByte = (limit) => {
  if (!limit) return ''
  let size = ''
  if (limit < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    size = `${limit.toFixed(2)}B`
  } else if (limit < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = `${(limit / 1024).toFixed(2)}KB`
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = `${(limit / (1024 * 1024)).toFixed(2)}MB`
  } else {
    // 其它转化成GB
    size = `${(limit / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  const sizeStr = `${size}` // 转成字符串
  const index = sizeStr.indexOf('.') // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  if (dou == '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
// 检查字节数量
const getCharLength = (str) => {
  let iLength = 0 // 记录字符的字节数
  for (let i = 0; i < str.length; i++) {
    // 遍历字符串中的每个字符
    if (str.charCodeAt(i) > 255) {
      // 如果当前字符的编码大于255
      iLength += 2 // 所占字节数加2
    } else {
      iLength += 1 // 否则所占字节数加1
    }
  }

  return iLength // 返回字符所占字节数
}
// 纯数字随机数
const getRan = (num = 6) => {
  if (num <= 0) {
    num = 6
  }
  return Math.random().toString().slice(num)
}
// 首字母转大写
const getInitials = (str) => str[0].toUpperCase() + str.substring(1)

const random = {
  getCode,
  changeByte,
  getCharLength,
  getRan,
  getInitials
}

module.exports = random
