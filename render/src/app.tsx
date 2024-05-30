import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/global.less'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ImageShape from './pages/image-shape'
import ImageCompress from './pages/image-compress'
import Layout from './layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='shape' />} />
          <Route path='shape' element={<ImageShape />} />
          <Route path='invoices' element={<ImageCompress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
