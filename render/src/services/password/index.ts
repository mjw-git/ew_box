import request from '../request'

export const clearPassword = () =>
  request('password', {
    method: 'DELETE',
  })
