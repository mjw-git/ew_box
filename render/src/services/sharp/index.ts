import request from '../request'

export const getTaskList = () => request<Sharp.Task[]>('/sharp/task')

export const clearCompressTask = () =>
  request<Sharp.Task[]>('/sharp/task', {
    method: 'DELETE',
  })
