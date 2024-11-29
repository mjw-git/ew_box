import SvgIcon from '@/components/SvgIcon'
import dayjs from 'dayjs'
import { days as WeekDay } from '@/utils'
import { Lunar } from 'lunar-typescript'
import { cn } from '@/lib/utils'
const WeekBook = () => {
  //dayjs获取这一周的日期
  const currentYear = dayjs().year()
  const currentMonth = dayjs().month() + 1
  const startDay = dayjs().startOf('week')
  const endDay = dayjs().endOf('week')
  const days = Array.from({ length: 7 }, (_, i) => startDay.add(i, 'day')).map((item) => ({
    chineseMonth: 1,
    day: item.date(),
    isToday: item.isSame(dayjs(), 'day'),
    // ...item,
  }))

  return (
    <div className='w-2/5 m-2'>
      <div className='w-full p-2 h-10 flex items-center justify-between rounded-lg bg-container-bg-2'>
        <div className='flex items-center w-full justify-between'>
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='left' />
          </div>
          <div className='text-[10px] cursor-pointer text-blue font-bold'>
            {currentYear}年{currentMonth}月{startDay.date()}日~{endDay.date()}日
          </div>
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='right' />
          </div>
        </div>
      </div>
      <div className='w-full flex  rounded-md mt-2 flex-col  bg-container-bg-2'>
        <div className='grid grid-cols-7  bg-container-bg-2'>
          {WeekDay.map((i) => (
            <div className='text-center h-8 box-border text-[12px] text-grey leading-8' key={i}>
              {i}
            </div>
          ))}
        </div>
        <div className='grid flex-1 grid-cols-7'>
          {days.map((i, index) => (
            <div key={index}>
              <div className={cn('m-1 rounded-md text-center text-[10px] bg-container-bg-3 h-10', { 'text-yellow': i.isToday })}>
                <div>{i.day}</div>
                {/* <div className='text-[8px]'>{i.chineseDay}</div> */}
                {i.day === 29 && <div className='text-[8px] text-green'>+10.0</div>}
                {i.day === 29 && <div className='text-[8px] text-red'>-10.0</div>}
              </div>

              {/* {i.day} */}
            </div>
          ))}
        </div>
      </div>
      <div className='w-full'>
        <div className='text-grey text-[10px] mt-1'>11/25 星期一</div>
        <div className='bg-container-bg-2  p-2 rounded-md w-full'>
          <div className='text-[14px] flex justify-between font-bold'>
            <span className='text-[12px]'>吃饭</span>
            <span className='text-[10px] font-normal'>支出 ¥22.2</span>
          </div>
          <div className='text-[10px] flex justify-between text-grey mt-1'>
            <span>默认账本</span>
            <span>备注</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekBook
