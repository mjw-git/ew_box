import ReactDOM from 'react-dom'
import App from './src/app'
import 'virtual:svg-icons-register'
import PlutoIndexDb from '@/indexdb'
new PlutoIndexDb('pluto', () => {
  ReactDOM.render(<App />, document.getElementById('App'))
})
