import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
const router = new Router()
router.prefix('/api/v1')
router.get('/sharp/task', async (ctx) => {
  const task = await prismaInstance.task.findMany({
    include: { items: true },
  })
  ctx.body = {
    code: 200,
    data: task,
  }
})
export default router
