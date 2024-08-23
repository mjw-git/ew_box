import App from './src/app'
import 'virtual:svg-icons-register'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('App')
const root = createRoot(container!)

root.render(<App />)
