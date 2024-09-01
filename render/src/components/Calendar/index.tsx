import dayjs from 'dayjs'
import SvgIcon from '../SvgIcon'
import useCalendar, { CalendarItem } from '@/hook/useCalendar'
import { ReactNode, useEffect } from 'react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
interface CalendarProps {
  onChange?: (cal: CalendarItem[]) => void
  renderExtra?: (time: CalendarItem) => ReactNode
}
const Calendar = (props: CalendarProps) => {
  const { renderExtra, onChange } = props
  const { tDate, tMonth, tYear, calendar, pre, next, changeCurrentDay } = useCalendar()

  useEffect(() => {
    onChange?.(calendar)
  }, [calendar])

  return (
    <div>
      <div className='flex'>
        <div className='flex gap-3 items-center h-9'>
          <div className='flex gap-1 items-center cursor-pointer'>
            <SvgIcon onClick={pre} className='hover:text-green-700' width={24} height={24} name='left' />
            <span
              onClick={() => {
                changeCurrentDay(dayjs())
              }}
              className='hover:text-green-700'>
              Back To Today
            </span>
            <SvgIcon className='hover:text-green-700' onClick={next} width={24} height={24} name='right' />
          </div>
          <span>
            {months[tMonth]} {tDate},{tYear}
          </span>
        </div>
      </div>
      <div className='w-full flex flex-col h-[calc(100vh-112px)]  border-border border-t-[1px] border-l-[1px]'>
        <div className='grid grid-cols-7'>
          {days.map((i) => (
            <div className='text-center h-8 box-border leading-8 border-b-[1px] border-border border-r-[1px]' key={i}>
              {i}
            </div>
          ))}
        </div>
        <div className='grid flex-1 grid-cols-7 grid-rows-5'>
          {calendar.map((i, index) => (
            <div key={index} className={`border-r-[1px] relative ${i.year === tYear && i.month === tMonth && i.day === tDate ? 'bg-blue-50' : ''} ${i.isCurrentMonth ? '' : 'bg-muted text-slate-400'} cursor-pointer p-2 box-border border-b-[1px] h-full border-border`}>
              <div className='group absolute left-0 flex flex-col p-1 top-0 w-full h-full'>
                <div className='h-8'>
                  {i.day === 1 && i.isCurrentMonth && <span>{months[tMonth]}</span>} <span className={`${i.isCurrentMonth && i.day === tDate ? 'bg-green-500 rounded-sm p-1 text-white' : ''}`}>{i.day}</span>
                </div>
                {renderExtra?.(i)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Calendar
