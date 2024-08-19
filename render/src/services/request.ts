import { toast } from '@/components/ui/use-toast'
import { stringify } from 'qs'
const PREFIX = 'http://localhost:31117/api/v1/'
const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const method = options.method || 'GET'
  let compileUrl = `${PREFIX}${url}`
  if (method.toLowerCase() === 'get') {
    compileUrl = `${compileUrl}${options.body ? `?${stringify(options.body ?? {})}` : ''}`
    Reflect.deleteProperty(options, 'body')
  }
  if (options.body) {
    options.body = JSON.stringify(options.body)
  }
  return fetch(compileUrl, options)
    .then(async (res) => {
      if (res.status !== 200) {
        toast({
          description: 'system error',
        })
        throw new Error('system error')
      }
      return await res.json()
    })
    .then((res) => {
      if (res.code === 200) {
        return res.data
      } else {
        toast({
          description: res.msg,
        })
        throw new Error(res.msg)
      }
    })
}
export default request
