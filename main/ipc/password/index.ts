import Channel from '../../interface/channel'
import { ENTER_TYPE } from './type'
import { createSecretKey } from './service'

function createPasswordBoxChannel() {
  const passwordBoxChannel = new Channel(ENTER_TYPE)
  passwordBoxChannel.createTwoWayChannel(async (e, key) => {
    return await createSecretKey(key)
  })
}
function createPasswordBoxService() {
  createPasswordBoxChannel()
}
export default createPasswordBoxService
