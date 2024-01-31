const apiKey = 'a4f876d3978d7cee66697751850eb749'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lng = searchParams.get('lng')
  const lat = searchParams.get('lat')

  try {
    const res = await fetch(
      // 搜索POI接口
      // https://lbs.amap.com/api/webservice/guide/api-advanced/search
      `https://restapi.amap.com/v3/place/around?key=${apiKey}&location=${lng},${lat}&radius=10000&offset=8`
    )

    const data = await res.json()

    return Response.json(data)
  } catch (err) {
    console.log(err)
  }
}
