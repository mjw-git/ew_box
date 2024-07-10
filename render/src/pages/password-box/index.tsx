import PasswordInput from '@/components/PasswordInput'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
const ImageCompress = () => {
  const [visibleId, setVisibleId] = useState(0)
  return (
    <div className='grid grid-cols-2 gap-1'>
      <PasswordInput />
      <div
        onClick={async () => {
          const ans = await window.passwordBoxApi.enter('12345')
          console.log(ans)
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
  )
}

export default ImageCompress
