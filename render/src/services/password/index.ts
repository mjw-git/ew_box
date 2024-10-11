import request from '../request'

export const clearPassword = () =>
  request('/password', {
    method: 'DELETE',
  })
export const starPassword = (body: { id: number }) => request('/password/star', { method: 'PUT', body: body })
