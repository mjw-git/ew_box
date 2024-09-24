import AccountRecord from './components/AccountRecord'
import StaticsChart from './components/StaticsChart'

const Book = () => {
  return (
    <div className='flex gap-1'>
      <div className='w-1/2'>
        <AccountRecord />
      </div>
      <div className='w-1/2'>
        <StaticsChart />
      </div>
    </div>
  )
}

export default Book
