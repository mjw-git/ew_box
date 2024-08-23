import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
import fsExtra from 'fs-extra'
import { sharpPath } from '@main/utils/path'
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
router.delete('/sharp/task', async (ctx) => {
  await prismaInstance.taskItem.deleteMany()
  await prismaInstance.task.deleteMany()
  fsExtra.emptyDirSync(sharpPath)
  ctx.body = {
    code: 200,
  }
})
export default router
