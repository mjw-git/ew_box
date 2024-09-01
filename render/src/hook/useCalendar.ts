import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
export interface CalendarItem {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  date: Dayjs
}
const useCalendar = (time?: Dayjs) => {
  const [currentDate, setCurrentDate] = useState(time ?? dayjs())
  useEffect(() => {
    if (time) {
      setCurrentDate(time)
    }
  }, [time])

  const monthStart = currentDate.startOf('month')
  const monthEnd = currentDate.endOf('month')
  const tMonth = currentDate.month()
  const tYear = currentDate.year()
  const tDate = currentDate.date()
  const calendarStartDate = monthStart.subtract(monthStart.day(), 'day') // 从当月第一天的周日开始
  const calendarEndDate = monthEnd.add(6 - monthEnd.day(), 'day') // 到当月最后一天的周六结束
  let currentDay = calendarStartDate

  const changeCurrentDay = (t: Dayjs) => {
    setCurrentDate(t)
  }
  const calendar = useMemo(() => {
    const calendarList: CalendarItem[] = []
    while (currentDay.isBefore(calendarEndDate) || currentDay.isSame(calendarEndDate)) {
      calendarList.push({
        date: currentDay,
        day: currentDay.date(),
        year: currentDay.year(),
        month: currentDay.month(),
        isCurrentMonth: currentDay.month() === currentDate.month(), // 判断是否为当前月份
      })
      currentDay = currentDay.add(1, 'day')
    }
    return calendarList
  }, [currentDate])

  const pre = () => {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  const next = () => {
    setCurrentDate(currentDate.add(1, 'month'))
  }
  return {
    changeCurrentDay,
    tDate,
    tMonth,
    tYear,
    pre,
    next,
    calendar,
  }
}
export default useCalendar
