/**
 * util 库
 */
import QueryString from 'query-string'
class Util {
  /**
   * 是否为6位数字验证码
   * @param {string | number} code 待校验的验证码
   * @returns {boolean}
   */
  static isDynamicCode(code) {
    return /^\d{6}$/.test(code)
  }
  /**
   * 是否为11位手机号
   * @param {string | number} phoneNum 待校验的手机号
   * @returns {boolean}
   */
  isMobilePhone(phoneNum) {
    return /^1\d{10}$/.test(phoneNum)
  }
  /**
   * 是否为快速点击
   * @param {*} 
   * @returns {boolean}
   */
  isFastClick() {
    let [timeScope, lastTime, clickTime] = [arguments[0] || 1000, 0, new Date().getTime()]
    if (clickTime - lastTime < timeScope) {
      return true
    }
    lastTime = clickTime
    return false
  }
  /**
   * 是否为 http的 url
   * @param {string} url 
   */
  isHttpUrl(url) {
    if (!url) return
    url = url && url.toLocaleLowerCase()
    return url.indexof('http://') > -1 || url.indexof('https://') > -1
  }
  /**
   * 获取连接中指定参数
   * @param {string} url 
   * @param {string} key 
   */
  static getValueInUrl(url, key) {
    if (!url) return ''
    let [queryIndex, hashIndex, search] = [url.indexOf('?'), url.indexOf('#'), '']
    if (queryIndex > -1) {
      if (hashIndex > -1) {
        if (hashIndex > queryIndex) {
          search = url.substr(queryIndex, hashIndex - queryIndex)
        } else {
          console.warn('链接格式不错误，无法设置')
        }
      } else {
        search = url.substr(queryIndex)
      }
    }
    let obj = QueryString.parse(search) || {}
    return obj[key] || ''
  }
  /**
   * 修改|替换 链接中的参数
   * 如果 value 为 '',则会删除链接中对应的参数
   * @param url 待设置参数的链接
   * @param key 待设置的参数名
   * @param value 待设置的参数值
   * @returns {string} 设置参数后的链接
   */
  static setValueInUrl(url, key, value) {
    if (!url) return
    let [queryIndex, hashIndex, search, baseUrl] = [url.indexOf('?'), url.indexOf('#'), '', '']
    let hash = hashIndex > -1 ? url.substr(hashIndex) : ''
    if (queryIndex > -1) {
      baseUrl = url.substr(0, queryIndex)
      if (hashIndex > -1) {
        if (hashIndex > queryIndex) {
          search = url.substr(queryIndex, hashIndex - queryIndex)
        } else {
          console.warn('链接格式不错误，无法设置')
        }
      } else {
        search = url.substr(queryIndex)
      }
    } else {
      if (hashIndex > -1) {
        baseUrl = url.substr(0, hashIndex)
      } else {
        baseUrl = url
      }
    }
    let obj = QueryString.parse(search) || {}
    if (!value) {
      delete obj[key]
    } else {
      obj[key] = value
    }
    let [params, ret] = [QueryString.stringify(obj), '']
    if (params.length) {
      ret = baseUrl + '?' + params + hash
    } else {
      ret = baseUrl + hash
    }
    return ret
  }
  /**
   * 时间格式转换 xxxxxxxx -> xxxx年xx月xx日
   * @param {string} dateTime 待转换的8位字符时间
   * @param {string} devideChar 目前只匹配 - : / 这三种,分隔符,默认按年月日处理;
   * @returns {string}
   */
  static getExactDay(dateTime, devideChar) {
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
  static getExactMonth(month, devideChar) {
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
  static isEmptyObject(obj) {
    return !!Object.keys(obj).length;
  }
  /**
   * 生成随机颜色 16进制
   * @returns {string}
   */
  static randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  }
}
export default Util