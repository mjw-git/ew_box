import App from './src/app'
import 'virtual:svg-icons-register'
import PlutoIndexDb from '@/indexdb'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('App')
const root = createRoot(container!)

new PlutoIndexDb('pluto', () => {
  root.render(<App />)
  // ReactDOM.render(<App />, document.getElementById('App'))
})
