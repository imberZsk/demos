export async function generateStaticParams() {
  // Generate two pages at build time and the rest (3-100) on-demand
  return [{ id: '1' }, { id: '2' }]
}

export default async function Page({ params }: { params: { id: string } }) {
  console.log(params)
  // const res = await fetch(`http://localhost:3300/data2/${params.id}`, {
  //   cache: 'no-store'
  // })
  // const data = await res.json()
  const data = { data: 'data' }

  return <div>{data.data}</div>
}
