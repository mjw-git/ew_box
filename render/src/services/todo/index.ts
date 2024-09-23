import request from '../request'

export const addTodoItem = (body: any) => {
  return request('/todo', {
    method: 'POST',
    body: body,
  })
}

export const getEventBookToDoList = (body?: Record<string, any>) =>
  request<{ list?: Todo.TodoItem[] }>('/todo/list/event', {
    method: 'GET',
    body,
  })

export const getCalendarToDoList = (body?: Record<string, any>) =>
  request<{ list?: Todo.TodoItem[] }>('/todo/list/calendar', {
    method: 'GET',
    body,
  })
export const getToDoList = (body?: Record<string, any>) =>
  request<{ today: Todo.TodoItem[]; yesterday: Todo.TodoItem[]; un_todo: Todo.TodoItem[]; earlier: Todo.TodoItem[]; list?: Todo.TodoItem[] }>('/todo/list', {
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
