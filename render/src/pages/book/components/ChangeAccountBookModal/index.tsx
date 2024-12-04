import Modal, { ModalProps } from '@/components/Modal'
import SvgIcon from '@/components/SvgIcon'
import { iconBgColors } from '@/utils'
import { useState } from 'react'

const ChangeAccountBookModal = (props: ModalProps) => {
  const [step, setStep] = useState('default')
  const [currentColor, setCurrentColor] = useState(iconBgColors[0].value)
  return (
    <Modal
      {...props}
      title={step === 'add' ? '添加账本' : '选择账本'}
      renderCancel={
        step === 'add' ? (
          <button
            onClick={() => {
              setStep('default')
            }}
            className='border-none outline-none text-blue'>
            <SvgIcon width={18} height={18} name='left' />
          </button>
        ) : null
      }
      renderOk={
        step === 'default' ? (
          <button
            className='border-none outline-none text-blue'
            onClick={() => {
              setStep('add')
            }}>
            添加
          </button>
        ) : (
          <button
            className='border-none text-blue'
            onClick={() => {
              setStep('default')
            }}>
            确认
          </button>
        )
      }
      contentClassName='bg-container-bg min-h-[300px]'>
      {step === 'default' && (
        <div className='grid grid-cols-2 gap-2'>
          <div className='bg-container-bg-2 p-2 rounded-lg h-16 flex items-center gap-2'>
            <div className='flex justify-center flex-col gap-2'>
              <div className='w-4 h-4  rounded-full  bg-icon-bg-yellow'></div>
              <div className='text-[12px] font-bold'>默认账本</div>
            </div>
          </div>
        </div>
      )}
      {step === 'add' && (
        <>
          <div className='bg-container-bg-2 p-2 rounded-md flex gap-3 items-center'>
            <div className='w-6 h-6 rounded-full text-white flex items-center justify-center' style={{ backgroundColor: currentColor }}>
              <SvgIcon width={16} height={16} name='book_account' />
            </div>
            <input placeholder='请输入账本名称' className='h-8 w-3/5 px-2 rounded-md bg-container-bg border-none outline-none' />
          </div>
          <div className='flex gap-3 bg-container-bg-2 p-2 rounded-md mt-3'>
            {iconBgColors.map((item) => (
              <div key={item.value} className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer`} style={{ backgroundColor: item.value }} onClick={() => setCurrentColor(item.value)}>
                {currentColor === item.value && <div className='w-7 h-7 rounded-full cursor-pointer border-2 border-white'></div>}
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  )
}

export default ChangeAccountBookModal
