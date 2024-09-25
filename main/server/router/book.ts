import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
import dayjs from 'dayjs'
const router = new Router()
enum Type {
  PAYMENT = 1,
  INCOME = 2,
}
interface BookRes {
  unix?: number
  books: Book[]
  month?: number
  income: number
  payment: number
}
interface Book {
  id: number
  unix: number
  create_tm: number
  desc: string
  type: number
  price: number
  tag: string | null
}
interface AddItem {
  tag: string
  type: Type
  month: string
  year: string
  date: string
  desc: string
  price: string
}
router.prefix('/api/v1')
router.get('/book/trend', async (ctx) => {
  const { type = 'day' } = ctx.query
  const start_tm = type == 'month' ? dayjs().subtract(12, 'month').startOf('month').unix() : dayjs().subtract(12, 'year').startOf('year').unix()

  const end_tm = dayjs().endOf('date').unix()

  const list = await prismaInstance.book.findMany({
    where: {
      type: Type.PAYMENT,
      unix: {
        gte: start_tm,
        lte: end_tm,
      },
    },
    orderBy: {
      unix: 'asc',
    },
  })
  const result = list.reduce((pre, next) => {
    const month = dayjs.unix(next.unix).format(type === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD')
    const monthItem = pre.find((item) => item.key === month)
    if (!monthItem) {
      pre.push({ key: month, value: 0 })
    }
    const currentMonthItem = pre.find((item) => item.key === month)
    currentMonthItem.value += next.price

    return pre
  }, [])
  ctx.body = {
    code: 200,
    data: { result },
  }
})
router.get('/book/month-year', async (ctx) => {
  const { month, year, date } = ctx.query
  if (!date && month) {
    const start = dayjs(year + '-' + month).startOf('month')
    const end = dayjs(year + '-' + month).endOf('month')
    const list = await prismaInstance.book.findMany({
      where: {
        unix: {
          gte: start.unix(),
          lte: end.unix(),
        },
      },
      orderBy: {
        unix: 'asc',
      },
    })
    const groupedByUnix = list.reduce(
      (acc, book) => {
        const month = dayjs.unix(book.unix).month() + 1
        if (!acc[month]) {
          acc[month] = {
            income: 0,
            payment: 0,
            books: [],
          }
        }
        acc[month].books.push(book)
        if (book.type === Type.INCOME) {
          acc[month].income += book.price
        } else {
          acc[month].payment += book.price
        }
        return acc
      },
      {} as Record<string, BookRes>,
    )

    return (ctx.body = {
      code: 200,
      data: { result: groupedByUnix },
    })
  }
  if (!month && year) {
    const start = dayjs(String(year)).startOf('year')
    const end = dayjs(String(year)).endOf('year')
    const list = await prismaInstance.book.findMany({
      where: {
        unix: {
          gte: start.unix(),
          lte: end.unix(),
        },
      },
    })
    const groupedByUnix = list.reduce(
      (acc, book) => {
        const year = dayjs.unix(book.unix).year()
        if (!acc[year]) {
          acc[year] = {
            income: 0,
            payment: 0,
            books: [],
          }
        }
        acc[year].books.push(book)
        if (book.type === Type.INCOME) {
          acc[year].income += book.price
        } else {
          acc[year].payment += book.price
        }
        return acc
      },
      {} as Record<string, BookRes>,
    )
    return (ctx.body = {
      code: 200,
      data: { result: groupedByUnix },
    })
  }
})
router.get('/book/list', async (ctx) => {
  const { month, year, date } = ctx.query
  if (!date) {
    throw new Error('date is required')
  }
  const list = await prismaInstance.book.findMany({
    where: {
      unix: dayjs(year + '-' + month + '-' + date).unix(),
    },
  })
  return (ctx.body = {
    code: 200,
    data: { list },
  })
})
router.post('/book/add', async (ctx) => {
  const { unix, desc, price, type, tag } = ctx.request.body as Book.AddBookReq
  const data = await prismaInstance.book.create({
    data: {
      tag: tag,
      type: type,
      desc,
      create_tm: dayjs().unix(),
      price: Number(price),
      unix,
    },
  })
  ctx.body = {
    code: 200,
    data,
  }
})

export default router