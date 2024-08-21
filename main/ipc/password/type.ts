export const ENTER_TYPE = 'ENTER_PASSWORD_BOX_TYPE'
export const CREATE_TYPE = 'CREATE_PASSWORD'
export const GET_PWD_LIST_TYPE = 'GET_PWD_LIST'
export const DELETE_PWD_TYPE = 'DELETE_PWD'
export const DECRYPT_PWD_TYPE = 'DECRYPT_PWD'
export interface EnterPasswordBoxType {
  username: string
  password: string
  remark: string
}
