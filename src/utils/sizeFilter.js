export function sizeFilter(bytesSize) {
  // Bytes KB MB GB TB
  let num = 0
  while (Math.abs(bytesSize) >= 1024) {
    bytesSize /= 1024
    num++
    if (num == 4) break
  }
  return num
}

export function getUnit(num) {
  return ['Bytes', 'KB', 'MB', 'GB', 'TB'][num]
}

export function turnSize(size, nums) {
  let num = 0
  while (num <= nums) {
    size /= 1024
    num++
    if (num == nums) break
  }
  return Math.round(size)
}

export function dealWithSize(dataArr, unit) {
  return dataArr.map((i) => turnSize(i, unit))
}
