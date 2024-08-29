import request from '../request'

export const addTodoItem = (body: any) => {
  return request('/todo', {
    method: 'POST',
    body: body,
  })
}

export const getToDoList = (body?: Record<string, any>) =>
  request<{ today: Todo.TodoItem[]; yesterday: Todo.TodoItem[]; earlier: Todo.TodoItem[]; list?: Todo.TodoItem[] }>('/todo/list', {
    method: 'GET',
    body,
  })

export const finishToDo = (body?: Record<string, any>) =>
  request('/todo/finished', {
    method: 'PUT',
    body,
  })

export const deleteToDo = (body?: Record<string, any>) =>
  request('/todo', {
    method: 'DELETE',
    body,
  })
