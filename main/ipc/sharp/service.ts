import { app } from 'electron'
import electronIsDev from 'electron-is-dev'
import { save } from 'main/local'
import { compressImg, formatTaskName } from 'main/utils'
import { v4 as uuid } from 'uuid'
import { join } from 'path'
import { COMPRESS_STATUS } from './type'

function compressImageList(imgList: string[]) {
  const url = app.getAppPath()
  const _uuid = uuid()
  const task_name = formatTaskName()
  save('task', { name: task_name, task_id: _uuid, create_tm: new Date().getTime() }, { type: 'readwrite' })
  for (const img of imgList) {
    const img_uuid = uuid()
    save('task_img_item', { id: img_uuid, task_id: _uuid, path: img, status: COMPRESS_STATUS.PROCESSING })
    compressImg({ path: img, output: electronIsDev ? join(__dirname, '../testImg') : url }).then(() => {})
  }
}
export default compressImageList
