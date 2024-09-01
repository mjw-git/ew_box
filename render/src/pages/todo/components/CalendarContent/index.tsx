import BaseElliTip from '@/components/BaseElliTip'
import Calendar from '@/components/Calendar'
import SvgIcon from '@/components/SvgIcon'
import { CalendarItem } from '@/hook/useCalendar'
import { getCalendarToDoList, getToDoList } from '@/services/todo'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useState } from 'react'
const randomColor = ['bg-blue-500', 'bg-pink-500', 'bg-slate-500', 'bg-red-500', 'bg-orange-500']

const CalendarContent = () => {
  const [calendars, setCalendars] = useState<CalendarItem[]>([])

  const { data: todoList } = useRequest(() => getCalendarToDoList({ create_tm_start: calendars[0].date.unix(), create_tm_end: calendars[calendars.length - 1].date.unix() }), {
    ready: calendars.length > 0,
    refreshDeps: [calendars],
  })
  return (
    <Calendar
      renderExtra={({ date }) => {
        const currentDays = (todoList?.list ?? []).filter((i) =>
          dayjs(i.create_tm * 1000)
            .startOf('day')
            .isSame(date),
        )
        if (currentDays.length > 0)
          return (
            <div className='mt-2 flex overflow-hidden group-hover:overflow-visible group-hover:pb-3 flex-col gap-1'>
              {currentDays.map((item, index) => (
                <div key={item.id} className={`peer ${randomColor[index % randomColor.length]} relative items-center gap-1 w-full flex p-[2px] box-border rounded-sm text-sm text-white`}>
                  <BaseElliTip className='text-left cursor-auto' text={item.todo} />
                  <div className={`absolute hidden peer-hover:block bottom-[-12px] z-10`}>
                    <SvgIcon name='close' className='bg-white rounded-sm text-black border-border border-[1px] z-10' width={12} height={12} />
                  </div>
                </div>
              ))}
            </div>
          )
        return null
      }}
      onChange={(e) => {
        setCalendars(e)
      }}
    />
  )
}
export default CalendarContent
