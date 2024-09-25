import { Badge } from '@/components/ui/badge'
import { months } from '@/utils'
import { currentDate } from '../FullDateSelect'
import dayjs from 'dayjs'

const YearAndMonthBook = (props: { currentDate: currentDate }) => {
  const { currentDate } = props
  const date = dayjs(currentDate.year + '-' + currentDate.month).endOf('month')
  console.log(date)
  if (!currentDate.month) {
    return ''
  }
  return (
    <div className='h-[calc(100vh-64px)] overflow-auto'>
      <div className='border-b flex  hover:cursor-pointer border-border p-2'>
        <div className='w-1/3'>Month</div>
        <div className='w-1/3'>Detail</div>
        <div className='w-1/3'>Total</div>
      </div>
      {months.map((_, index) => {
        return (
          <div key={index} className='border-b flex hover:bg-green-200 hover:cursor-pointer border-border p-2'>
            <div className='w-1/3'>{months[index]}</div>
            <div className='w-1/3'>
              <div className='flex gap-2'>
                <Badge variant='destructive'>payment ¥111</Badge>
              </div>
              <div className='flex gap-2 mt-1'>
                <Badge className='bg-green-500'>income ¥111</Badge>
              </div>
            </div>
            <div className='w-1/3'>
              -¥111
              {/* <Badge variant='destructive'>payment ¥111</Badge> */}
            </div>
          </div>
        )
      })}
      <div className='border-b flex  hover:cursor-pointer border-border p-2'>
        <div className='w-1/3'>Total</div>
        <div className='w-1/3'></div>
        <div className='w-1/3'>
          <Badge className='bg-green-500'>income ¥111</Badge>
          <Badge variant='destructive'>payment ¥111</Badge>
        </div>
      </div>
    </div>
  )
}

export default YearAndMonthBook
