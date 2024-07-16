import './index.less'
import { WheelEvent, useEffect, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
interface ImagePreviewProps {
  imgList: string[]
  open: boolean
  onClose: () => void
  currentIdx?: number
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { onClose, currentIdx = 0, imgList, open } = props
  if (!open) return null

  const [scaleCount, setScaleCount] = useState(1)
  const [idx, setIdx] = useState(0)

  const currentImg = imgList?.[idx]
  useEffect(() => {
    setIdx(currentIdx)
  }, [currentIdx])

  const handleWheel = (e: WheelEvent) => {
    const delta = Math.sign(e.deltaY)

    let scale = scaleCount
    if (e.ctrlKey) {
      if (delta > 0) {
        scale *= 0.9 // Zoom out
      } else {
        scale *= 1.1 // Zoom in
      }
      setScaleCount(scale)
    }
  }
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])
  return (
    <div
      className='preview-container overflow-auto fixed z-10 top-0 flex justify-center items-center left-0 w-[100vw] h-[100vh] bg-black bg-opacity-55'
      onWheel={handleWheel}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }}>
      {imgList.length > 1 && (
        <>
          <span
            onClick={() => {
              setIdx((idx + 1) % imgList.length)
            }}
            className='absolute cursor-pointer z-[11] hover:text-primary left-10 text-white text-2xl'>
            <ArrowBackIosNewOutlinedIcon fontSize='large' className='text-2xl' />
          </span>
          <span
            onClick={() => {
              setIdx(idx + 1 >= imgList.length ? 0 : idx + 1)
            }}
            className='absolute cursor-pointer z-[11] hover:text-primary right-10 text-white text-2xl'>
            <ArrowForwardIosOutlinedIcon fontSize='large' className='text-2xl' />
          </span>
        </>
      )}
      <div className='flex items-center gap-[12px] absolute bottom-[30px] z-[11]'>
        <span
          onClick={() => {
            setScaleCount(scaleCount - 0.1)
          }}
          className='text-white cursor-pointer hover:text-primary'>
          <RemoveCircleOutlineOutlinedIcon fontSize='medium' />
        </span>
        <span className='text-white text-base'>{`${(scaleCount * 100).toFixed(0)}%`}</span>
        <span
          onClick={() => {
            setScaleCount(scaleCount + 0.1)
          }}
          className='text-white cursor-pointer hover:text-primary'>
          <AddCircleOutlineOutlinedIcon fontSize='medium' />
        </span>
      </div>
      <span className='absolute cursor-pointer z-[11] right-10 top-10 text-white' onClick={onClose}>
        <CancelOutlinedIcon />
      </span>
      <div className='text-white' style={{ transform: `scale(${scaleCount})` }}>
        <img className='w-[50vw]' src={`${currentImg}`} alt='no pic' />
      </div>
    </div>
  )
}
export default ImagePreview
