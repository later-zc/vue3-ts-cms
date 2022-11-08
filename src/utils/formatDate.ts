// const timeStamp = +new Date()
// const dateUTC = '2021-08-20T04:07:23.000Z'

interface ITimeObj {
  [index: string]: number
}

export default function formatDate(
  dateString: number | string,
  formatString = 'yyyy-MM-dd hh:mm:ss'
): string {
  const date = new Date(dateString)
  const timeObj: ITimeObj = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const key in timeObj) {
    const keyRegExp = new RegExp(key)
    if (keyRegExp.test(formatString)) {
      const value = String(timeObj[key]).padStart(2, '0') // padStart(n, m)：字符串不足n位，从左侧开始填充m字符直至满足n位
      formatString = formatString.replace(keyRegExp, value)
    }
  }
  return formatString
}

// console.log(formatDate(timeStamp)) // 2022-07-13 00:09:48
// console.log(formatDate(dateUTC, 'hh:mm:ss yyyy/MM/dd')) // 00:09:48 2022/07/13
