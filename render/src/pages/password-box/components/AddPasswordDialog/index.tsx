import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import PlutoButton from '@/components/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Please input username',
  }),
  password: z.string().min(1, {
    message: 'Please input password',
  }),
})
const AddPasswordDialog = () => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset()
    setOpen(false)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          form.reset()
        }
      }}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className='rounded-[20px] p-[20px] border-[2px] flex items-center justify-center cursor-pointer border-primary border-solid bg-black text-primary font-bold text-4xl text-center'>
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className='w-[380px]' placeholder='username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className='w-[380px]' placeholder='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type='submit'>Submit</Button>
            </DialogClose>
            <DialogFooter></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default AddPasswordDialog
