import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

const FormSchema = z.object({
  remark: z.string().min(1, {
    message: 'Please input name',
  }),
  username: z.string().min(2, {
    message: 'Please input username',
  }),
  password: z.string().min(1, {
    message: 'Please input password',
  }),
})
const AddPasswordDialog = (props: { onSuccess: () => void }) => {
  const { onSuccess } = props

  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      remark: '',
      password: '',
      username: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { remark, username, password } = data
    const isSuccess = await window.passwordBoxApi.create({ remark, username, password })

    if (isSuccess) {
      form.reset()
      setOpen(false)
      toast({
        description: 'create succeed',
      })
      onSuccess?.()
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
        <div onClick={() => setOpen(true)} className='rounded-[20px] p-[20px] border-[1px] flex items-center justify-center cursor-pointer border-border border-solid  text-primary font-bold text-4xl text-center'>
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
              name='remark'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input className='w-[380px]' placeholder='name' {...field} />
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
                    <Input type='password' className='w-[380px]' placeholder='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default AddPasswordDialog
