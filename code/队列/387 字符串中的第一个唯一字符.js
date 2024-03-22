// 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。

// 示例 1：

// 输入: s = "leetcode"
// 输出: 0
// 示例 2:

// 输入: s = "loveleetcode"
// 输出: 2
// 示例 3:

// 输入: s = "aabb"
// 输出: -1

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const position = new Map()
  const q = []

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]

    if (position.has(ch)) {
      position.set(ch, -1)
      while (q.length && position.get(q[0][0]) === -1) {
        q.shift()
      }
    } else {
      position.set(ch, i)
      q.push([ch, i])
    }
  }

  return q.length ? q[0][1] : -1
}
console.log(firstUniqChar('loveleetcode'))
console.log(firstUniqChar('aabbcc'))
