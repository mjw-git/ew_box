import koa, { BaseContext } from 'koa'
import cors from '@koa/cors'
import sharpRouter from './router/sharp'
const app = new koa()

const catchError = async (ctx: BaseContext, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = {
      code: 100,
      msg: error.message,
    }
  }
}
app.use(
  cors({
    origin: 'http://localhost:8889',
  }),
)
app.use(catchError)

app.use(sharpRouter.routes())
const startServer = (callback: () => void) => {
  app.listen(31117, () => {
    callback?.()
  })
}
export default startServer
