import Modal from '@/components/Modal'
import SvgIcon from '@/components/SvgIcon'
import { useOpen } from '@/hook/useOpen'
import BookContext from '@/pages/book/bookContext'
import { yearOptions } from '@/utils'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useContext } from 'react'

const YearBook = () => {
  const { currentDay, setCurrentDay } = useContext(BookContext)
  const currentYear = currentDay.year()
  const { open, openModal, closeModal } = useOpen()
  const currentMonth = currentDay.month() + 1
  return (
    <div className='w-2/5 m-2'>
      <Modal showConfirm={false} open={open} onCancel={closeModal}>
        <div className='h-[300px] overflow-y-auto '>
          {yearOptions.map((item) => (
            <div
              onClick={() => {
                setCurrentDay(dayjs(`${item}-${currentMonth}-${currentDay.date()}`))
                closeModal()
              }}
              className={classNames('bg-container-bg-3 text-[10px] text-center mb-2 cursor-pointer p-2 rounded-md', { ['text-blue']: item === currentYear })}>
              {item}
            </div>
          ))}
        </div>
      </Modal>
      <div className='w-full p-2 h-10 flex items-center justify-between rounded-lg bg-container-bg-2'>
        <div className='flex items-center w-full justify-between'>
          <div
            onClick={() => {
              setCurrentDay(currentDay.subtract(1, 'year'))
            }}
            className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='left' />
          </div>
          <div className='text-[10px] cursor-pointer text-blue font-bold' onClick={() => openModal()}>
            {currentYear}年
          </div>
          <div
            onClick={() => {
              setCurrentDay(currentDay.add(1, 'year'))
            }}
            className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
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

export default YearBook
