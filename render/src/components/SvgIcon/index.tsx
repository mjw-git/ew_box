import styles from './index.module.less'
import { HTMLAttributes } from 'react'
import classnames from 'classnames'
interface SvgIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string
  size?: number
  width?: number
  height?: number
  color?: string
}
const SvgIcon = (props: SvgIconProps) => {
  const { name, prefix = 'icon', className, width = 30, height, style, ...rest } = props
  const symbolId = `#${prefix}-${name}`
  const cls = classnames(styles.icon_wrapper, className)
  return (
    <span className={cls} {...rest} style={{ ...style }}>
      <svg aria-hidden='true' style={{ height, width }}>
        <use href={symbolId} />
      </svg>
    </span>
  )
}

export default SvgIcon
