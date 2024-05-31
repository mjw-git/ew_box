import { styled, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styles from './index.module.less'
import { useState } from 'react'
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
const StickyButton = styled(Button)({
  width: '100%',
  marginTop: 20,
  position: 'sticky',
  bottom: 0,
})
const ImageShape = () => {
  const [imgList, setImgList] = useState<File[]>([])
  console.log(imgList)
  return (
    <div className={styles.container}>
      <div className={styles.file_upload_box}>
        <CloudUploadIcon sx={{ fontSize: 62 }} fontSize='large' />
        <div className={styles.upload_text}>Upload Image</div>
        <VisuallyHiddenInput
          multiple
          onChange={(e) => {
            if (e.target.files!.length > 0) {
              setImgList(Array.from(e.target.files!))
            }
          }}
          accept='image/*'
          type='file'
        />
      </div>

      {Array.isArray(imgList) && (
        <>
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
                  <img
                    onLoad={(e) => {
                      console.log((e.target as HTMLImageElement).naturalWidth)
                    }}
                    loading='lazy'
                    className={styles.img_item}
                    src={'atom:///' + item.path}
                    alt=''
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
      <StickyButton
        onClick={() => {
          window.sharpApi.compress(imgList.map((i) => i.path))
        }}
        variant='contained'>
        Compress
      </StickyButton>
    </div>
  )
}

export default ImageShape
