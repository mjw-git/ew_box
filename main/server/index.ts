import koa, { BaseContext } from 'koa'
import cors from '@koa/cors'
import sharpRouter from './router/sharp'
import passwordRouter from './router/password'
import todoRouter from './router/todo'
import systemRouter from './router/system'
import bookRouter from './router/book'
import logger from '@main/utils/log'
import koaBody from 'koa-bodyparser'
const app = new koa()

const catchError = async (ctx: BaseContext, next) => {
  try {
    await next()
  } catch (error) {
    logger.error('koa error', error)
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
app.use(koaBody())
app.use(passwordRouter.routes())
app.use(sharpRouter.routes())
app.use(todoRouter.routes())
app.use(bookRouter.routes())
app.use(systemRouter.routes())
const startServer = (callback: () => void) => {
  app
    .listen(process.env.PORT || 31117, () => {
      callback?.()
    })
    .on('error', (err) => {
      logger.error(err)
    })
}
export default startServer
