import { useContext } from 'react'
import BookContext from '../../bookContext'
import MonthBook from './components/MonthBook'
import WeekBook from './components/WeekBook'
import YearBook from './components/YearBook'

const BookDetail = () => {
  const { type } = useContext(BookContext)
  return type === 'month' ? <MonthBook /> : type === 'year' ? <YearBook /> : <WeekBook />
}

export default BookDetail
