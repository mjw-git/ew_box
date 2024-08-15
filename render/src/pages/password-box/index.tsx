import PlutoButton from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import CopyAllOutlined from '@mui/icons-material/CopyAllOutlined'
import { useContext, useEffect, useRef, useState } from 'react'
import AddPasswordDialog from './components/AddPasswordDialog'
import { useToast } from '@/components/ui/use-toast'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import copy from 'copy-to-clipboard'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import SvgIcon from '@/components/SvgIcon'
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

  const handleEnter = async () => {
    const checked = await window.passwordBoxApi.enter(password)

    if (checked) {
      setEntered(true)
    } else {
      toast({
        description: 'password error',
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
    <div className='grid grid-cols-2 gap-4'>
      <AddPasswordDialog onSuccess={getList} />
      {pwdList?.map((item) => (
        <div key={item.time} className='rounded-[20px] pl-[16px] pr-[16px] pt-[12px] pb-[12px] border-[2px] cursor-pointer border-border border-solid hover:border-solid hover:border-primary '>
          <div className='font-bold text-[24px] items-center flex justify-between text-primary'>
            <span>{item.name}</span>
            <div className='flex gap-1'>
              {visibleId !== item.time ? (
                <SvgIcon
                  name='visible_eye'
                  onClick={async () => {
                    clearTimeout(timeRef.current)
                    const pwd = await window.passwordBoxApi.decrypt(item.time)
                    setDecryptPwd(pwd)
                    setVisibleId(item.time)
                    timeRef.current = setTimeout(() => {
                      setDecryptPwd('')
                      setVisibleId(0)
                      clearTimeout(timeRef.current)
                    }, 30000)
                  }}
                  className='text-black w-[12px] h-[12px] hover:text-primary cursor-pointer'
                />
              ) : (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <SvgIcon
                        name='visible_eye text-[14px]'
                        onClick={() => {
                          copy(decryptPwd)
                          toast({
                            description: 'copy succeed',
                          })
                        }}
                        className='text-white mt-[-14px] hover:text-primary cursor-pointer'
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
                  <DeleteOutline className='text-white hover:text-primary cursor-pointer' />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>onConfirm</DialogTitle>
                  <div>confirm delete this password?</div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={async () => {
                          await window.passwordBoxApi.delete(item.time)
                          getList()
                          toast({
                            description: 'delete succeed',
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
          <div className='text-[14px] font-bold text-primary'>
            create time: <span className='text-white font-thin'>{dayjs(item.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className='flex flex-col gap-[40px] items-center justify-center h-full'>
      <h3 className='text-primary text-xl'>Please enter the password to open this password box</h3>
      <PasswordInput value={password} onChange={(e) => setPassword(e)} count={6} />
      <PlutoButton onClick={handleEnter} className='w-[120px] shadow-2xl  mt-[80px] text-primary border-solid border-[1px] border-primary'>
        Enter
      </PlutoButton>
    </div>
  )
}

export default ImageCompress
