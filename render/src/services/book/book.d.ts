declare namespace Book {
  interface AddBookReq {
    desc: string
    tag: string
    price: number
    unix: number
    type: number
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
