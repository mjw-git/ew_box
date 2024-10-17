import request from '../request'

export const exportData = () => {
  return request('/system/export', {
    method: 'GET',
  })
}

export const importData = (body: { filename: string }) => {
  return request('/system/import', {
    method: 'POST',
    body,
  })
}
