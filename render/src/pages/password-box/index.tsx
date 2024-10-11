import PasswordInput from '@/components/PasswordInput'
import { useEffect, useRef, useState } from 'react'
import AddPasswordDialog from './components/AddPasswordDialog'
import { useToast } from '@/components/ui/use-toast'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import copy from 'copy-to-clipboard'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import SvgIcon from '@/components/SvgIcon'
import ShowPasswordDialog from './components/ShowPasswordDialog'
import BaseElliTip from '@/components/BaseElliTip'
import { starPassword } from '@/services/password'
const ImageCompress = () => {
  const [entered, setEntered] = useState(false)
  const [visibleId, setVisibleId] = useState(0)
  const [password, setPassword] = useState('')
  const [decryptPwd, setDecryptPwd] = useState('')

  const timeRef = useRef<NodeJS.Timeout>()
  const { toast } = useToast()
  const { data: pwdList, run: getList } = useRequest(window.passwordBoxApi.getList, {
    ready: entered,
    refreshDeps: [entered],
  })
  console.log(pwdList, '==')

  const { run: runStar } = useRequest(starPassword, {
    manual: true,
    onSuccess: () => {
      toast({
        title: 'Operation Success',
      })
      getList()
    },
  })
  const handleEnter = async () => {
    const checked = await window.passwordBoxApi.enter(password)

    if (checked) {
      setEntered(true)
    } else {
      toast({
        variant: 'destructive',
        description: 'Password Error',
      })
    }
  }

  useEffect(() => {
    function onEnter(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        if (password.length === 6) {
          handleEnter()
        }
      }
    }
    document.addEventListener('keydown', onEnter)
    return () => {
      document.removeEventListener('keydown', onEnter)
    }
  }, [password])

  return entered ? (
    <>
      <AddPasswordDialog onSuccess={getList} />
      <div className='grid grid-cols-4 gap-4'>
        {pwdList?.map((item) => (
          <div key={item.id} className='rounded-[20px] flex flex-col  p-3 border-[1px] cursor-pointer border-border border-solid hover:border-solid hover:shadow-md '>
            <div className='text-[14px] items-center flex justify-between text-primary'>
              <span className='text-blue-600 flex items-center gap-2'>
                {' '}
                <SvgIcon
                  onClick={() => {
                    runStar({ id: item.id })
                  }}
                  className={`${item.is_star ? 'text-yellow-400' : 'text-gray-400'} cursor-pointer`}
                  width={16}
                  height={16}
                  name='star'
                />
                {item.remark}
              </span>
              <div className='flex gap-1 items-center'>
                {visibleId !== item.id ? (
                  <ShowPasswordDialog
                    id={item.id}
                    onSuccess={(pwd) => {
                      clearTimeout(timeRef.current)
                      setDecryptPwd(pwd)
                      setVisibleId(item.id)
                      timeRef.current = setTimeout(() => {
                        setDecryptPwd('')
                        setVisibleId(0)
                        clearTimeout(timeRef.current)
                      }, 30000)
                    }}
                  />
                ) : (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <SvgIcon
                          name='copy'
                          onClick={() => {
                            copy(decryptPwd)
                            toast({
                              description: 'copy succeed',
                            })
                          }}
                          className='w-[14px] h-[14px] cursor-pointer'
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          decrypt:<span className='text-red-500'>{decryptPwd}</span>，you can click to copy
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <SvgIcon name='delete' className='w-[16px] h-[16px] cursor-pointer' />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>onConfirm</DialogTitle>
                    <div>confirm delete this password?</div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={async () => {
                            await window.passwordBoxApi.delete(item.id)
                            getList()
                            toast({
                              description: 'Delete Succeed',
                            })
                          }}
                          type='submit'>
                          yes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {item.username && (
              <div className='text-[12px] flex text-foreground'>
                <span>username</span>
                <span className='ml-2'>
                  <BaseElliTip text={item.username || '-'} />{' '}
                </span>
              </div>
            )}
            <div className='text-[12px] text-foreground'>
              <span>{dayjs(+item.create_tm * 1000).format('YYYY-MM-DD HH:mm:ss')} Created</span>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className='flex flex-col gap-[40px] items-center justify-center h-full'>
      <div className='text-primary text-xl'>Please enter the password to open this password box</div>
      <PasswordInput value={password} onChange={(e) => setPassword(e)} count={6} />
      <Button onClick={handleEnter} className='w-[120px] shadow-2xl  mt-[80px] border-solid border-[1px] border-primary'>
        Enter
      </Button>
    </div>
  )
}

export default ImageCompress
