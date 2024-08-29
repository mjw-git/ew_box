declare namespace Todo {
  interface TodoItem {
    id: number
    todo: string
    create_tm: number
    finished_tm?: number
    status: number
    type: number
  }
}
