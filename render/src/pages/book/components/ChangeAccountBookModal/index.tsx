import Modal, { ModalProps } from '@/components/Modal'
import SvgIcon from '@/components/SvgIcon'
import { useToast } from '@/components/ui/use-toast'
import { addBookAccount, editBookAccount, getBookAccountList } from '@/services/book'
import { iconBgColors } from '@/utils'
import { useRequest } from 'ahooks'
import { useContext, useState } from 'react'
import BookContext from '../../bookContext'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const ChangeAccountBookModal = (props: ModalProps) => {
  const { onConfirm } = props
  const [step, setStep] = useState('default')
  const [name, setName] = useState('')
  const [editId, setEditId] = useState<number>()
  const [currentColor, setCurrentColor] = useState(iconBgColors[0].value)
  const { accountBook, setAccountBook } = useContext(BookContext)
  const { toast } = useToast()
  const { run: runGetAccountBook, data: accountList } = useRequest(getBookAccountList, {
    onSuccess: (res) => {
      if (res.list.length === 0) {
        setAccountBook(null)
        setStep('add')
      } else {
        if (!accountBook) {
          setAccountBook(res.list[0])
        }
      }
    },
  })
  const { run: runEditAccountBook } = useRequest(editBookAccount, {
    manual: true,
    onSuccess: () => {
      toast({
        title: '编辑成功',
      })
      runGetAccountBook()
      setStep('default')
    },
  })

  const { run } = useRequest(addBookAccount, {
    manual: true,
    onSuccess: () => {
      toast({
        title: '添加成功',
      })
      runGetAccountBook()
      setName('')
      setCurrentColor(iconBgColors[0].value)
      setStep('default')
      onConfirm?.()
    },
  })

  return (
    <Modal
      {...props}
      title={step === 'add' ? '添加账本' : step === 'edit' ? '编辑账本' : '选择账本'}
      renderCancel={
        step === 'add' ? (
          <button
            onClick={() => {
              setStep('default')
            }}
            className='border-none outline-none text-blue'>
            <SvgIcon width={18} height={18} name='left' />
          </button>
        ) : null
      }
      renderOk={
        step === 'default' ? (
          <button
            className='border-none outline-none text-blue'
            onClick={() => {
              setStep('add')
            }}>
            添加
          </button>
        ) : (
          <button
            className='outline-none border-none text-blue'
            onClick={() => {
              if (step === 'add') {
                run({
                  color: currentColor,
                  name: name,
                })
              } else {
                runEditAccountBook({
                  id: editId,
                  color: currentColor,
                  name: name,
                })
              }
            }}>
            确认
          </button>
        )
      }
      contentClassName='bg-container-bg min-h-[300px]'>
      {step === 'default' && (
        <div className='grid grid-cols-2 gap-2'>
          {accountList?.list.map((item) => (
            <div onClick={() => setAccountBook?.(item)} key={item.id} className=' w-full cursor-pointer  '>
              <div className='bg-container-bg-2 p-2 relative justify-between rounded-lg h-16 flex items-center gap-2'>
                <div className='flex justify-center flex-col gap-2'>
                  <div className='flex justify-between w-full'>
                    <div className='w-6 h-6  rounded-full  bg-icon-bg-yellow flex items-center justify-center' style={{ backgroundColor: item.color }}>
                      <SvgIcon name='book_account' style={{ color: '#fff' }} width={14} height={14} />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className='w-4 h-4 absolute right-2 top-2'>
                        <div className='w-4 h-4 absolute right-2 top-2 border border-primary rounded-full flex items-center justify-center mb-1'>
                          <SvgIcon name='more' width={12} className='text-primary' height={12} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='bg-container-bg-3'>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            setStep('edit')
                            setEditId(item.id)
                            setName(item.name)
                            setCurrentColor(item.color)
                          }}
                          className='text-[12px]'>
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-[12px]'>删除</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className='text-[12px] w-full flex justify-between font-bold'>
                    <span>{item.name}</span>
                  </div>
                </div>

                {accountBook?.id === item.id && <span className='text-blue absolute bottom-1 right-[16px]'>&#10003;</span>}
              </div>
            </div>
          ))}
        </div>
      )}
      {(step === 'add' || step === 'edit') && (
        <>
          <div className='bg-container-bg-2 p-2 rounded-md flex gap-3 items-center'>
            <div className='w-6 h-6 rounded-full text-white flex items-center justify-center' style={{ backgroundColor: currentColor }}>
              <SvgIcon width={16} height={16} name='book_account' />
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='请输入账本名称' className='h-8 w-3/5 px-2 rounded-md bg-container-bg border-none outline-none' />
          </div>
          <div className='flex gap-3 bg-container-bg-2 p-2 rounded-md mt-3'>
            {iconBgColors.map((item) => (
              <div key={item.value} className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer`} style={{ backgroundColor: item.value }} onClick={() => setCurrentColor(item.value)}>
                {currentColor === item.value && <div className='w-7 h-7 rounded-full cursor-pointer border-2 border-white'></div>}
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  )
}

export default ChangeAccountBookModal
