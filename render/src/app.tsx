import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout'
import { routes } from './config/route'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/shape' />} />
          {routes.map((item) => (
            <Route key={item.path} path={item.path} element={item.component}></Route>
          ))}
        </Route>
      </Routes>
    </HashRouter>
  )
}
