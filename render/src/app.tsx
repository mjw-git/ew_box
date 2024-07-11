import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout'
import { routes } from './config/route'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/shape' />} />
          {routes.map((item) => (
            <Route key={item.path} path={item.path} element={item.component}></Route>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
