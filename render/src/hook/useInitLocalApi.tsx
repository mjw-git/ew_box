import PlutoIndexDb from '../indexdb'

const useInitLocalApi = () => {
  window.localApi.onSave((e, value: Local.LocalSaveParams<{ name: string; value: any }>) => {
    const request = PlutoIndexDb.db
      .transaction([value.name], value.options?.type || 'readwrite')
      .objectStore(value.name)
      .add(value.value)
    request.onerror = (error) => {
      console.log(error)
    }
  })
  window.localApi.onUpdate((e, value: Local.LocalSaveParams<{ name: string; value: any }>) => {
    console.log(value)
    const request = PlutoIndexDb.db
      .transaction([value.name], value.options?.type || 'readwrite')
      .objectStore(value.name)
      .put(value.value)
    request.onerror = (error) => {
      console.log(error, '==')
    }
  })
}
export default useInitLocalApi
