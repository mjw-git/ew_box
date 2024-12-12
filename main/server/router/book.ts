import { prismaInstance } from '@main/utils/init'
import Router from 'koa-router'
import dayjs from 'dayjs'
import Decimal from 'decimal.js'
const router = new Router()
enum Type {
  PAYMENT = 1,
  INCOME = 2,
}
enum STATUS {
  INCLUDE = 1,
  NOT_INCLUDE = 2,
}
interface BookRes {
  unix?: number
  books: Book[]
  month?: number
  income: Decimal
  payment: Decimal
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
    currentMonthItem.value = new Decimal(currentMonthItem.value).plus(next.price).toNumber()

    return pre
  }, [])
  ctx.body = {
    code: 200,
    data: { result },
  }
})
router.delete('/book', async (ctx) => {
  const body = ctx.request.body as { id: number }
  const { id } = body
  if (!id) throw '请传入id'
  const data = await prismaInstance.book.delete({
    where: {
      id: id,
    },
  })
  ctx.body = {
    code: 200,
    data: data.id,
  }
})
router.get('/book/statics', async (ctx) => {
  const start = dayjs().startOf('year').unix()
  const end = dayjs().endOf('year').unix()
  const list = await prismaInstance.book.findMany({
    orderBy: { price: 'desc' },
    where: {
      type: Type.PAYMENT,

      unix: {
        gte: start,
        lte: end,
      },
    },
  })
  if (list.length === 0) {
    ctx.body = {
      code: 200,
      data: {
        g: 0,
        l: 0,
        total: 0,
        //平均
        average: 0,
      },
    }
    return
  }

  //计算所有的支出平均数,按每个月计算

  const payment = list.reduce((pre, next) => {
    return pre.plus(next.price)
  }, new Decimal(0))
  const priceMap = list.reduce(
    (pre, next) => {
      if (!pre[next.unix]) {
        pre[next.unix] = new Decimal(0)
        // count:0
      }
      pre[next.unix] = pre[next.unix].plus(next.price)
      return pre
    },
    {} as Record<string, Decimal>,
  )

  const totalValue = Object.values(priceMap).reduce((pre, next) => {
    return pre.plus(next)
  }, new Decimal(0))
  const average = totalValue.div(Object.keys(priceMap).length).toNumber().toFixed(2)

  ctx.body = {
    code: 200,
    data: {
      g: list[0].price,
      l: list[list.length - 1].price,
      average,
      total: payment.toNumber().toFixed(2),
      gFrom: list[0],
      lFrom: list[list.length - 1],
    },
  }
})
router.get('/book/month-year', async (ctx) => {
  const { month, year, date } = ctx.query
  if (!date && month) {
    const start = dayjs(year + '-' + month).startOf('year')
    const end = dayjs(year + '-' + month).endOf('year')
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
            income: new Decimal(0),
            payment: new Decimal(0),
            books: [],
          }
        }
        acc[month].books.push(book)
        if (book.type === Type.INCOME) {
          acc[month].income = acc[month].income.plus(book.price)
        } else {
          acc[month].payment = acc[month].payment.plus(book.price)
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
    const start = dayjs(String(year)).subtract(2, 'year').startOf('year')
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
            income: new Decimal(0),
            payment: new Decimal(0),
            books: [],
          }
        }
        acc[year].books.push(book)
        if (book.type === Type.INCOME) {
          acc[year].income = acc[year].income.plus(book.price)
        } else {
          acc[year].payment = acc[year].payment.plus(book.price)
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
router.put('/book/account-book', async (ctx) => {
  const { id, name, color, icon } = ctx.request.body as Book.AddBookAccountReq
  const data = await prismaInstance.accountBook.update({
    where: { id },
    data: { name, color, icon },
  })
  ctx.body = {
    code: 200,
    data: { id: data.id },
  }
})
router.post('/book/account-book', async (ctx) => {
  const { name, color, icon } = ctx.request.body as Book.AddBookAccountReq
  const data = await prismaInstance.accountBook.create({
    data: {
      name,
      color,
      create_tm: dayjs().unix(),
      icon,
    },
  })
  ctx.body = {
    code: 200,
    data: { id: data.id },
  }
})
router.get('/book/account-book', async (ctx) => {
  const list = await prismaInstance.accountBook.findMany()
  ctx.body = {
    code: 200,
    data: { list },
  }
})
router.post('/book/add', async (ctx) => {
  const { unix, desc, price, type, tag, account_book_id } = ctx.request.body as Book.AddBookReq

  const data = await prismaInstance.book.create({
    data: {
      tag: tag,
      type: type,
      desc,
      create_tm: dayjs().unix(),
      price: new Decimal(price).toFixed(2).toString(),
      unix,
      currency: 'CNY',
      account_book_id: account_book_id,
      status: STATUS.INCLUDE,
    },
  })
  ctx.body = {
    code: 200,
    data,
  }
})

export default router
