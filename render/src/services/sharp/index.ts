import request from '../request'

export const getTaskList = () => request<Sharp.Task[]>('sharp/task')
