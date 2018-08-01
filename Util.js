/**
 * 时间格式转换 xxxxxxxx -> xxxx年xx月xx日
 * @param {string} dateTime 待转换的8位字符时间
 * @param {string} devideChar 目前只匹配 - : / 这三种,分隔符,默认按年月日处理;
 * @returns {string}
 */
export function getExactDay(dateTime, devideChar) {
  if (!dateTime || dateTime.length != 8) return false;
  if (/\-|\:|\//.test(devideChar)) {
    return dateTime.slice(0, 4) + devideChar + dateTime.slice(4, 6) + devideChar + dateTime.slice(6, 8);
  } else {
    return dateTime.slice(0, 4) + '年' + dateTime.slice(4, 6) + '月' + dateTime.slice(6, 8) + '日';
  }
}

/**
 * 时间格式转换 xxxxxx -> xxxx年xx月
 * @param {string} month 待转换的6位字符时间
 * @param {string} devideChar 目前只匹配 - : / 这三种,分隔符,默认按年月日处理;
 * @returns {string}
 */
export function getExactMonth(month, devideChar) {
  if (!month || month.length != 6) return false;
  if (/\-|\:|\//.test(devideChar)) {
    return dateTime.slice(0, 4) + devideChar + dateTime.slice(4, 6);
  } else {
    return month.slice(0, 4) + '年' + month.slice(4, 6) + '月';
  }
}

/**
 * 判断对象是否为空 ES6的方法
 * @param {Object} obj 待判断的对象
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  return !!Object.keys(obj).length;
}
