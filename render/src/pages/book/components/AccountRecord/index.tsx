import dayjs from 'dayjs'
import { useState } from 'react'
import FullDateSelect from './components/FullDateSelect'
import YearAndMonthBook from './components/YearAndMonthBook'
import DateBook from './components/DateBook'

const AccountRecord = () => {
  const now = dayjs()
  const month = now.month() + 1
  const year = now.year()
  const date = now.date()
  const [currentDate, setCurrentDate] = useState({ year: String(year), month: String(month), date: String(date) })
  //判断是第几个月
  const monthArrays = currentDate.year === String(year) ? new Array(month).fill(0) : new Array(12).fill(0)

  return (
    <div>
      <FullDateSelect
        value={currentDate}
        onChange={(v) => {
          setCurrentDate(v)
        }}
      />

      {currentDate.year && currentDate.month && !currentDate.date && <YearAndMonthBook currentDate={currentDate} />}
      {currentDate.date && <DateBook currentDate={currentDate} />}
    </div>
  )
}

export default AccountRecord
