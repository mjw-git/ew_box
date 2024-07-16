import { Tooltip, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
const OverflowText = (props) => {
  const { children } = props
  const textRef = useRef<HTMLSpanElement | null>(null)
  const [isOverflowed, setIsOverflowed] = useState(false)

  useEffect(() => {
    const { current } = textRef
    if (current) {
      setIsOverflowed(current.scrollWidth > current.clientWidth)
    }
  }, [children])

  return (
    <Tooltip classes={{ tooltip: styles.tooltip_width }} title={isOverflowed ? children : ''} placement='top'>
      <Typography className={styles.text_overflow} ref={textRef}>
        {children}
      </Typography>
    </Tooltip>
  )
}

export default OverflowText
