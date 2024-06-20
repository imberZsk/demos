/*
* @author: M.Wang
* Created by 2023/06/27
*/
const objProto = Object.prototype;
export const $defineProperty = Object.defineProperty;
// eslint-disable-next-line no-void
export const $undefined = void 0;
export function $noop() {}
export function $now() {
    return Date.now();
}

/**
 * 获取数据类型
 * @param {any} target:any
 * @returns {string}
 */
export function $typeOf(target: any): string {
    const tp = typeof target;
    if (tp !== 'object') return tp;
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

/**
 * 是否为真
 * @param {any} v:unknown
 * @returns {boolean}
 */
export function $isTrue(v: unknown) {
    return v === true;
}

/**
 * 是否为对象
 * @param {any} v:unknown
 * @returns {boolean}
 */
export function $isObject(v: unknown) {
    return typeof v === 'object' && v !== null;
}

/**
 * 是否为数组
 * @param {any} v:unknown
 * @returns {boolean}
 */
export function $isArray<T>(v: unknown): v is T[] {
    return objProto.toString.call(v) === '[object Array]';
}

/**
 * 是否为空
 * @param {any} v:any
 * @returns {any}
 */
export function $isEmpty(v?: any) {
    return v === 0 || v === '' || v === undefined || v === null || ($isArray(v) && v.length === 0) || ($isObject(v) && Object.keys(v).length === 0);
}

/**
 * 是否为字符串
 * @param {any} target:any
 * @returns {any}
 */
export function $isString(target: any): target is string {
    return $typeOf(target) === 'string';
}

/**
 * 是否为数字
 * @param {any} target:any
 * @returns {any}
 */
export function $isNumber(target: any): target is number {
    return $typeOf(target) === 'number';
}

/**
 * 是否为函数
 * @param {any} target:any
 * @returns {any}
 */
export function $isFunction(target: any): target is Function {
    return $typeOf(target) === 'function';
}

/**
 * 是否为布尔
 * @param {any} target:any
 * @returns {any}
 */
export function $isBoolean(target: any): target is boolean {
    return $typeOf(target) === 'boolean';
}

/**
 * 字符串加密
 * @param {any} data:TStrNum
 * @returns {any}
 */
export function $encode(data: string | number) {
    return $Btoa(encodeURI(`${data}`))
}

/**
 * 字符串解密
 * @param {any} data:string
 * @returns {any}
 */
export function $decode(data: string) {
    return encodeURI($Atob(`${data}`))
}

/**
 * 安全调用
 * @param {Function} fn:Function
 * @param {unknown} ctx?:unknown
 * @param {unknown[]} args?:unknown[]
 * @returns {T|undefined}
 */
export function $safeCall<T>(fn: Function, ctx?: unknown, args?: IArguments | any[]): T | undefined {
    if ($isFunction(fn)) {
        try {
            return fn.apply(ctx, args) as T;
        } catch (error) {
            // $error((error as Error).message, error);
        }
    }
}
/**
 * 删除数组元素
 * @param {any} arr:any[]
 * @param {any} item:any
 * @returns {any}
 */
export function $arrayRemove(arr: any[], item: any) {
    if (!$isArray(arr)) return arr;
    const idx = arr.indexOf(item);
    if (idx >= 0) {
        arr = arr.slice();
        arr.splice(idx, 1);
    }
    return arr;
}
export function $merge<T extends {}, U>(t: T, s: U): T & U;
export function $merge<T extends {}, U, V>(t: T, s: U, s1: V): T & U & V;
export function $merge<T extends {}, U, V, W>(t: T, s: U, s1: V, s2: W): T & U & V & W;
/**
 * 对象合并(非深度)
 * @param {any} t:object
 * @param {any} s:object[]
 * @returns {any}
 */
export function $merge(t: object, s: object[]): object {
    const fn =
        Object.assign ||
        function (_t: object, _s: any[]): any {
            for (let i = 1; i < _s.length; i++) {
                for (const key in _s[i]) {
                    objProto.hasOwnProperty.call(_s[i], key) && ((_t as any)[key] = _s[i][key]);
                }
            }
            return _t;
        };

    return fn.apply(null, [t, s]);
}

/**
 * 深度合并
 * @param src 源对象
 * @param target 目标对象
 */
export function $deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = $isObject(src[key]) ? $deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src as T
}

/**
 * uuid
 * @returns {string}
 */
export function $uuid() {
    const l = 16;
    const ranKeys = new Array<number>(l);
    let n = 0;
    for (let i = 0; i < l; i++) {
        const j = (3 & i) === 0;
        if (j) {
            n = 4294967296 * Math.random();
        }
        let x = 3 & i;
        x <<= 3;
        x = n >>> x;
        x &= 255;
        ranKeys[i] = x;
    }

    ranKeys[6] = (15 & ranKeys[6]) | 64;
    ranKeys[8] = (53 & ranKeys[8]) | 128;

    const ranNum: string[] = [];
    for (let i = 0; i < 256; i++) {
        ranNum[i] = (i + 256).toString(l).substring(1);
    }
    const r: string[] = [];
    for (let i = 0; i < l; i++) {
        i > 0 && i % 4 === 0 && r.push('-');
        r.push(ranNum[ranKeys[i]]);
    }
    return r.join('');
}

/**
 * runProcessors
 * @returns {string}
 */
export const $runProcessors = function <T>(cbs: Function[]) {
    return function (data: any): T {
        let newData = data;
        for (let i = 0; i <= cbs.length && newData; i++) {
            try {
                newData = cbs[i](newData);
            } catch (error) {
                // $error(error);
            }
        }
        return newData;
    }
}

// weapp jwt-decode
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

// btoa
export const $Btoa = function (string: string) {
  string = String(string);
  var bitmap, a, b, c,
    result = "",
    i = 0,
    rest = string.length % 3;

  for (; i < string.length;) {
    if ((a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255)
      throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");

    bitmap = (a << 16) | (b << 8) | c;
    result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
      b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
  }

  return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
};
// atob
export const $Atob = function (string: string) {
  string = String(string).replace(/[\t\n\f\r ]+/g, "");
  if (!b64re.test(string))
    throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  string += "==".slice(2 - (string.length & 3));
  var bitmap, result = "",
    r1, r2, i = 0;
  for (; i < string.length;) {
    bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
      (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

    result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
        String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
  }
  return result;
};

// @quote https://github.com/auth0/jwt-decode
function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    $Atob(str).replace(/(.)/g, function (p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    })
  );
}

function base64_url_decode(str: string) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return $Atob(output);
  }
}

export default function $jwtDecode(token: string, options?: any) {
  if (typeof token !== "string") {
    throw ("Invalid token specified");
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split(".")[pos]));
  } catch (e) {
    throw ("Invalid token specified: " + e.message);
  }
}

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

