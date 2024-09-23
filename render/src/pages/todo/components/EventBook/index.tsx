import SvgIcon from '@/components/SvgIcon'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Please Input Event Name',
  }),
  start_tm: z.date(),
})
const EventBook = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  }
  return (
    <div>
      <Dialog
        onOpenChange={() => {
          form.reset()
        }}>
        <DialogTrigger asChild>
          <Button variant='outline'>Add Event</Button>
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
              {/* <Button type='submit'>Submit</Button> */}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default EventBook
