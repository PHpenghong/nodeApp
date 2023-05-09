/**
 * @description: 验证域名格式
 * @param {string} 域名
 * @return {*} boolean
 */
export function checkDomain(domain) {
  const reg =
    /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][-_.a-zA-Z0-9]{0,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,13}|[a-zA-Z0-9-]{2,30}.[a-zA-Z]{2,3})$/
  return reg.test(domain)
}

/**
 * @description: 验证Email
 * @param {string} email
 * @return {*} boolean
 */
export function checkEmail(email) {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return reg.test(email)
}

/**
 * @description: 验证手机
 * @param {string} phone
 * @return {*} boolean
 */
export function checkPhone(phone) {
  const reg =
    /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
  return reg.test(phone)
}

/**
 * @description: 验证URL
 * @param {string} url
 * @return {*} boolean
 */
export function checkURL(url) {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
  return reg.test(url)
}

/**
 * @description: 验证是否为协议 + IP + 端口的URL
 * @param {string} ipport
 * @return {*} boolean
 */
export function checkIPPort(ipport) {
  const reg =
    /^https?:\/\/(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
  return reg.test(ipport)
}

/**
 * @description: 验证是否为IP
 * @param {string} ip
 * @return {*} boolean
 */
export function checkIP(ip) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

/**
 * @description: 验证是否为端口
 * @param {string} port
 * @return {*} boolean
 */
export function checkPort(port) {
  const reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
  return reg.test(port)
}

/**
 * @description: 验证  IP + 端口
 * @param {string} ipport
 * @return {*} boolean
 */
export function checkPortIp(ipport) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
  return reg.test(ipport)
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

export function checkChinese(str) {
  const reg = /([\u4e00-\u9fa5]|[\ufe30-\uffa0])/
  return reg.test(str)
}

/* 密码规则  含大写，小写，数字，字符三种以上 */
export function isPasswd(s) {
  const reg =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,20}$/
  return reg.test(s)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证特殊字符 */
export function teststr(str) {
  const reg = /^['")-><&\\\\/\\.]$/
  return reg.test(str)
}
