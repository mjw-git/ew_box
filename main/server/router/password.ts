import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
const router = new Router()
router.prefix('/api/v1')
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
