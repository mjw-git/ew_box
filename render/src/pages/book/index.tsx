import SvgIcon from '@/components/SvgIcon'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import Statistics from './components/Statistics'
import BookDetail from './components/BookDetail'
import BookContext from './bookContext'
import dayjs from 'dayjs'
import ChangeAccountBookModal from './components/ChangeAccountBookModal'
import { useOpen } from '@/hook/useOpen'
import AddBookItemModal from './components/AddBookItemModal'
import { useRequest } from 'ahooks'
import { getBookAccountList } from '@/services/book'

const Book = () => {
  const [type, setType] = useState('month')
  const [currentDay, setCurrentDay] = useState(dayjs())
  const [accountBook, setAccountBook] = useState<Book.BookAccountRes>()
  const { open: addOpen, openModal: showAdd, closeModal: closeAdd } = useOpen()
  const { open, openModal, closeModal } = useOpen()

  return (
    <BookContext.Provider value={{ type, setType, currentDay, setCurrentDay, accountBook, setAccountBook }}>
      <div className='h-[calc(100vh-40px)] overflow-auto'>
        <ChangeAccountBookModal open={open} onCancel={closeModal} />
        <div className='bg-container-bg-2 h-10 w-full flex justify-between items-center px-3'>
          <div className='flex items-center gap-2'>
            <div className='bg-icon-bg-yellow rounded-sm p-[2px]' style={{ backgroundColor: accountBook?.color }}>
              <SvgIcon width={12} height={12} className='text-white' name='light' />
            </div>
            {accountBook ? (
              <div onClick={openModal} className='flex items-center gap-[2px] cursor-pointer'>
                <span className='text-font-default font-bold text-[12px]'>{accountBook?.name}</span>
                <SvgIcon width={14} height={14} className='text-primary' name='switch' />
              </div>
            ) : (
              <span onClick={openModal} className='text-font-default font-bold text-[12px] cursor-pointer'>
                请选择账本
              </span>
            )}
          </div>
          {dayjs().isSame(currentDay, 'day') ? (
            <span className='text-font-default font-bold text-[14px]'>账本</span>
          ) : (
            <div onClick={() => setCurrentDay(dayjs())} className='bg-container-bg cursor-pointer p-1 rounded-md text-[10px]'>
              回到今天
            </div>
          )}

          <Select
            value={type}
            onValueChange={(value) => {
              setType(value)
              setCurrentDay(dayjs())
            }}>
            <SelectTrigger>
              <SelectValue placeholder='Select a type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='week'>按周统计</SelectItem>
                <SelectItem value='year'>按年统计</SelectItem>
                <SelectItem value='month'>按月统计</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex'>
          <Statistics />
          <BookDetail />
        </div>
        <AddBookItemModal open={addOpen} onCancel={closeAdd} currentDay={currentDay} />
        <div onClick={showAdd} className='fixed flex items-center justify-center cursor-pointer bottom-4 right-4 w-14 h-14 shadow-md rounded-full bg-yellow'>
          <SvgIcon width={24} height={24} name='add_default' />
        </div>
      </div>
    </BookContext.Provider>
  )
}

export default Book
