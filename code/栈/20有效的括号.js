// 示例 1：

// 输入：s = "()"
// 输出：true
// 示例 2：

// 输入：s = "()[]{}"
// 输出：true
// 示例 3：

// 输入：s = "(]"
// 输出：false

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = []
  const arr = s.split('')
  function foo(a, b) {
    if (
      (a === '(' && b === ')') ||
      (a === '[' && b === ']') ||
      (a === '{' && b === '}')
    ) {
      return true
    }
  }
  arr.forEach((item, index) => {
    if (foo(stack[stack.length - 1], item)) {
      stack.pop()
    } else {
      stack.push(item)
    }
  })
  if (stack.length) return false

  return true
}

console.log(isValid('()]{}'))
