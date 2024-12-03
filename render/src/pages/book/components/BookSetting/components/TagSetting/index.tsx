import { cn } from '@/lib/utils'
import { defaultIncomeTag, defaultPaymentTag } from '@/utils'
import { useState } from 'react'

const TagSetting = () => {
  const [type, setType] = useState('payment')
  return (
    <div className='w-1/2 mt-1'>
      <div className='flex gap-2 bg-border-default p-1 rounded-2xl'>
        <div onClick={() => setType('payment')} className={cn(' flex-1 px-3 text-center cursor-pointer text-[14px] rounded-lg', { 'bg-container-bg-2': type === 'payment' })}>
          支出
        </div>
        <div onClick={() => setType('income')} className={cn(' flex-1 px-3 text-center cursor-pointer text-[14px] rounded-lg', { 'bg-container-bg-2': type === 'income' })}>
          收入
        </div>
      </div>
      <div className='mt-2 max-h-[calc(100vh-100px)] overflow-y-auto'>
        {(type === 'payment' ? defaultPaymentTag : defaultIncomeTag).map((item) => (
          <div key={item.value} className='flex bg-container-bg-2 px-2 py-2 border-b border-border-default rounded-lg items-center gap-2'>
            <div className={cn('w-4 h-4 rounded-full', { 'bg-icon-bg-red': type === 'payment' }, { 'bg-icon-bg-green': type === 'income' })}></div>
            <div>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagSetting
