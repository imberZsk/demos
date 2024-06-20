/**
 * 生成16位的uuid，非标准
 * @returns 返回UUID
 * */
export function utils_getUuid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(-8)
}


/**
 * 对字符串数组进行ASCII排序 
 * @param 字符串数组
 * @returns ASCII生序的结果
 * */
export function utils_sortByStrArr(strArr: string[]) {
  return strArr.sort(function (s1, s2) {
    let x1 = 0
    for(let i =0; i<s1.length;i++){
        x1 += s1[i].charCodeAt(0)
    }

    let x2 = 0
    for(let i =0; i<s2.length;i++){
        x2 += s2[i].charCodeAt(0)
    }

    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
  })
}

/**
 * object2query，将对象转化为querystring
 * @param 排序的对象
 * @param isEncode 是否将key-val encodeURI...
 * @param isSort 是否对对象的key进行sort排序 - 生序
 * @returns querystring
 */
export function utils_stringifyQuery(query: Record<string, any>, isEncode = false, isSort = false): string {
  if(!query) return ''

  const keys = isSort ? Object.keys(query).sort() : Object.keys(query)
  const pairs = keys.filter(key => typeof query[key] !== 'undefined').map(key => {
    if(isEncode) {
      return utils_stringifyKeyValuePair(key, query[key])
    }

    return `${key}=${query[key]}`
  })

  return pairs.join('&')
}

/** 
 * 把键值转进行encodeURIComponent
 * @returns querystring
 */
export function utils_stringifyKeyValuePair(key: string, val: any): string {
  if(val === null) { return encodeURIComponent(key) }

  if(Array.isArray(val)) {
    return val.filter((val: any) => typeof val !== 'undefined').map((val: any) => utils_stringifyKeyValuePair(key, val)).join('&')
  }

  return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
}