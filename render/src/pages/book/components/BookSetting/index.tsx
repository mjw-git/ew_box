import SvgIcon from '@/components/SvgIcon'
import { cn } from '@/lib/utils'
import { bookSettingOptions } from '@/utils'
import { useState } from 'react'
import TagSetting from './components/TagSetting'

const BookSetting = () => {
  const [tag, setTag] = useState('tag')
  const switchComp = () => {
    switch (tag) {
      case 'tag':
        return <TagSetting />
    }
  }
  return (
    <>
      <div className='text-font-default font-bold text-[14px] h-10 bg-container-bg-2 flex items-center justify-center'>{bookSettingOptions.find((item) => item.value === tag).label}</div>
      <div className='p-2 flex gap-2'>
        <div className='w-1/2'>
          {bookSettingOptions.map((item) => (
            <div
              onClick={() => {
                setTag(item.value)
              }}
              className={cn('text-[14px] mb-3 flex justify-between items-center w-full bg-container-bg-2 px-3 py-2 rounded-2xl cursor-pointer', { 'bg-container-bg-3': tag === item.value })}>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-icon-bg-1 rounded-sm'>
                  <SvgIcon name={item.value} width={16} height={16} />
                </div>
                <span>{item.label}</span>
              </div>
              <SvgIcon name='right' width={20} height={20} />
            </div>
          ))}
        </div>
        {switchComp()}
      </div>
    </>
  )
}

export default BookSetting
