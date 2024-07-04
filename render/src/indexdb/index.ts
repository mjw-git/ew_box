export default class PlutoIndexDb {
  static db: IDBDatabase
  private dbName: string

  initDB(afterInitFn: () => void) {
    const request = indexedDB.open(this.dbName, 4)
    // 创建或更新成功
    request.onupgradeneeded = () => {
      PlutoIndexDb.db = request.result
      PlutoIndexDb.db.createObjectStore('task', { keyPath: 'task_id' })
      afterInitFn()
      const task_img_item = PlutoIndexDb.db.createObjectStore('task_img_item', { keyPath: 'id' })
      task_img_item.createIndex('task_id', 'task_id', { unique: false })
    }
    // 连接成功
    request.onsuccess = () => {
      PlutoIndexDb.db = request.result
      afterInitFn()
    }
    // 连接失败
    request.onerror = (e) => {
      console.log(e)
    }
  }
  constructor(name: string, afterInitFn: () => void) {
    this.dbName = name
    this.initDB(afterInitFn)
  }
}
