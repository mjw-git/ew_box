import * as React from 'react'

import { cn } from '@/lib/utils'
import SvgIcon from '../SvgIcon'

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
  const [innerType, setInnerType] = React.useState(type)
  return (
    <div className='relative'>
      <input type={innerType} className={cn('flex h-10 w-full rounded-md border border-slate-200 bg-white pl-3 pr-6 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none  focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300', className)} ref={ref} {...props} />
      {type === 'password' && (
        <SvgIcon
          onClick={() => {
            setInnerType(innerType === 'password' ? 'text' : 'password')
          }}
          className='absolute right-2 bottom-3'
          name={innerType === 'password' ? 'hide_eye' : 'visible_eye'}
          width={14}
          height={14}
        />
      )}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
