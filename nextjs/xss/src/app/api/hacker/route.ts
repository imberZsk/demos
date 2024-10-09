import { cookies } from 'next/headers'

export async function GET() {
  console.log('黑客 hacker')

  console.log(cookies().get('_ga'))

  return Response.json({ data: 'Hello World' })
}
