console.log(1)
Promise.resolve().then(() => {
  console.log('p')
})
console.log(2)

const p = new Promise((resolve, reject) => {
  reject(111)
})
  .then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log('dsadasdasdsa')
    }
  )
  .catch((err) => {
    console.log('aaaaaa')
  })
