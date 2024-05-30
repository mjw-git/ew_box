import { Button, styled } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const ImageCompress = () => {
  return (
    <div>
      11
      <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type='file' />
      </Button>
    </div>
  )
}

export default ImageCompress
