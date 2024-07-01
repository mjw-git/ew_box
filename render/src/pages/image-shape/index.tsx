import { Tabs, Tab, styled, Typography } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task'
import CompressIcon from '@mui/icons-material/Compress'
import { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TabPanel from '../../components/TabPanel'
import Compress from './components/compress'
import Task from './components/task'
import styles from './index.module.less'
const VisuallyHiddenInput = styled('input')({
  opacity: 0,
  height: '100%',
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  zIndex: 999,
  position: 'absolute',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  width: '100%',
})
const ImageShape = () => {
  const [imgList, setImgList] = useState<File[]>([])
  const [value, setValue] = useState(0)
  return (
    <div className={styles.container}>
      <div className={styles.upload_container}>
        <h3 className='text-4xl text-primary font-bold mb-[20px]'>Compress Img</h3>
        <div className='w-[140px] gap-[20px]  px-[12px] py-[4px] cursor-pointer flex items-center  relative  border-solid rounded-[12px] border-primary border-[1px]'>
          <CloudUploadIcon className='text-primary text-4xl cursor-pointer' fontSize='medium' />
          <div className='text-primary  font-semibold'>Upload</div>
          <VisuallyHiddenInput
            className='cursor-pointer'
            multiple
            onChange={(e) => {
              if (e.target.files!.length > 0) {
                setImgList(Array.from(e.target.files!))
              }
            }}
            accept='image/png,image/jpg,image/webp'
            type='file'
          />
        </div>
      </div>

      <div className={styles.upload_container}></div>
    </div>
  )
}

export default ImageShape
