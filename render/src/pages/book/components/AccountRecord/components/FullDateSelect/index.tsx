import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { months } from '@/utils'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}
export interface currentDate {
  month: string
  year: string
  date: string
}
interface Props {
  value: currentDate
  onChange: (value: currentDate) => void
}
const FullDateSelect = (props: Props) => {
  const { value, onChange } = props
  const now = dayjs().startOf('day')

  const year = now.year()
  const month = now.month() + 1
  const date = now.date()
  const [currentDate, setCurrentDate] = useState({
    month: String(month),
    year: String(year),
    date: String(date),
  })
  useEffect(() => {
    if (value) {
      console.log(value)

      setCurrentDate(value)
    }
  }, [value])
  //给一个月份算出这个月有多少天
  const days = useMemo(() => {
    const dayNum = getDaysInMonth(+currentDate.year, +currentDate.month)
    return new Array(dayNum).fill(0).map((_, index) => {
      return {
        label: index + 1,
        value: index + 1,
      }
    })
  }, [currentDate.year, currentDate.month])
  //判断是第几个月
  const nearly20Years = useMemo(() => {
    return new Array(year - 2000 + 1).fill(0).map((_, index) => {
      return {
        label: index + 2000,
        value: String(index + 2000),
      }
    })
  }, [year])
  return (
    <div className='flex items-center'>
      <span
        onClick={() => {
          if (!currentDate.month && !currentDate.date) {
            setCurrentDate({ ...currentDate, year: '' })
            onChange({ ...currentDate, year: '' })
          }
          if (currentDate.month && !currentDate.date) {
            setCurrentDate({ ...currentDate, month: '', date: '' })
            onChange({ ...currentDate, month: '', date: '' })
          }
          if (currentDate.month && currentDate.date) {
            setCurrentDate({ ...currentDate, date: '' })
            onChange({ ...currentDate, date: '' })
          }
        }}
        className='cursor-pointer'>
        <Button size='sm' disabled={!currentDate.month && !currentDate.date}>
          Back To {currentDate.month && !currentDate.date ? 'Year' : 'Month'}
        </Button>
      </span>
      <Select
        onValueChange={(value) => {
          setCurrentDate({ ...currentDate, year: value })
          onChange({ ...currentDate, year: value })
        }}
        value={String(currentDate.year)}>
        <SelectTrigger className='w-fit border-none'>
          <SelectValue placeholder='Year' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {nearly20Years.map((item, index) => {
              return (
                <SelectItem key={index} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {
        <Select
          onValueChange={(value) => {
            setCurrentDate({ ...currentDate, month: value })
            onChange({ ...currentDate, month: value })
          }}
          value={String(currentDate.month)}>
          <SelectTrigger className='w-fit border-none'>
            <SelectValue placeholder='Month' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {months.map((item, index) => {
                return (
                  <SelectItem key={index} value={String(index + 1)}>
                    {item}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      }
      {
        <Select
          onValueChange={(value) => {
            console.log(value, '==')

            setCurrentDate({ ...currentDate, date: value })
            onChange({ ...currentDate, date: value })
          }}
          value={String(currentDate.date)}>
          <SelectTrigger className='w-fit border-none'>
            <SelectValue placeholder='Date' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {days.map((item, index) => {
                return (
                  <SelectItem key={index} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      }
      <Button
        size='sm'
        onClick={() => {
          setCurrentDate({ ...currentDate, year: String(year), month: String(month), date: String(date) })
          onChange({ ...currentDate, year: String(year), month: String(month), date: String(date) })
        }}
        variant='secondary'>
        Back To Today
      </Button>
    </div>
  )
}

export default FullDateSelect
