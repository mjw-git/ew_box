import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import SvgIcon from '@/components/SvgIcon'

const FormSchema = z.object({
  password: z.string().min(1, {
    message: 'Please input password',
  }),
})
interface ShowPasswordDialogProps {
  time: number
  onSuccess: (pwd: string) => void
}
const ShowPasswordDialog = (props: ShowPasswordDialogProps) => {
  const { onSuccess, time } = props

  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { password } = data
    try {
      const pwd = await window.passwordBoxApi.decrypt(time, password)
      form.reset()
      setOpen(false)
      toast({
        description: 'succeed',
      })
      onSuccess?.(pwd)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'password is wrong',
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
        <SvgIcon
          onClick={() => {
            setOpen(true)
          }}
          name='hide_eye'
          // onClick={async () => {
          //   clearTimeout(timeRef.current)
          //   const pwd = await window.passwordBoxApi.decrypt(item.time)
          //   setDecryptPwd(pwd)
          //   setVisibleId(item.time)
          //   timeRef.current = setTimeout(() => {
          //     setDecryptPwd('')
          //     setVisibleId(0)
          //     clearTimeout(timeRef.current)
          //   }, 30000)
          // }}
          className='text-black w-[24px] h-[24px] hover:text-primary cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
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
export default ShowPasswordDialog
