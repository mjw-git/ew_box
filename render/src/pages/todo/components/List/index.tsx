import Empty from '@/components/Empty'
import SvgIcon from '@/components/SvgIcon'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { addTodoItem, deleteToDo, finishToDo, getToDoList } from '@/services/todo'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useState } from 'react'

const List = () => {
  const { toast } = useToast()
  const [collapsed, setCollapsed] = useState('today')
  const [todo, setTodo] = useState('')
  const { data: unFinishedTodoList, run: getUnFinishedList } = useRequest(getToDoList)
  const { data: finishedTodoList, run: getFinishedList } = useRequest(() => getToDoList({ finished: 1 }))
  console.log(finishedTodoList)

  const { run: createTodo } = useRequest(addTodoItem, {
    manual: true,
    onSuccess: () => {
      getUnFinishedList()
      setTodo('')
      toast({
        description: 'create success',
      })
    },
  })
  const { run: runDeleteTodo } = useRequest(deleteToDo, {
    manual: true,
    onSuccess: () => {
      getFinishedList()
      getUnFinishedList()
      toast({
        description: 'delete success',
      })
    },
  })
  const { run: runFinish } = useRequest(finishToDo, {
    manual: true,
    onSuccess: () => {
      getUnFinishedList()
      getFinishedList()
      toast({ description: 'finish success' })
    },
  })
  return (
    <div>
      <input
        value={todo}
        onKeyDown={(e) => {
          if (e.code === 'Enter' && todo.trim()) {
            createTodo({ todo: todo })
          }
        }}
        onChange={(e) => {
          setTodo(e.target.value)
        }}
        placeholder='Please Enter To Add TODO'
        className='w-96 bg-border outline-none placeholder:text-slate-500 placeholder:text-sm h-8 rounded-sm px-2 focus:border-border focus:border-[1px] focus:bg-white'
      />
      <div className='mt-2'></div>
      <div className='grid w-full grid-cols-2 mt-4 gap-5'>
        <div>
          <div className='font-bold'>Unfinished</div>
          <Accordion
            onValueChange={(e) => {
              setCollapsed(e)
            }}
            type='single'
            value={collapsed}
            collapsible
            className='w-full'>
            <AccordionItem value='today'>
              <AccordionTrigger className='flex'>
                <span className='bg-green-400 px-2 rounded-sm'>Today</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-1'>
                  {(unFinishedTodoList?.today ?? []).length === 0 ? (
                    <Empty />
                  ) : (
                    (unFinishedTodoList?.today ?? []).map((item) => (
                      <div className='group flex items-center space-x-2 justify-between cursor-pointer hover:shadow-md  border-border border-[1px] px-2 py-3 rounded-md' key={item.id}>
                        <div className='flex items-center gap-1 '>
                          <Checkbox
                            onCheckedChange={(e) => {
                              if (e) {
                                runFinish({ id: item.id })
                              }
                            }}
                            id='terms'
                          />
                          <label htmlFor='terms' className='text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                            {item.todo}
                          </label>
                        </div>
                        <SvgIcon
                          onClick={() => {
                            runDeleteTodo({ id: item.id })
                          }}
                          className='hidden group-hover:block hover:text-green-400'
                          width={12}
                          height={12}
                          name='close'
                        />
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='yesterday'>
              <AccordionTrigger>
                <span className='bg-yellow-400 px-2 rounded-sm'>Yesterday</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-1'>
                  {(unFinishedTodoList?.yesterday ?? []).length === 0 ? (
                    <Empty />
                  ) : (
                    (unFinishedTodoList?.yesterday ?? []).map((item) => (
                      <div className='group flex items-center space-x-2 justify-between cursor-pointer hover:shadow-md  border-border border-[1px] px-2 py-3 rounded-md' key={item.id}>
                        <div className='flex items-center gap-1 '>
                          <Checkbox
                            onCheckedChange={(e) => {
                              if (e) {
                                runFinish({ id: item.id })
                              }
                            }}
                            id='terms'
                          />
                          <label htmlFor='terms' className='text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                            {item.todo}
                          </label>
                        </div>
                        <SvgIcon
                          onClick={() => {
                            runDeleteTodo({ id: item.id })
                          }}
                          className='hidden group-hover:block hover:text-green-400'
                          width={12}
                          height={12}
                          name='close'
                        />
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='earlier'>
              <AccordionTrigger>
                <span className='bg-slate-400 px-2 rounded-sm'>Earlier</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-col gap-1'>
                  {(unFinishedTodoList?.earlier ?? []).length === 0 ? (
                    <Empty />
                  ) : (
                    (unFinishedTodoList?.earlier ?? []).map((item) => (
                      <div className='group flex items-center space-x-2 justify-between cursor-pointer hover:shadow-md  border-border border-[1px] px-2 py-3 rounded-md' key={item.id}>
                        <div className='flex items-center gap-1 '>
                          <Checkbox
                            onCheckedChange={(e) => {
                              if (e) {
                                runFinish({ id: item.id })
                              }
                            }}
                            id='terms'
                          />
                          <label htmlFor='terms' className='text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                            {item.todo}
                          </label>
                        </div>
                        <SvgIcon
                          onClick={() => {
                            runDeleteTodo({ id: item.id })
                          }}
                          className='hidden group-hover:block hover:text-green-400'
                          width={12}
                          height={12}
                          name='close'
                        />
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <div className='font-bold'>Finished</div>
          <div className='flex flex-col gap-2 mt-3'>
            {(finishedTodoList?.list ?? []).length === 0 ? (
              <Empty />
            ) : (
              (finishedTodoList?.list ?? []).map((item) => (
                <div className='bg-gray-100 group cursor-pointer hover:shadow-md p-2 rounded-md' key={item.id}>
                  <div className='flex items-center  justify-between'>
                    <span className='text-slate-500'>{item.todo}</span>
                    <SvgIcon
                      onClick={() => {
                        runDeleteTodo({ id: item.id })
                      }}
                      width={14}
                      height={14}
                      className='hidden group-hover:block hover:text-red-300'
                      name='close'
                    />
                  </div>
                  <div className='text-red-300 text-sm'>{dayjs((item.finished_tm || 0) * 1000).format('YYYY-MM-DD HH:mm:ss')} Finished</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default List
