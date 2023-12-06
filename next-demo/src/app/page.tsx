import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function Page() {
  const users = await prisma.user.findMany()

  return <>{JSON.stringify(users)}</>
}

export default Page
