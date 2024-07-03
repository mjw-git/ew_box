import React from 'react'
import './index.less'
import classNames from 'classnames'
const PlutoButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, onClick, className, ...rest } = props
  function playRipple(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget
    const buttonRect = button.getBoundingClientRect()

    const circle = document.createElement('span')
    // 圆的直径
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    // 圆的半径
    const radius = diameter / 2

    // 计算 ripple 的位置
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - (buttonRect.left + radius)}px`
    circle.style.top = `${event.clientY - (buttonRect.top + radius)}px`
    // 添加 ripple 样式
    circle.classList.add('ripple')
    // 移除已存在的 ripple
    removeRipple(button)
    // 将 ripple 添加到 button 上
    button.appendChild(circle)
  }

  // 移除 ripple
  function removeRipple(button: HTMLButtonElement) {
    const ripple = button.querySelector('.ripple')

    if (ripple) {
      ripple.remove()
    }
  }

  return (
    <button className={classNames('relative', 'transition-all', 'overflow-hidden', className)} onClick={playRipple} {...rest}>
      {children}
    </button>
  )
}
export default PlutoButton
