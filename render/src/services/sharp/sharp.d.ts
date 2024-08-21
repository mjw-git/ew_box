declare namespace Sharp {
  interface Task {
    id: number
    path: string
    create_tm: number
    items: [
      {
        status: string
        img_name: string
        task_id: number
        size: number
        id: number
        compressed_size: number
      },
    ]
  }
}
