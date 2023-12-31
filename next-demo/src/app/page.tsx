import ThemeToggle from '@/ui/ThemeToggle'
import ToolbarDemo from '@/ui/radix/toolbar'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function Page() {
  const users = await prisma.user.findMany()

  return (
    <>
      <div className="text-gray-800 dark:text-gray-100">
        {JSON.stringify(users)}
      </div>
      <ToolbarDemo></ToolbarDemo>
      <ThemeToggle></ThemeToggle>
    </>
  )
}

export default Page
