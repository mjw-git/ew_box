declare namespace Book {
  interface AddBookReq {
    desc: string
    tag: string
    price: number
    unix: number
    type: number
  }
  interface BookMonthYearRes {
    unix?: number
    books: Book[]
    month?: number
    income: number
    payment: number
  }
  interface BookItem {
    id: string
    desc: string
    tag: string
    price: number
    unix: number
    type: number
  }
}
