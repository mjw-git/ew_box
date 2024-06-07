import createSharpService from './sharp'
import createSystemService from './system'

export default function registerService() {
  createSharpService()
  createSystemService()
}
