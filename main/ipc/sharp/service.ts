import electronIsDev from 'electron-is-dev'
import { compressImg, formatTaskName, getFileSize, isExistFileOrDir } from 'main/utils'
import { v4 as uuid } from 'uuid'
import { join, basename, resolve } from 'path'
import { mkdirSync } from 'fs'
import { COMPRESS_STATUS, CompressOptions } from './type'
import { sharpPath } from '@main/utils/path'
import { prismaInstance } from '@main/utils/init'

async function compressImageList(imgList: string[], options: CompressOptions) {
  const _uuid = uuid()

  const task_name = formatTaskName()
  const outputPath = electronIsDev ? join(__dirname, `../testImg/${task_name}_${_uuid}`) : resolve(sharpPath, `./${task_name}_${_uuid}`)
  const task = await prismaInstance.task.create({
    data: {
      create_tm: Math.floor(new Date().getTime() / 1000),
      path: outputPath,
    },
  })

  for (const img of imgList) {
    const size = await getFileSize(img)
    const task_item = await prismaInstance.taskItem.create({
      data: {
        img_name: basename(img),
        status: COMPRESS_STATUS.PROCESSING,
        size: size,
        task_id: task.id,
      },
    })
    const is_exit = await isExistFileOrDir(outputPath)
    if (!is_exit) {
      mkdirSync(outputPath)
    }

    compressImg({ path: img, output: outputPath, quality: options.quality, ext: options.type === 'self' ? undefined : options.type })
      .then(async (path) => {
        const size = await getFileSize(path)

        prismaInstance.taskItem
          .update({
            data: { compressed_size: size, status: COMPRESS_STATUS.SUCCESS },
            where: { id: task_item.id },
          })
          .then((res) => {
            console.log('success', res)
          })
      })
      .catch(() => {
        prismaInstance.taskItem.update({
          data: { status: COMPRESS_STATUS.FAIL },
          where: { id: task_item.id },
        })
      })
  }
}
export default compressImageList
