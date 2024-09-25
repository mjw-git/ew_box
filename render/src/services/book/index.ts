import request from '../request'

export const getBookList = (body?: Record<string, any>) =>
  request<{ list?: Book.BookItem[] }>('/book/list', {
    method: 'GET',
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
