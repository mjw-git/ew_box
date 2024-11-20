import SvgIcon from '@/components/SvgIcon'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import Statistics from './components/Statistics'

const Book = () => {
  const [type, setType] = useState('week')

  return (
    <div>
      <div className='bg-container-bg-2 h-10 w-full flex justify-between items-center px-3'>
        <div className='flex items-center gap-2'>
          <div className='bg-icon-bg-1 rounded-sm p-[2px]'>
            <SvgIcon width={12} height={12} className='text-white' name='light' />
          </div>
          <div className='flex items-center gap-[2px] cursor-pointer'>
            <span className='text-textColor font-bold text-[12px]'>默认账本</span>
            <SvgIcon width={14} height={14} className='text-primary' name='switch' />
          </div>
        </div>
        <span className='text-textColor font-bold text-[14px]'>账本</span>

        <Select value={type} onValueChange={setType}>
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
      </div>
    </div>
  )
}

export default Book
