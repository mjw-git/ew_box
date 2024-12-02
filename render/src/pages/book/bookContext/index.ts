import { Dayjs } from 'dayjs'
import { createContext } from 'react'
interface BookContextProps {
  type: string
  setType?: (type: string) => void
  currentDay?: Dayjs
  setCurrentDay?: (day: Dayjs) => void
}
const BookContext = createContext<BookContextProps>({
  type: 'month',
})

export default BookContext
