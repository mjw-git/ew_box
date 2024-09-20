import BaseElliTip from '@/components/BaseElliTip'
import Calendar from '@/components/Calendar'
import SvgIcon from '@/components/SvgIcon'
import { CalendarItem } from '@/hook/useCalendar'
import { addTodoItem, deleteToDo, finishToDo, getCalendarToDoList } from '@/services/todo'
import { useRequest } from 'ahooks'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import './index.css'
import { useToast } from '@/components/ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { useOpen } from '@/hook/useOpen'
const randomColor = ['bg-blue-400', 'bg-pink-500', 'bg-slate-500', 'bg-red-500', 'bg-orange-500']
const AddTodoPopOverCard = (props: { day: Dayjs; onSuccess?: () => void }) => {
  const { day, onSuccess } = props

  const { toast } = useToast()
  const [value, setValue] = useState('')
  const { open, openModal, closeModal } = useOpen()

  const { run: createTodo } = useRequest(addTodoItem, {
    manual: true,
    onSuccess: () => {
      onSuccess?.()
      setValue('')
      toast({
        description: 'Create Success',
      })
    },
  })
  return (
    <span>
      <Popover
        onOpenChange={(e) => {
          if (!e) {
            closeModal()
          }
        }}
        open={open}>
        <PopoverTrigger asChild>
          <SvgIcon
            onClick={() => {
              openModal()
            }}
            width={16}
            height={16}
            name='add'
            className='ml-1 hover:text-blue-600 opacity-0 group-hover:opacity-100'
          />
        </PopoverTrigger>
        <PopoverContent className='w-70'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-3'>
                <Label htmlFor='width'>Todo:</Label>
                <input
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      if (!value.trim()) {
                        toast({
                          variant: 'destructive',
                          description: 'Please Enter',
                        })
                        return
                      }
                      createTodo({ start_tm: day.unix(), todo: value, type: 2 })
                    }
                  }}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                  placeholder='Please Enter'
                  id='width'
                  className='border-border placeholder:text-sm border-[1px] px-1 rounded-sm outline-none focus:border-blue-400'
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </span>
  )
}
const CalendarContent = () => {
  const { toast } = useToast()
  const [calendars, setCalendars] = useState<CalendarItem[]>([])

  const { data: todoList, run: getTodoList } = useRequest(() => getCalendarToDoList({ start_tm_start: calendars[0].date.unix(), start_tm_end: calendars[calendars.length - 1].date.unix() }), {
    ready: calendars.length > 0,
    refreshDeps: [calendars],
  })
  const { run: deleteRun } = useRequest(deleteToDo, {
    manual: true,
    onSuccess: () => {
      getTodoList()
      toast({
        description: 'Delete Success',
      })
    },
  })
  const { run: finishRun } = useRequest(finishToDo, {
    manual: true,
    onSuccess: () => {
      getTodoList()
      toast({
        description: 'Done Success',
      })
    },
  })
  return (
    <Calendar
      renderOpt={({ date }) => {
        return <AddTodoPopOverCard day={date} />
      }}
      renderExtra={({ date }) => {
        const currentDays = (todoList?.list ?? []).filter((i) =>
          dayjs(i.create_tm * 1000)
            .startOf('day')
            .isSame(date),
        )
        if (currentDays.length > 0)
          return (
            <div className='mt-2 z-10 bg-white flex overflow-hidden group-hover:overflow-visible group-hover:pb-3 flex-col gap-1'>
              {currentDays.map((item, index) => (
                <div key={item.id} className={`wrapper ${randomColor[index % randomColor.length]} relative items-center gap-1 w-full flex p-[2px] box-border rounded-sm text-sm text-white`}>
                  <div className={`w-[6px] ${item.status ? 'bg-green-400' : 'bg-muted'} h-[6px] bg-green-400 rounded-[6px]`}></div>
                  <BaseElliTip className='text-left cursor-auto' text={item.todo} />
                  <div className={`absolute   hidden operation  bottom-[-12px] z-10`}>
                    <SvgIcon
                      name='close'
                      onClick={() => {
                        deleteRun({ id: item.id })
                      }}
                      className='bg-white hover:text-blue-400 rounded-sm text-black border-border border-[1px] z-10'
                      width={12}
                      height={12}
                    />
                    <SvgIcon
                      name='ok'
                      onClick={() => {
                        finishRun({ id: item.id })
                      }}
                      className='bg-white hover:text-blue-400 rounded-sm text-black border-border border-[1px] z-10'
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        return null
      }}
      onChange={(e) => {
        setCalendars(e)
      }}
    />
  )
}
export default CalendarContent
