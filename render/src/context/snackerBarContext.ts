import { createContext } from 'react'

const SnackerBarContext = createContext<{ show: (msg: string) => void }>({ show: () => {} })
export default SnackerBarContext
