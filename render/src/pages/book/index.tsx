import { useRef } from 'react'
import AccountRecord from './components/AccountRecord'
import StaticsChart from './components/StaticsChart'

const Book = () => {
  const ref = useRef<{ runGetTrendData: () => void }>(null)
  return (
    <div className='flex gap-1'>
      <div className='w-1/2'>
        <AccountRecord addOnSuccess={() => ref.current?.runGetTrendData()} />
      </div>
      <div className='w-1/2'>
        <StaticsChart ref={ref} />
      </div>
    </div>
  )
}

export default Book
