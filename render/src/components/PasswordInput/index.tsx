import { useEffect, useRef, useState } from 'react'

interface PasswordInputProps {
  count?: number
}
const PasswordInput = (props: PasswordInputProps) => {
  const { count = 4 } = props

  const [values, setValues] = useState<string[]>(new Array(count).fill(''))
  const focusIndex = useRef(0)
  const inputDomList = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    inputDomList.current[0]?.focus()
  }, [])

  return (
    <div className='flex items-center gap-4'>
      {new Array(count).fill(0).map((_, index) => (
        <input
          ref={(dom) => {
            inputDomList.current[index] = dom!
          }}
          onFocus={() => {
            focusIndex.current = index
          }}
          onKeyDown={(e) => {
            if (e.code === 'Backspace') {
              if (focusIndex.current > 0) {
                const prevInput = inputDomList.current[focusIndex.current - 1]

                if (values[index].length !== 0) {
                  values[index] = ''
                  setValues([...values])
                } else {
                  prevInput.focus()
                }
              }
            }
          }}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const textLen = e.target.value.length
            values[index] = e.target.value.substring((e.target.selectionStart || 1) - 1, e.target.selectionStart || 1)
            setValues([...values])
            const nextInput = inputDomList.current[index + 1]
            if (nextInput && !!textLen) {
              nextInput.focus()
              focusIndex.current = index + 1
            }
          }}
          value={values[index]}
          className='outline-none text-primary pl-[15px] pr-[10px] h-[50px] w-[50px] text-3xl bg-white border-solid border-[1px] rounded-[4px] border-primary'
          key={index}
        />
      ))}
    </div>
  )
}
export default PasswordInput
