import Modal from '@/components/Modal'
import SvgIcon from '@/components/SvgIcon'
import { useOpen } from '@/hook/useOpen'
import classNames from 'classnames'
import dayjs from 'dayjs'

const YearBook = () => {
  const currentYear = dayjs().year()

  const yearOptions = Array.from({ length: (currentYear - 2018) * 2 }).map((_, index) => 2018 + index)

  const { open, openModal, closeModal } = useOpen()
  const currentMonth = dayjs().month() + 1
  return (
    <div className='w-2/5 m-2'>
      <Modal showCancel={false} open={open} onCancel={closeModal}>
        <div className='h-[300px] overflow-y-auto'>
          {yearOptions.map((item) => (
            <div
              onClick={() => {
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
          <div className='w-3 h-3 flex items-center justify-center rounded-full bg-blue'>
            <SvgIcon width={10} className='text-white' height={10} name='left' />
          </div>
          <div className='text-[10px] cursor-pointer text-blue font-bold' onClick={() => openModal()}>
            {currentYear}年
          </div>
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
      <div className='w-full'>
        <div className='text-grey text-[10px] mt-1'>11/25 星期一</div>
        <div className='bg-container-bg-2 p-2 rounded-md w-full'>
          <div className='text-[14px] font-bold'>吃饭</div>
          <div className='text-[10px] text-grey mt-1'>备注</div>
        </div>
      </div>
    </div>
  )
}

export default YearBook
