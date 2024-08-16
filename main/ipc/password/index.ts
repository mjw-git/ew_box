import Channel from '../../interface/channel'
import { CREATE_TYPE, DECRYPT_PWD_TYPE, DELETE_PWD_TYPE, ENTER_TYPE, GET_PWD_LIST_TYPE } from './type'
import { createPwd, createSecretKey, decryptPwd, deletePwd, getPwdList } from './service'

function createPasswordBoxChannel() {
  const passwordBoxChannel = new Channel(ENTER_TYPE)
  passwordBoxChannel.createTwoWayChannel(async (_, key) => {
    return await createSecretKey(key)
  })
}
function createPwdChannel() {
  const createPwdChannel = new Channel(CREATE_TYPE)
  createPwdChannel.createTwoWayChannel(async (_, options) => {
    return createPwd(options)
  })
}
function createGetPwdListChannel() {
  const createGetPwdListChannel = new Channel(GET_PWD_LIST_TYPE)
  createGetPwdListChannel.createTwoWayChannel(async () => {
    return getPwdList()
  })
}
function createDecryptPwdChannel() {
  const createDecryptPwdChannel = new Channel(DECRYPT_PWD_TYPE)
  createDecryptPwdChannel.createTwoWayChannel(async (_, time, key: string) => {
    return await decryptPwd(time, key)
  })
}
function createDelPwdChannel() {
  const createDelPwdChannel = new Channel(DELETE_PWD_TYPE)
  createDelPwdChannel.createTwoWayChannel(async (_, time) => {
    return deletePwd(time)
  })
}
function createPasswordBoxService() {
  createDecryptPwdChannel()
  createDelPwdChannel()
  createPasswordBoxChannel()
  createPwdChannel()
  createGetPwdListChannel()
}

export default createPasswordBoxService
