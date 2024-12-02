import dayjs, { Dayjs } from 'dayjs'
import SvgIcon from '../SvgIcon'
import useCalendar, { CalendarItem } from '@/hook/useCalendar'
import { ReactNode, useEffect } from 'react'
import { days, months } from '@/utils'
import { cn } from '@/lib/utils'

interface CalendarProps {
  currentDay?: Dayjs
  showTopAction?: boolean
  renderOpt?: (cal: CalendarItem) => ReactNode
  onChange?: (cal: CalendarItem[]) => void
  renderExtra?: (time: CalendarItem) => ReactNode
  onClickItem?: (time: Dayjs) => void
}
const Calendar = (props: CalendarProps) => {
  const { onChange, showTopAction = true, onClickItem, currentDay } = props
  const { calendar, pre, next, changeCurrentDay } = useCalendar(currentDay)
  const tYear = dayjs().year()
  const tMonth = dayjs().month()
  const tDate = dayjs().date()

  useEffect(() => {
    onChange?.(calendar)
  }, [calendar])

  return (
    <div>
      {showTopAction && (
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
      )}
      <div className='w-full flex  rounded-md mt-2 flex-col  bg-container-bg-2'>
        <div className='grid grid-cols-7  bg-container-bg-2'>
          {days.map((i) => (
            <div className='text-center h-8 box-border text-[12px] text-grey leading-8' key={i}>
              {i}
            </div>
          ))}
        </div>
        <div className='grid flex-1 grid-cols-7'>
          {calendar.map((i, index) => (
            <div key={index} className='cursor-pointer' onClick={() => onClickItem?.(i.date)}>
              <div className={cn('m-1 rounded-md text-center text-[10px] bg-container-bg-3 h-10', { 'text-grey opacity-85': !i.isCurrentMonth }, { 'text-yellow': i.day === tDate && i.month === tMonth && i.year === tYear })}>
                <div>{i.day}</div>
                <div className='text-[8px]'>{i.chineseDay}</div>
                {i.day === 29 && <div className='text-[8px] text-red'>-10.0</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Calendar
