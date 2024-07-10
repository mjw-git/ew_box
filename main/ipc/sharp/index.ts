import Channel from '../../interface/channel'
import { COMPRESS_TYPE, CompressOptions } from './type'
import compressImageList from './service'

function createSharpCompressChannel() {
  const sharpChannel = new Channel(COMPRESS_TYPE)
  sharpChannel.createTwoWayChannel((e, list, options: CompressOptions) => {
    if (list.length === 0) return

    compressImageList(list, options)
  })
}
function createSharpService() {
  createSharpCompressChannel()
}
export default createSharpService
