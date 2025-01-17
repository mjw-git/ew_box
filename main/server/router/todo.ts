import { prismaInstance } from '@main/utils/init'
import dayjs from 'dayjs'
import Router from 'koa-router'
const router = new Router()
enum TODO_TYPE {
  LIST = 1,
  CALENDAR,
  EVENT,
}
enum TODO_STATUS {
  UNFINISHED,
  FINISHED,
}
router.prefix('/api/v1')
router.post('/todo', async (ctx) => {
  const body = ctx.request.body as { todo: string; type?: number; start_tm?: number }

  const { todo = 'default', start_tm, type = TODO_TYPE.LIST } = body
  const nowTime = Math.floor(new Date().getTime() / 1000)
  const data = await prismaInstance.todo.create({
    data: {
      todo: todo,
      type: type,
      start_tm: start_tm || nowTime,
      status: TODO_STATUS.UNFINISHED,
      create_tm: nowTime,
    },
  })
  ctx.body = {
    code: 200,
    data: data.id,
  }
})

router.put('/todo/star', async (ctx) => {
  const body = ctx.request.body as { id: number; is_star: number }
  const { id } = body
  if (!id) throw '请传入id'
  const todoItem = await prismaInstance.todo.findUnique({
    where: { id },
  })
  if (!todoItem) throw '未找到数据'
  const data = await prismaInstance.todo.update({
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
router.get('/todo/list/event', async (ctx) => {
  const list = await prismaInstance.todo.findMany({
    where: {
      type: TODO_TYPE.EVENT,
    },
    orderBy: [{ is_star: 'desc' }, { create_tm: 'asc' }],
  })
  ctx.body = {
    code: 200,
    data: { list },
  }
})
router.get('/todo/list/calendar', async (ctx) => {
  const { start_tm_start, start_tm_end } = ctx.request.query ?? {}
  const list = await prismaInstance.todo.findMany({
    where: {
      start_tm: {
        gte: +start_tm_start,
        lte: +start_tm_end,
      },
      type: {
        in: [TODO_TYPE.CALENDAR, TODO_TYPE.LIST],
      },
    },
  })
  ctx.body = {
    code: 200,
    data: {
      list,
    },
  }
})
router.get('/todo/list', async (ctx) => {
  const isFinished = ctx.request.query.finished ? +ctx.request.query.finished : undefined
  if (isFinished) {
    const list = await prismaInstance.todo.findMany({
      orderBy: {
        finished_tm: 'desc',
      },
      where: {
        status: isFinished,
        type: TODO_TYPE.LIST,
      },
    })
    ctx.body = {
      code: 200,
      data: {
        list: list,
      },
    }
    return
  }
  const today = await prismaInstance.todo.findMany({
    orderBy: {
      start_tm: 'desc',
    },
    where: {
      status: isFinished,
      type: TODO_TYPE.LIST,
      start_tm: {
        lt: dayjs().endOf('date').unix(),
        gt: dayjs().startOf('date').unix(),
      },
    },
  })
  const yesterday = await prismaInstance.todo.findMany({
    orderBy: {
      create_tm: 'desc',
    },
    where: {
      status: isFinished,
      create_tm: {
        lt: dayjs().endOf('date').subtract(1, 'day').unix(),
        gt: dayjs().startOf('date').subtract(1, 'day').unix(),
      },
    },
  })
  const earlier = await prismaInstance.todo.findMany({
    orderBy: {
      create_tm: 'desc',
    },
    where: {
      status: isFinished,
      create_tm: {
        lt: dayjs().startOf('date').subtract(1, 'day').unix(),
      },
    },
  })
  ctx.body = {
    code: 200,
    data: {
      un_todo: [...today, ...yesterday, ...earlier],
      today,
      yesterday,
      earlier,
    },
  }
})

router.put('/todo/finished', async (ctx) => {
  const body = ctx.request.body as { id: number }
  const { id } = body
  if (!id) throw '请传入id'
  const data = await prismaInstance.todo.update({
    data: {
      status: TODO_STATUS.FINISHED,
      finished_tm: Math.floor(new Date().getTime() / 1000),
    },
    where: {
      id: id,
    },
  })
  ctx.body = {
    code: 200,
    data: data.id,
  }
})
router.delete('/todo', async (ctx) => {
  const body = ctx.request.body as { id: number }
  const { id } = body
  if (!id) throw '请传入id'
  const data = await prismaInstance.todo.delete({
    where: {
      id: id,
    },
  })
  ctx.body = {
    code: 200,
    data: data.id,
  }
})

export default router
