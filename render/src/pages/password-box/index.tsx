import PlutoButton from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'
import SnackerBarContext from '@/context/snackerBarContext'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useContext, useEffect, useState } from 'react'
import AddPasswordDialog from './components/AddPasswordDialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
const ImageCompress = () => {
  const [entered, setEntered] = useState(false)
  const [visibleId, setVisibleId] = useState(0)
  const [password, setPassword] = useState('')
  const { show } = useContext(SnackerBarContext)
  const { toast } = useToast()
  const { data: pwdList } = useRequest(window.passwordBoxApi.getList)

  const handleEnter = async () => {
    const checked = await window.passwordBoxApi.enter(password)

    if (checked) {
      setEntered(true)
    } else {
      show('password error')
    }
  }

  useEffect(() => {
    function onEnter(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        if (password.length === 6) {
          console.log(e)

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
      <AddPasswordDialog />
      {pwdList?.map((item) => (
        <div key={item.time} className='rounded-[20px] p-[20px] border-[2px] cursor-pointer border-textColor border-solid bg-black hover:border-solid hover:border-primary '>
          <div className='font-bold text-[24px] items-center flex justify-between text-primary'>
            <span>{item.name}</span>
            <VisibilityIcon
              onClick={async () => {
                const pwd = await window.passwordBoxApi.decrypt(item.time)
              }}
              className='text-white hover:text-primary cursor-pointer'
            />
            1{!visibleId && <VisibilityOffIcon className='text-white hover:text-primary cursor-pointer' />}
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
