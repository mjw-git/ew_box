declare namespace Todo {
  interface TodoItem {
    start_tm: number
    id: number
    todo: string
    create_tm: number
    finished_tm?: number
    status: number
    type: number
  }
}
