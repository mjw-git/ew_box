import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface BaseElliTipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}
const BaseElliTip = (props: BaseElliTipProps) => {
  const { text, className, ...rest } = props
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLDivElement>()
  const displayNoneRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const displayNoneWidth = displayNoneRef.current.getBoundingClientRect().width
    const totalWidth = containerRef.current.getBoundingClientRect().width
    console.log(displayNoneWidth, totalWidth)
    if (displayNoneWidth > totalWidth) {
      console.log(displayNoneWidth, totalWidth)

      setShowTooltip(true)
    }
  }, [text])
  const mergeCls = classNames('w-full text-ellipsis line-clamp-1 break-all', className)
  return (
    <div className='w-full relative'>
      {showTooltip ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className='w-full'>
              <div ref={containerRef} className={mergeCls} {...rest}>
                {text}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div ref={containerRef} className={mergeCls} {...rest}>
          {text}
        </div>
      )}

      <div ref={displayNoneRef} className={classNames('w-fit', 'absolute top-0 z-[-1] opacity-0')}>
        {text}
      </div>
    </div>
  )
}
export default BaseElliTip
