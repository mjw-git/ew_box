import { Badge } from '@/components/ui/badge'
import { months } from '@/utils'
import { currentDate } from '../FullDateSelect'
import { useRequest } from 'ahooks'
import { getBookMonthYear } from '@/services/book'
import { useMemo } from 'react'
import Decimal from 'decimal.js'

const YearAndMonthBook = (props: { currentDate: currentDate }) => {
  const { currentDate } = props

  const { data } = useRequest(() => getBookMonthYear(currentDate), {
    refreshDeps: [currentDate],
  })

  const totalPrice = useMemo(() => {
    let income = new Decimal(0)
    let payment = new Decimal(0)
    Object.entries(data?.result ?? {}).forEach(([_, value]) => {
      income = income.plus(value.income)
      payment = payment.plus(value.payment)
    })
    return {
      income: income.toNumber(),
      payment: payment.toNumber(),
    }
  }, [data])

  return (
    <div className='h-[calc(100vh-64px)] overflow-auto'>
      <div className='border-b flex  hover:cursor-pointer border-border p-2'>
        <div className='w-1/3'>{currentDate.month ? 'Month' : 'Year'}</div>
        <div className='w-1/3'>Detail</div>
        <div className='w-1/3'>Total</div>
      </div>
      {currentDate.year &&
        Object.entries(data?.result ?? {}).map((i) => {
          return (
            <div key={i[0]} className='border-b flex hover:bg-green-200 hover:cursor-pointer border-border p-2'>
              <div className='w-1/3'>{i[0]}</div>
              <div className='w-1/3'>
                <div className='flex gap-2'>
                  <Badge variant='destructive'>payment ¥ {i[1].payment}</Badge>
                </div>
                <div className='flex gap-2 mt-1'>
                  <Badge className='bg-green-500'>income ¥ {i[1].income}</Badge>
                </div>
              </div>
            </div>
          )
        })}
      {currentDate.month &&
        months.map((_, index) => {
          return (
            <div key={index} className='border-b flex hover:bg-green-200 hover:cursor-pointer border-border p-2'>
              <div className='w-1/3'>{months[index]}</div>
              <div className='w-1/3'>
                <div className='flex gap-2'>
                  <Badge variant='destructive'>payment ¥ {data?.result?.[index + 1]?.payment}</Badge>
                </div>
                <div className='flex gap-2 mt-1'>
                  <Badge className='bg-green-500'>income ¥ {data?.result?.[index + 1]?.income}</Badge>
                </div>
              </div>
              <div className='w-1/3'>¥{-(data?.result?.[index + 1]?.income || 0) - (data?.result?.[index + 1]?.payment || 0)}</div>
            </div>
          )
        })}
      <div className='border-b flex  hover:cursor-pointer border-border p-2'>
        <div className='w-1/3'>Total</div>
        <div className='w-1/3'></div>
        <div className='w-1/3'>
          <Badge className='bg-green-500'>income ¥{totalPrice.income}</Badge>
          <Badge variant='destructive'>payment ¥{totalPrice.payment}</Badge>
        </div>
      </div>
    </div>
  )
}

export default YearAndMonthBook
