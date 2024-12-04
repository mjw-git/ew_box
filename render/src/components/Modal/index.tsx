import { DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
export interface ModalProps extends DialogProps {
  renderCancel?: React.ReactNode
  renderOk?: React.ReactNode
  contentClassName?: string
  showCancel?: boolean
  showConfirm?: boolean
  footer?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  title?: string
}
const Modal = (props: ModalProps) => {
  const { footer, children, title, contentClassName, renderCancel, showCancel = true, showConfirm = true, onConfirm, onCancel, renderOk, ...rest } = props
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          onCancel?.()
        }
      }}
      {...rest}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className={contentClassName}>
        <div className='flex justify-between items-center mb-3 text-[10px] h-7 '>
          {showCancel &&
            (renderCancel ? (
              renderCancel
            ) : (
              <span className='text-grey cursor-pointer' onClick={onCancel}>
                取消
              </span>
            ))}
          {title && <div className='text-center  font-bold'>{title}</div>}
          {showConfirm &&
            (renderOk ? (
              renderOk
            ) : (
              <span className='text-blue cursor-pointer' onClick={onConfirm}>
                确定
              </span>
            ))}
        </div>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
