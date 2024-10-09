const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  const delay = Math.floor(Math.random() * 2000)
  await sleep(delay)

  return Response.json({
    message: 'Hello World'
  })
}
