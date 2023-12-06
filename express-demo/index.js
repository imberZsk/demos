const express = require('express')

const app = express()

app.get('/', (req, res) => {
  console.log(req.cookies)
  res.json({ data: 666 })
})

app.listen(3009, () => {
  console.log('监听3009端口')
})
