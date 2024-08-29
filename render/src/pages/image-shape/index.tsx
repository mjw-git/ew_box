import { useRef, useState } from 'react'
import styles from './index.module.less'

import Task, { TaskRefType } from './components/task'
import ImagePreview from '@/components/ImagePreview'
import { PIC_PATH_PREFIX } from '@/utils'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/components/ui/use-toast'
import SvgIcon from '@/components/SvgIcon'

const ImageShape = () => {
  const [imgList, setImgList] = useState<File[]>([])
  const [type, setType] = useState('self')
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [quality, setQuality] = useState(80)
  const [previewIdx, setPreviewIdx] = useState(0)
  const taskRef = useRef<TaskRefType>(null)
  const handleCompress = async () => {
    if (imgList.length === 0) return
    toast({
      description: 'starting',
    })
    await window.sharpApi.compress(
      imgList.map((i) => i.path),
      { type: type, quality: quality },
    )
    taskRef.current?.getList?.()
    setImgList([])
  }

  return (
    <>
      <div className='flex gap-[20px]'>
        <div className='w-[50%]'>
          <div className='shadow-md border-border border-[1px] rounded-xl p-5'>
            <Button className='float-right' size='lg' onClick={handleCompress}>
              Start
            </Button>
            <div className='gap-[10px] w-fit  px-[12px] py-[4px] cursor-pointer flex items-center  relative  border-solid rounded-[12px] border-primary border-[1px]'>
              <span className='cursor-pointer'>
                <SvgIcon className='w-[20px] h-[20px]' name='upload' />
              </span>
              <div className='text-primary  font-semibold'>Upload</div>
              <input
                className='opacity-0 text-[0] cursor-pointer whitespace-nowrap w-[100%] h-[100%] overflow-hidden absolute left-0 bottom-0'
                title=''
                multiple
                onChange={(e) => {
                  if (e.target.files!.length > 0) {
                    setImgList(Array.from(e.target.files!))
                  }
                  e.target.value = ''
                }}
                accept='image/png,image/jpg,image/webp'
                type='file'></input>
            </div>

            <div className='flex items-center flex-row mt-2 gap-3'>
              <span className='text-primary text-[16px] inline-block w-[140px]'>Compress Type</span>
              <Select
                value={type}
                onValueChange={(v) => {
                  setType(v)
                }}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value='webp'>webp</SelectItem>
                    <SelectItem value='jpeg'>jpg(jpeg)</SelectItem>
                    <SelectItem value='png'>png</SelectItem>
                    <SelectItem value='self'>Self Type</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-row gap-1 items-center mt-4'>
              <span className='text-primary inline-block w-[150px]'>Quality ({quality})</span>
              <Slider
                onValueChange={(e) => {
                  setQuality(e[0])
                }}
                max={100}
                min={30}
                value={[quality]}
                step={1}
                className='w-[80%]'
              />
            </div>
          </div>
          <div className='shadow-md mt-[20px] border-solid border-border max-h-[600px] overflow-auto rounded-[12px] border-[1px] p-[8px]'>
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

        <div className='shadow-md border-border p-3 border-[1px] rounded-[12px] overflow-auto w-[50%]'>
          <div className='text-primary text-2xl'>Preview</div>
          <div className={styles.img_list}>
            {imgList.map((item, index) => {
              return (
                <div key={item.path} className='w-[100%] relative bg-muted'>
                  <div className='text-foreground cursor-pointer absolute top-0 w-[100%] flex justify-between text-[12px]'>
                    <span
                      onClick={() => {
                        setOpen(true)
                        setPreviewIdx(index)
                      }}
                      className='inline h-[32px]'>
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
