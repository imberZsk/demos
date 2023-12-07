import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function Page() {
  const users = await prisma.user.findMany()
  const user = await prisma.user.findUnique({
    where: {
      id: 1
    }
  })

  return (
    <div className="mb-[10px]">
      {users.map((item, index) => {
        return (
          <div key={index} className="flex gap-[20px] w-[400px]">
            <div>id:{item.id}</div>
            <div>name:{item.name}</div>
            <div>email:{item.email}</div>
          </div>
        )
      })}
      <div className="flex gap-[20px] w-[400px]">
        <div>id:{user?.id}</div>
        <div>name:{user?.name}</div>
        <div>email:{user?.email}</div>
      </div>
    </div>
  )
}
