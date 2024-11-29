import Calendar from '@/components/Calendar'
import SvgIcon from '@/components/SvgIcon'
import dayjs from 'dayjs'

const MonthBook = () => {
  const currentYear = dayjs().year()
  const currentMonth = dayjs().month() + 1
  return (
    <div className='w-2/5 m-2'>
      <div className='w-full p-2 h-10 flex items-center justify-between rounded-lg bg-container-bg-2'>
        <div className='flex items-center w-full justify-between'>
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='left' />
          </div>
          <div className='text-[10px] cursor-pointer text-blue font-bold'>
            {currentYear}年{currentMonth}月
          </div>
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='right' />
          </div>
        </div>
      </div>
      <Calendar showTopAction={false} />
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

export default MonthBook
