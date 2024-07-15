import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Please input name',
  }),
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
      name: '',
      password: '',
      username: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name, username, password } = data
    const isSuccess = await window.passwordBoxApi.create({ name, username, password })

    if (isSuccess) {
      form.reset()
      setOpen(false)
      toast({
        description: 'create succeed',
      })
    } else {
      toast({
        description: 'create failed',
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          form.reset()
        }
        if (!open) {
          setOpen(false)
        }
      }}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)} className='rounded-[20px] p-[20px] border-[2px] flex items-center justify-center cursor-pointer border-primary border-solid bg-black text-primary font-bold text-4xl text-center'>
          Add
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input className='w-[380px]' placeholder='username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default AddPasswordDialog
