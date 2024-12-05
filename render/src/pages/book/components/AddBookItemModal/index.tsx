import Modal, { ModalProps } from '@/components/Modal'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useOpen } from '@/hook/useOpen'
import { cn } from '@/lib/utils'
import { defaultIncomeTag, defaultPaymentTag } from '@/utils'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
interface AddBookItemModalProps extends ModalProps {
  currentDay: Dayjs
}
const AddBookItemModal = (props: AddBookItemModalProps) => {
  const { currentDay, onCancel, ...rest } = props
  const [type, setType] = useState<1 | 2>(1)
  const [price, setPrice] = useState('')
  const [selectDate, setSelectDate] = useState(currentDay)
  const [currentTag, setCurrentTag] = useState<string | null>(null)

  const { open, openModal, closeModal } = useOpen()

  const handleCancel = () => {
    onCancel()
    setType(1)
    setCurrentTag(defaultPaymentTag[0].label)
  }

  useEffect(() => {
    setSelectDate(currentDay)
  }, [currentDay])

  return (
    <Modal
      contentClassName='bg-container-bg'
      onCancel={handleCancel}
      {...rest}
      title={
        <div className='flex p-1 rounded-md gap-2 items-center bg-container-bg justify-center'>
          <div
            className={cn('flex items-center px-1 py-0.5 cursor-pointer rounded-md justify-center', type === 1 && 'bg-container-bg-2')}
            onClick={() => {
              setCurrentTag(defaultPaymentTag[0].label)
              setType(1)
            }}>
            支出
          </div>
          <div
            className={cn('flex items-center px-1 py-0.5 cursor-pointer rounded-md justify-center', type === 2 && 'bg-container-bg-2')}
            onClick={() => {
              setType(2)
              setCurrentTag(defaultIncomeTag[0].label)
            }}>
            收入
          </div>
        </div>
      }>
      <div className='grid grid-cols-10 gap-2'>
        {(type === 1 ? defaultPaymentTag : defaultIncomeTag).map((i) => (
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className={cn('bg-grey flex w-6 h-6 cursor-pointer items-center justify-center rounded-full text-center text-[10px] px-1 py-0.5', currentTag === i.label && (type === 1 ? 'bg-icon-bg-red' : 'bg-icon-bg-green'))} key={i.value} onClick={() => setCurrentTag(i.label)}></div>
            <div className='text-grey text-[10px]'>{i.label}</div>
          </div>
        ))}
      </div>
      <div className='bg-container-bg-2 mt-2 rounded-md p-2'>
        <input
          onChange={(e) => {
            if (/^\d*\.?\d*$/.test(e.target.value) || !e.target.value) setPrice(e.target.value)
          }}
          value={price}
          className='p-2 w-full bg-container-bg outline-none rounded-md'
          placeholder='¥ 00.00'></input>
        <div className='flex items-center gap-2 text-[10px] mt-1'>
          <Popover
            open={open}
            onOpenChange={(e) => {
              if (!e) {
                closeModal()
              }
            }}>
            <PopoverTrigger asChild>
              <span onClick={openModal} className='text-[10px] flex-shrink-0 text-grey cursor-pointer bg-container-bg-3 px-1 rounded-md'>
                {selectDate.format('YYYY-MM-DD')}
              </span>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                onSelect={(date) => {
                  closeModal()
                  setSelectDate(dayjs(date).set('hour', dayjs().hour()).set('minute', dayjs().minute()).set('second', dayjs().second()))
                }}
                selected={selectDate.toDate()}
                mode='single'
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <span className='flex-shrink-0'>备注</span>
          <input placeholder='请填写备注' className='block outline-none w-full p-1 rounded-md bg-container-bg' />
        </div>
      </div>
    </Modal>
  )
}
export default AddBookItemModal
