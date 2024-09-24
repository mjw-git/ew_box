import Calendar from '@/components/Calendar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { months } from '@/utils'
import dayjs from 'dayjs'
import { useState } from 'react'
import FullDateSelect from '../FullDateSelect'

const AccountRecord = () => {
  const now = dayjs()
  const month = now.month() + 1
  const year = now.year()
  const date = now.date()
  const day = now.daysInMonth()
  const [currentDate, setCurrentDate] = useState({ year: String(year), month: String(month), date: String(date) })
  //判断是第几个月
  const monthArrays = currentDate.year === String(year) ? new Array(month).fill(0) : new Array(12).fill(0)
  const nearly20Years = new Array(year - 2000 + 1).fill(0).map((_, index) => {
    return {
      label: index + 2000,
      value: index + 2000,
    }
  })
  console.log(nearly20Years)

  return (
    <div>
      <FullDateSelect
        value={currentDate}
        onChange={(v) => {
          console.log(v, 'dd')

          setCurrentDate(v)
        }}
      />

      <div className='h-[calc(100vh-64px)] overflow-auto'>
        <div className='border-b flex  hover:cursor-pointer border-border p-2'>
          <div className='w-1/3'>Month</div>
          <div className='w-1/3'>Detail</div>
          <div className='w-1/3'>Total</div>
        </div>
        {monthArrays.map((_, index) => {
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
    </div>
  )
}

export default AccountRecord
