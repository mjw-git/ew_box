import { DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
interface ModalProps extends DialogProps {
  showCancel?: boolean
  showConfirm?: boolean
  footer?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}
const Modal = (props: ModalProps) => {
  const { footer, children, showCancel = true, showConfirm = true, onConfirm, onCancel, ...rest } = props
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          onCancel?.()
        }
      }}
      {...rest}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='flex justify-between text-[10px]'>
          {showCancel && (
            <span className='text-grey cursor-pointer' onClick={onCancel}>
              取消
            </span>
          )}
          {showConfirm && (
            <span className='text-blue cursor-pointer' onClick={onConfirm}>
              确定
            </span>
          )}
        </div>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
