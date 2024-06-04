import PlutoIndexDb from '.'

export async function getTableData<T>(name: string): Promise<T> {
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
