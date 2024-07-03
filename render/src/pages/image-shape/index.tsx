import { styled, Select, MenuItem, Stack, Slider } from '@mui/material'
import { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styles from './index.module.less'
import PlutoSelect from '@/components/Select'
import PlutoButton from '@/components/Button'

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

const QualitySlider = styled(Slider)({
  '& .Mui-active': {
    boxShadow: '0 0 0 14px rgb(52 199 89 / 16%)',
  },
})
const ImageShape = () => {
  const [imgList, setImgList] = useState<File[]>([])
  const [value, setValue] = useState('self')
  const [quality, setQuality] = useState(80)
  const handleCompress = async () => {
    await window.sharpApi.compress(imgList.map((i) => i.path))
    setImgList([])
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.upload_container}>
          <h3 className='text-4xl  text-primary font-bold mb-[30px]'>Compress Img</h3>
          <PlutoButton onClick={handleCompress} className='text-primary  float-right mr-[40px]  w-[100px] h-[100px] flex items-center justify-center border-solid border-[3px] text-2xl rounded-[100px] border-primary font-extrabold hover:bg-primary hover:bg-opacity-20 cursor-pointer hover:text-[#bcf6a3]'>
            Start
          </PlutoButton>
          <div className='w-[140px] gap-[20px]  px-[12px] py-[4px] cursor-pointer flex items-center  relative  border-solid rounded-[12px] border-primary border-[2px]'>
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
          <div className='text-primary w-full text-2xl   font-thin mt-[24px] mb-[8px]'>Compress Setting</div>

          <Stack gap={1} alignItems='center' flexDirection='row'>
            <span className='text-primary inline-block w-[120px]'>Compress Type</span>
            <PlutoSelect
              value={value}
              onChange={(e) => {
                setValue(e.target.value as string)
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

        <div className={styles.preview_container}>
          <div className={styles.img_list}>
            {imgList.map((item, index) => {
              return (
                <div key={item.path} className={styles.img_box}>
                  <div className={styles.operator_mask}>
                    <span className={styles.preview}>预览</span>
                    <span
                      onClick={() => {
                        const temp = [...imgList]
                        temp.splice(index, 1)
                        setImgList(temp)
                      }}
                      className={styles.preview}>
                      删除
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
