import { Button, Checkbox, Divider, Stack, Typography, styled } from '@mui/material'
import styles from './index.module.less'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
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
interface CompressProps {
  onTabChange: (index: number) => void
}
const Compress = (props: CompressProps) => {
  const { onTabChange } = props
  const [imgList, setImgList] = useState<File[]>([])
  return (
    <div className={styles.container}>
      <div className={styles.file_upload_box}>
        <CloudUploadIcon sx={{ fontSize: 62, color: '#389e0d' }} fontSize='large' />
        <div className={styles.upload_text}>Upload Image</div>
        <VisuallyHiddenInput
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
      <Stack justifyContent='space-between' marginTop={1} gap={1} direction='row'>
        <Stack className={styles.icon_wrapper} gap={0.5} alignItems='center' direction='row'>
          <Stack alignItems='center' flexDirection='row'>
            <Checkbox />
            <Typography className={styles.text_color} variant='caption'>
              all webp
            </Typography>
          </Stack>
        </Stack>
        <Stack
          onClick={() => {
            setImgList([])
          }}
          className={styles.icon_wrapper}
          gap={0.5}
          alignItems='center'
          direction='row'>
          <DeleteForeverIcon className={styles.icon} />
          <Typography className={styles.text_color} variant='caption'>
            Clear All Images
          </Typography>
        </Stack>
      </Stack>
      <Divider classes={{ root: styles.divider_border }} sx={{ margin: '12px' }} />
      {Array.isArray(imgList) && (
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
      )}
      <StickyButton
        disabled={imgList.length === 0}
        onClick={async () => {
          await window.sharpApi.compress(imgList.map((i) => i.path))
          setImgList([])
          onTabChange(1)
        }}
        variant='contained'>
        Compress
      </StickyButton>
    </div>
  )
}
export default Compress
