import PlutoIndexDb from '../indexdb'

const useInitLocalApi = () => {
  new PlutoIndexDb('pluto')
  window.localApi.onSave((e, value: Local.LocalSaveParams<{ name: string; value: any }>) => {
    console.log(value)
    const request = PlutoIndexDb.db
      .transaction([value.name], value.options?.type || 'readwrite')
      .objectStore(value.name)
      .add(value.value)
    request.onerror = (error) => {
      console.log(error)
    }
  })
}
export default useInitLocalApi
