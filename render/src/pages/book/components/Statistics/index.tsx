import SvgIcon from '@/components/SvgIcon'

const Statistics = () => {
  return (
    <div className='w-3/5 p-2'>
      <div className='grid grid-cols-3 gap-2'>
        <div className='bg-container-bg-2 p-2 rounded-md'>
          <div className='flex items-center gap-1'>
            <div className='bg-red w-3 h-3 rounded-full flex items-center justify-center'>
              <SvgIcon name='cost' width={10} height={10} />
            </div>
            <span className='text-red font-bold  text-[12px]'>总支出</span>
          </div>
          <div className='text-font-default font-bold text-[18px] mt-1'>¥11.11</div>
          <div className='text-[10px] text-grey-1 mt-2'>
            <span className='text-grey-1 mr-1'>总收入</span>¥11.11
          </div>
          <div className='text-[10px] text-grey-1'>
            <span className='mr-1'>结余</span>-¥11.11
          </div>
        </div>
        <div className='bg-container-bg-2 p-2 rounded-md'>
          <div className='flex items-center gap-1'>
            <div className='bg-green w-3 h-3 rounded-full flex items-center justify-center'>
              <SvgIcon name='cost' width={10} height={10} />
            </div>
            <span className='text-green font-bold  text-[12px]'>剩余预算</span>
          </div>
          <div className='text-font-default font-bold text-[18px] mt-1'>¥11.11</div>
          <div className='text-[10px] text-grey-1 mt-2'>
            <span className='text-grey-1 mr-1'>总预算</span>¥11.11
          </div>
          <div className='text-[10px] text-grey-1'>
            <span className='mr-1'>剩余日均</span>-¥11.11
          </div>
        </div>
        <div className='bg-container-bg-2 p-2 rounded-md'>
          <div className='flex items-center gap-1'>
            <div className='bg-blue w-3 h-3 rounded-full flex items-center justify-center'>
              <SvgIcon name='cost' width={10} height={10} />
            </div>
            <span className='text-blue font-bold  text-[12px]'>待报销</span>
          </div>
          <div className='text-font-default font-bold text-[18px] mt-1'>¥11.11</div>
          <div className='text-[10px] text-grey-1 mt-2'>
            <span className='text-grey-1 mr-1'>已报销</span>¥11.11
          </div>
          <div className='text-[10px] text-grey-1'>
            <span className='mr-1'>报销入账</span>-¥11.11
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
