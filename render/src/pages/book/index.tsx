import SvgIcon from '@/components/SvgIcon'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import Statistics from './components/Statistics'
import BookDetail from './components/BookDetail'
import BookContext from './bookContext'
import dayjs from 'dayjs'

const Book = () => {
  const [type, setType] = useState('month')
  const [currentDay, setCurrentDay] = useState(dayjs())
  return (
    <BookContext.Provider value={{ type, setType, currentDay, setCurrentDay }}>
      <div className='h-[calc(100vh-40px)] overflow-auto'>
        <div className='bg-container-bg-2 h-10 w-full flex justify-between items-center px-3'>
          <div className='flex items-center gap-2'>
            <div className='bg-icon-bg-1 rounded-sm p-[2px]'>
              <SvgIcon width={12} height={12} className='text-white' name='light' />
            </div>
            <div className='flex items-center gap-[2px] cursor-pointer'>
              <span className='text-font-default font-bold text-[12px]'>默认账本</span>
              <SvgIcon width={14} height={14} className='text-primary' name='switch' />
            </div>
          </div>
          {dayjs().isSame(currentDay, 'day') ? (
            <span className='text-font-default font-bold text-[14px]'>账本</span>
          ) : (
            <div onClick={() => setCurrentDay(dayjs())} className='bg-container-bg cursor-pointer p-1 rounded-md text-[10px]'>
              回到今天
            </div>
          )}

          <Select
            value={type}
            onValueChange={(value) => {
              setType(value)
              setCurrentDay(dayjs())
            }}>
            <SelectTrigger>
              <SelectValue placeholder='Select a type' />
            </SelectTrigger>
            <SelectContent className='bg-select-menu-bg'>
              <SelectGroup>
                <SelectItem value='week'>按周统计</SelectItem>
                <SelectItem value='year'>按年统计</SelectItem>
                <SelectItem value='month'>按月统计</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex'>
          <Statistics />
          <BookDetail />
        </div>
      </div>
    </BookContext.Provider>
  )
}

export default Book
