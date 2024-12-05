import Calendar from '@/components/Calendar'
import Modal from '@/components/Modal'
import SvgIcon from '@/components/SvgIcon'
import { useOpen } from '@/hook/useOpen'
import { cn } from '@/lib/utils'
import BookContext from '@/pages/book/bookContext'
import { yearOptions } from '@/utils'
import dayjs from 'dayjs'
import { useContext } from 'react'
const monthOptions = Array.from({ length: 12 }).map((_, index) => index + 1)
const MonthBook = () => {
  const { currentDay, setCurrentDay } = useContext(BookContext)
  const currentYear = currentDay.year()
  const currentMonth = currentDay.month() + 1
  const { openModal, closeModal, open } = useOpen()
  return (
    <div className='w-2/5 m-2'>
      <div className='w-full p-2 h-10 flex items-center justify-between rounded-lg bg-container-bg-2'>
        <div className='flex items-center w-full justify-between'>
          <div
            onClick={() => {
              setCurrentDay(currentDay.subtract(1, 'month'))
            }}
            className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='left' />
          </div>
          <div onClick={() => openModal()} className='text-[10px] cursor-pointer text-blue font-bold'>
            {currentYear}年{currentMonth}月
          </div>
          <div
            onClick={() => {
              setCurrentDay(currentDay.add(1, 'month'))
            }}
            className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='right' />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onCancel={closeModal}
        renderOk={
          <div
            onClick={() => {
              setCurrentDay(dayjs())
              closeModal()
            }}
            className='text-blue text-[12px] cursor-pointer'>
            本月
          </div>
        }>
        <div className='h-[300px] overflow-y-auto'>
          {yearOptions.map((year) => {
            return (
              <div className='mb-3'>
                <div className='text-[12px] mb-2'>{year}年</div>
                <div className='grid grid-cols-6 gap-2'>
                  {monthOptions.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentDay(dayjs(`${year}-${item}-01`))
                          closeModal()
                        }}
                        className={cn('text-[10px]  bg-container-bg text-center px-1 py-3 rounded-md', {
                          'text-yellow': year === currentDay.year() && item === currentDay.month() + 1,
                        })}>
                        {item}月
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Modal>

      <Calendar onClickItem={setCurrentDay} currentDay={currentDay} showTopAction={false} />
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
