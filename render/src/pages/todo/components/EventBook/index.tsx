import SvgIcon from '@/components/SvgIcon'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { addTodoItem, deleteToDo, getEventBookToDoList } from '@/services/todo'
import { randomColor } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRequest } from 'ahooks'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Please Input Event Name',
  }),
  start_tm: z.date(),
})
const EventBook = () => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })
  const { data: eventData, run: getEventList } = useRequest(getEventBookToDoList)
  const { run: runDelete } = useRequest(deleteToDo, {
    manual: true,
    onSuccess: () => {
      toast({
        title: 'Delete Event Success',
      })
      getEventList()
    },
  })
  const { run: runAdd } = useRequest(addTodoItem, {
    manual: true,
    onSuccess: () => {
      setOpen(false)
      getEventList()
      toast({
        title: 'Add Event Success',
      })
    },
  })
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    runAdd({
      todo: data.name,
      type: 3,
      start_tm: Math.floor(data.start_tm.getTime() / 1000),
    })
  }
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setOpen(v)
          }
          form.reset()
        }}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant='default'>
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>Add Memorable Events</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl className='mb-4'>
                      <Input placeholder='Event Name' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='start_tm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl className='mb-4'>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={'outline'} className={cn('w-[280px] justify-start text-left font-normal relative flex', !field.value && 'text-muted-foreground')}>
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value ? (
                              <div className='flex items-center justify-between'>
                                {format(field.value, 'PPP')}
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    field.onChange(null)
                                  }}>
                                  <SvgIcon className='hover:text-green-500' width={16} height={16} name='close' />
                                </span>
                              </div>
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0 block'>
                          <Calendar {...field} mode='single' selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit'>Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className='mt-3 grid grid-cols-4 gap-4 '>
        {(eventData?.list ?? []).map((item) => (
          <div key={item.id} className='border-border hover:shadow-md cursor-pointer border-[1px] p-1 rounded-lg'>
            <div className='text-[24px] flex justify-between items-center'>
              {item.todo}
              <Dialog>
                <DialogTrigger asChild>
                  <span className='opacity-0 group-hover:opacity-100'>
                    <SvgIcon width={16} height={16} name='close' />
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>onConfirm</DialogTitle>
                  <div>Confirm delete this event?</div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          runDelete({ id: item.id })
                        }}
                        type='submit'>
                        yes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className={`flex justify-end  ${'text-' + randomColor[Math.floor(Math.random() * randomColor.length)]}`}>{dayjs().diff(dayjs(dayjs.unix(item.start_tm)), 'day') + 1} Days</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default EventBook
