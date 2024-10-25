import SvgIcon from '@/components/SvgIcon'

const Book = () => {
  // const ref = useRef<{ runGetTrendData: () => void }>(null)
  return (
    <div className='flex gap-1'>
      <div className='bg-container-bg-2 h-10 w-full flex justify-between items-center px-3'>
        <div>
          <div className='bg-icon-bg-1 rounded-sm p-1'>
            <SvgIcon width={12} height={12} className='text-white' name='light' />
          </div>
        </div>
        <span className='text-textColor font-bold text-[14px]'>账本</span>
        <span>333</span>
      </div>
      {/* <div className='w-1/2'>
        <AccountRecord addOnSuccess={() => ref.current?.runGetTrendData()} />
      </div>
      <div className='w-1/2'>
        <StaticsChart ref={ref} />
      </div> */}
    </div>
  )
}

export default Book
