declare namespace Book {
  interface AddBookReq {
    account_book_id: number
    desc: string
    tag: string
    price: number
    unix: number
    type: number
  }
  interface BookAccountRes {
    color: string
    id: number
    name: string
  }
  interface AddBookAccountReq {
    name: string
    color: string
    create_tm: number
    icon: string | null
    balance: number
  }
  interface BookMonthYearRes {
    unix?: number
    books: Book[]
    month?: number
    income: number
    payment: number
  }
  interface BookItem {
    id: number
    desc: string
    tag: string
    price: number
    unix: number
    type: number
  }
  interface BookAccount {
    id: number
    name: string
    color: string
    create_tm: number
    icon: string | null
    balance: number
  }
}
