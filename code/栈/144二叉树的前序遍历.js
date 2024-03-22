var preorderTraversal = function (root) {
  const res = []
  function inorder(root) {
    if (!root) return
    res.push(root.val)
    inorder(root.left)
    inorder(root.right)
  }
  inorder(root)
  return res
}
