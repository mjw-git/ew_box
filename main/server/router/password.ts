import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
const router = new Router()
router.prefix('/api/v1')
router.put('/password/star', async (ctx) => {
  const body = ctx.request.body as { id: number; is_star: number }
  const { id } = body
  const todoItem = await prismaInstance.password.findUnique({
    where: { id },
  })
  if (!todoItem) throw '未找到数据'
  const data = await prismaInstance.password.update({
    where: { id },
    data: {
      is_star: todoItem.is_star === 1 ? 0 : 1,
    },
  })
  ctx.body = {
    code: 200,
    data: data.id,
  }
})
router.delete('/password', async (ctx) => {
  await prismaInstance.password.deleteMany()
  await prismaInstance.config.delete({
    where: {
      key: 'pwd_secret',
    },
  })
  ctx.body = {
    code: 200,
  }
})
export default router
