import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// 获取body参数
export async function POST(request: Request) {
  const body = await request.json()
  await prisma.comment.create({
    data: {
      comment: body.comment
    }
  })
  // prisma存输入的评论
  return Response.json({ success: true })
}
