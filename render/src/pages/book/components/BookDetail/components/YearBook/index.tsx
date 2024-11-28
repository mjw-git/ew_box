import SvgIcon from '@/components/SvgIcon'
import classNames from 'classnames'
import dayjs from 'dayjs'

const YearBook = () => {
  const currentYear = dayjs().year()
  const currentMonth = dayjs().month() + 1
  return (
    <div className='w-2/5 m-2'>
      <div className='w-full p-2 h-10 flex items-center justify-between rounded-lg bg-container-bg-2'>
        <div className='flex items-center w-full justify-between'>
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='left' />
          </div>
          <div className='text-[10px] text-blue font-bold'>{currentYear}年</div>
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='right' />
          </div>
        </div>
      </div>
      <div className='bg-container-bg-2 mt-2 p-2 rounded-sm'>
        <div className='grid grid-cols-6 gap-1'>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className='w-full h-10 rounded-lg bg-container-bg-3'>
              <div className={classNames('flex justify-center w-full text-[10px]', { ['text-yellow']: index + 1 === currentMonth })}>{index + 1}月</div>
              <div className='flex justify-center w-full text-[8px] text-green'>+20.00w</div>
              <div className='flex justify-center w-full text-[8px] text-red'>-20.00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YearBook
