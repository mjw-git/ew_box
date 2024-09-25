import dayjs from 'dayjs'
import { useState } from 'react'
import FullDateSelect from './components/FullDateSelect'
import YearAndMonthBook from './components/YearAndMonthBook'
import DateBook from './components/DateBook'

const AccountRecord = (props: { addOnSuccess: () => void }) => {
  const now = dayjs()
  const month = now.month() + 1
  const year = now.year()
  const date = now.date()
  const [currentDate, setCurrentDate] = useState({ year: String(year), month: String(month), date: String(date) })

  return (
    <div>
      <FullDateSelect
        value={currentDate}
        onChange={(v) => {
          setCurrentDate(v)
        }}
      />

      {(currentDate.year || currentDate.month) && !currentDate.date && <YearAndMonthBook currentDate={currentDate} />}
      {currentDate.date && <DateBook currentDate={currentDate} addOnSuccess={props.addOnSuccess} />}
    </div>
  )
}

export default AccountRecord
