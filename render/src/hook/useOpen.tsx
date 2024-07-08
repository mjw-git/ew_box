import { useState } from 'react'

export const useOpen = <T,>(): { open: boolean; openModal: (p: T) => void; closeModal: () => void; data: T | undefined } => {
  const [data, setData] = useState<T>()
  const [open, setOpen] = useState(false)
  const openModal = (p: T) => {
    setData(p)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  return { open, openModal, closeModal, data }
}
