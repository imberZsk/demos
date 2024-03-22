var postorderTraversal = function (root) {
  const res = []
  function inorder(root) {
    if (!root) return
    inorder(root.left)
    inorder(root.right)
    res.push(root.val)
  }
  inorder(root)
  return res
}
