declare namespace Schema {
  interface CompressTask {
    path: string
    task_id: string
    task_name: string
    create_tm: number
  }
  interface CompressTaskItem {
    size: number
    compressed_size: number
    task_id: string
    id: string
    create_time: number
    status: string
    path: string
  }
}
