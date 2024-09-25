import SvgIcon from '@/components/SvgIcon'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { bookIcon } from '@/utils'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { addBookItem, getBookList } from '@/services/book'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  addOnSuccess: () => void
  currentDate?: {
    year: string
    month: string
    date: string
  }
}
interface AddItem {
  tag: string
  desc: string
  price: string
  type: number
}
const initAddItem = {
  tag: '',
  desc: '',
  price: '',
  type: 1,
}
const DateBook = (props: Props) => {
  const { currentDate, addOnSuccess } = props
  const { toast } = useToast()

  const [addItem, setAddItem] = useState<AddItem>(initAddItem)
  const { data: bookList, run: runGetBookList } = useRequest(() => getBookList(currentDate), {
    refreshDeps: [currentDate],
  })
  const { run: runAdd } = useRequest(addBookItem, {
    manual: true,
    onSuccess: () => {
      addOnSuccess?.()
      setAddItem(initAddItem)
      runGetBookList()
      toast({
        description: 'Add success',
      })
    },
  })
  const paymentPrice = useMemo(() => {
    return bookList?.list?.reduce((prev, cur) => {
      if (cur.type === 1) {
        return prev + cur.price
      }
      return prev
    }, 0)
  }, [bookList])
  const incomePrice = useMemo(() => {
    return bookList?.list?.reduce((prev, cur) => {
      if (cur.type === 2) {
        return prev + cur.price
      }
      return prev
    }, 0)
  }, [bookList])
  return (
    <div>
      <div className=' mt-1 border-[1px] border-border rounded-md p-2'>
        <div className=' items-center flex justify-between'>
          <input placeholder='Add Item' value={addItem.desc} onChange={(e) => setAddItem({ ...addItem, desc: e.target.value })} type='text' className='border-border border-[1px] w-full bg-white rounded-sm p-1  text-sm h-8 outline-none' />
        </div>
        <div className='flex items-center gap-5'>
          <span>
            ¥{' '}
            <input
              value={addItem.price}
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value) || !e.target.value) setAddItem({ ...addItem, price: e.target.value })
              }}
              placeholder='Cost'
              type='text'
              className='border-[1px] mt-1 w-18 border-border rounded-sm p-1 text-sm h-8 outline-none'
            />
          </span>
          <div className='flex gap-1'>
            <div className='flex items-center gap-1'>
              <Checkbox
                onCheckedChange={(e) => {
                  if (e) {
                    setAddItem({ ...addItem, type: 1 })
                  }
                }}
                checked={addItem.type === 1}
                value={1}></Checkbox>
              <Badge variant='destructive'>payment</Badge>
            </div>
            <div className='flex items-center gap-1'>
              <Checkbox
                checked={addItem.type === 2}
                onCheckedChange={(e) => {
                  if (e) {
                    setAddItem({ ...addItem, type: 2 })
                  }
                }}
                value={2}></Checkbox>
              <Badge className='bg-green-500'>income</Badge>
            </div>
          </div>
        </div>
        <div className='flex items-center mt-2 justify-between'>
          <div className='flex'>
            <span>Tag:</span>
            <Select value={addItem.tag} onValueChange={(value) => setAddItem({ ...addItem, tag: value })}>
              <SelectTrigger className='w-fit border-none h-6 text-slate-400'>
                <SelectValue className='text-slate-400' placeholder='Select a tag' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bookIcon.map((item, index) => {
                    return (
                      <SelectItem key={index} value={String(item)}>
                        <SvgIcon className='text-black' width={20} height={20} name={item} />
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex'>
            <button
              onClick={() => {
                if (!addItem.price) {
                  toast({
                    description: 'Price is required',
                  })
                  return
                }
                if (!addItem.desc) {
                  toast({
                    description: 'Desc is required',
                  })
                  return
                }
                runAdd({ ...addItem, price: Number(addItem.price), unix: dayjs(currentDate.year + '-' + currentDate.month + '-' + currentDate.date).unix() })
              }}
              className='h-5 text-[12px] bg-blue-500 text-white leading-5 px-2 rounded-sm hover:bg-blue-400'>
              Add
            </button>
          </div>
        </div>
      </div>
      <div className='bg-green-200 mt-2 p-1 rounded-md flex gap-3'>
        total: <Badge variant='destructive'>payment {paymentPrice}</Badge>
        <Badge className='bg-green-500'>income {incomePrice}</Badge>
      </div>
      <div className='grid grid-cols-2 mt-2 gap-2'>
        {(bookList?.list ?? []).map((item) => (
          <div className='border-[1px] border-border rounded-md p-2' key={item.id}>
            <div className=' items-center flex justify-between'>
              <span>{item.desc}</span>
              <span className='flex items-center gap-2'>
                {item.type === 1 ? <Badge variant='destructive'>payment</Badge> : <Badge className='bg-green-500'>income</Badge>}
                <span className={item.type === 1 ? 'text-red-500' : 'text-green-500'}>{item.price}</span>
              </span>
            </div>
            {item.tag && (
              <div>
                <SvgIcon className='text-green-600' width={16} height={16} name={item.tag} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DateBook
