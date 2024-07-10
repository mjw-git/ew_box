import PlutoButton from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'
import SnackerBarContext from '@/context/snackerBarContext'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useContext, useEffect, useState } from 'react'
const ImageCompress = () => {
  const [entered, setEntered] = useState(false)
  const [visibleId, setVisibleId] = useState(0)
  const [password, setPassword] = useState('')
  const { show } = useContext(SnackerBarContext)
  const handleEnter = async () => {
    const checked = await window.passwordBoxApi.enter('12345')
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
    <div className='grid grid-cols-2 gap-1'>
      <div
        onClick={async () => {
          const ans = await window.passwordBoxApi.enter('12345')
        }}
        className='rounded-[20px] p-[20px] border-[2px] flex items-center justify-center cursor-pointer border-primary border-solid bg-black text-primary font-bold text-4xl text-center'>
        Add
      </div>
      <div className='rounded-[20px] p-[20px] border-[2px] cursor-pointer border-black border-solid bg-black hover:border-solid hover:border-primary '>
        <div className='font-bold text-[24px] items-center flex justify-between text-primary'>
          <span>11231</span>

          <VisibilityIcon className='text-white hover:text-primary cursor-pointer' />
          {!visibleId && <VisibilityOffIcon className='text-white hover:text-primary cursor-pointer' />}
        </div>
        <div className='text-[14px] font-bold text-primary'>
          create time: <span className='text-white font-thin'>2024-10-20 10:22:24</span>
        </div>
        <div className='text-[14px]  text-primary'>mark: xxxxxx</div>
      </div>
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
