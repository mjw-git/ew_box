import PlutoIndexDb from '.'

export async function getIndexDBData<T>(name: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = PlutoIndexDb.db.transaction([name], 'readonly').objectStore(name).getAll()
    request.onsuccess = () => {
      resolve(request.result as T)
    }
    request.onerror = (err) => {
      reject(err)
    }
  })
}
export async function getIndexDBDataByIndex<T>(name: string, index: string, content: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = PlutoIndexDb.db.transaction([name], 'readonly').objectStore(name).index(index).getAll(content)
    request.onsuccess = () => {
      resolve(request.result as T)
    }
    request.onerror = (err) => {
      reject(err)
    }
  })
}
