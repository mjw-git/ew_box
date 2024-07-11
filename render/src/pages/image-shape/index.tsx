import { styled, MenuItem, Stack, Slider } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styles from './index.module.less'
import PlutoSelect from '@/components/Select'
import PlutoButton from '@/components/Button'

import Task, { TaskRefType } from './components/task'
import ImagePreview from '@/components/ImagePreview'
import { PIC_PATH_PREFIX } from '@/utils'
import SnackerBarContext from '@/context/snackerBarContext'

const VisuallyHiddenInput = styled('input')({
  opacity: 0,
  fontSize: 0,
  height: '100%',
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  zIndex: 0,
  position: 'absolute',
  cursor: 'pointer !important',
  whiteSpace: 'nowrap',
  width: '100%',
})

const QualitySlider = styled(Slider)({
  '& .Mui-active': {
    boxShadow: '0 0 0 14px rgb(52 199 89 / 16%)',
  },
})
const ImageShape = () => {
  const [imgList, setImgList] = useState<File[]>([])
  const [type, setType] = useState('self')
  const [open, setOpen] = useState(false)
  const [quality, setQuality] = useState(80)
  const [previewIdx, setPreviewIdx] = useState(0)
  const taskRef = useRef<TaskRefType>(null)
  const { show } = useContext(SnackerBarContext)
  const handleCompress = async () => {
    if (imgList.length === 0) return
    show('start compress')
    await window.sharpApi.compress(
      imgList.map((i) => i.path),
      { type: type, quality: quality },
    )
    taskRef.current?.getList?.()
    setImgList([])
  }

  return (
    <>
      <div className={styles.container}>
        <div className='w-[50%]'>
          <div className={styles.upload_container}>
            <h3 className='text-4xl  text-primary font-bold mb-[30px]'>Compress Img</h3>
            <PlutoButton onClick={handleCompress} className='text-primary  float-right mr-[40px]   w-[100px] h-[100px] flex items-center justify-center border-solid border-[3px] text-2xl rounded-[100px] border-primary font-extrabold hover:bg-primary hover:bg-opacity-20 cursor-pointer hover:text-[#bcf6a3]'>
              Start
            </PlutoButton>
            <div className='w-[140px] gap-[20px]  px-[12px] py-[4px] cursor-pointer flex items-center  relative  border-solid rounded-[12px] border-primary border-[2px]'>
              <span className='cursor-pointer'>
                <CloudUploadIcon className='text-primary text-4xl cursor-pointer' fontSize='medium' />
              </span>
              <div className='text-primary  font-semibold'>Upload</div>
              <VisuallyHiddenInput
                title=''
                className='cursor-pointer'
                multiple
                onChange={(e) => {
                  if (e.target.files!.length > 0) {
                    setImgList(Array.from(e.target.files!))
                  }
                  e.target.value = ''
                }}
                accept='image/png,image/jpg,image/webp'
                type='file'
              />
            </div>
            <div className='text-primary w-full text-2xl  font-thin mt-[24px] mb-[8px]'>Compress Setting</div>

            <Stack gap={1} alignItems='center' flexDirection='row'>
              <span className='text-primary inline-block w-[120px]'>Compress Type</span>
              <PlutoSelect
                value={type}
                onChange={(e) => {
                  setType(e.target.value as string)
                }}
                placeholder='select'>
                <MenuItem value='webp'>webp</MenuItem>
                <MenuItem value='jpeg'>jpg(jpeg)</MenuItem>
                <MenuItem value='png'>png</MenuItem>
                <MenuItem value='self'>self type</MenuItem>
              </PlutoSelect>
            </Stack>
            <Stack className='mt-3' flexDirection={'row'} gap={1}>
              <span className='text-primary inline-block w-[150px]'>Quality ({quality})</span>
              <QualitySlider
                min={30}
                step={1}
                sx={{ color: 'rgb(52,199,89)' }}
                className='text-primary'
                size='small'
                value={quality}
                onChange={(_, v) => {
                  setQuality(v as number)
                }}
                aria-label='Small'
                valueLabelDisplay='auto'
              />
            </Stack>
          </div>
          <div className='mt-[20px] border-solid border-primary max-h-[600px] overflow-auto bg-black rounded-[12px] border-[1px] p-[8px]'>
            <div className='text-primary font-bold'> Compress Task</div>
            <Task ref={taskRef} />
            <ImagePreview
              open={open}
              onClose={() => {
                setOpen(false)
              }}
              currentIdx={previewIdx}
              imgList={imgList.map((i) => `${PIC_PATH_PREFIX}${i.path}`)}
            />
          </div>
        </div>

        <div className={styles.preview_container}>
          <div className='text-primary text-2xl'>Preview</div>
          <div className={styles.img_list}>
            {imgList.map((item, index) => {
              return (
                <div key={item.path} className={styles.img_box}>
                  <div className={styles.operator_mask}>
                    <span
                      onClick={() => {
                        setOpen(true)
                        setPreviewIdx(index)
                      }}
                      className={styles.preview}>
                      preview
                    </span>
                    <span
                      onClick={() => {
                        const temp = [...imgList]
                        temp.splice(index, 1)
                        setImgList(temp)
                      }}
                      className={styles.preview}>
                      delete
                    </span>
                  </div>
                  <img loading='lazy' className={styles.img_item} src={'atom:///' + item.path} alt='' />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageShape
