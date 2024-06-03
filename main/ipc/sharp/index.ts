import Channel from '../../interface/channel'
import { COMPRESS_TYPE } from './type'
import compressImageList from './service'

function createSharpCompressChannel() {
  const sharpChannel = new Channel(COMPRESS_TYPE)
  sharpChannel.createTwoWayChannel((e, list) => {
    if (list.length === 0) return
    compressImageList(list)
  })
}
function createSharpService() {
  createSharpCompressChannel()
}
export default createSharpService
