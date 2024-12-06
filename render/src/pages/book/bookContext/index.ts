import { Dayjs } from 'dayjs'
import { createContext } from 'react'
interface BookContextProps {
  type: string
  setType?: (type: string) => void
  currentDay?: Dayjs
  accountBook?: Book.BookAccountRes
  setAccountBook?: (id: Book.BookAccountRes) => void
  setCurrentDay?: (day: Dayjs) => void
}
const BookContext = createContext<BookContextProps>({
  type: 'month',
})

export default BookContext
