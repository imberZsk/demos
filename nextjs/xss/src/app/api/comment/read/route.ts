import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// query参数
export async function GET() {
  const comments = await prisma.comment.findMany()
  // prisma存输入的评论
  return Response.json({
    data: comments
  })
}
