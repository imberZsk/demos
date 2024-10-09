const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 2000))
  })
}

export async function GET() {
  await sleep()
  return Response.json({
    message: 'Hello World'
  })
}
