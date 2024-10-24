import request from '../request'

export const getBookList = (body?: Record<string, any>) =>
  request<{ list?: Book.BookItem[] }>('/book/list', {
    method: 'GET',
    body,
  })
export const getBookTrend = (body?: Record<string, any>) =>
  request<{ result?: { key: string; value: number }[] }>('/book/trend', {
    method: 'GET',
    body,
  })
export const getBookAverage = (body?: Record<string, any>) =>
  request<{ average: number; g: number; l: number; gFrom: Book.BookItem; lFrom: Book.BookItem; total: number }>('/book/statics', {
    method: 'GET',
    body,
  })
export const deleteBookItem = (body: { id: number }) =>
  request('/book', {
    method: 'DELETE',
    body,
  })
export const getBookMonthYear = (body?: Record<string, any>) =>
  request<{ result?: Record<string, Book.BookMonthYearRes> }>('/book/month-year', {
    method: 'GET',
    body,
  })
export const addBookItem = (body: Book.AddBookReq) =>
  request('/book/add', {
    method: 'POST',
    body,
  })
