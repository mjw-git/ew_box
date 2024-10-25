import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from './layout'
import { routes } from './config/route'

export default function App() {
  const routerViews = (routerItems) => {
    if (routerItems && routerItems.length) {
      return routerItems.map(({ path, component, children, redirect }) => {
        return children && children.length ? (
          <Route path={path} key={path} element={component}>
            {routerViews(children)}
            {redirect ? <Route path={path} element={<Navigate to={redirect} />}></Route> : <Route path={path} element={<Navigate to={children[0].path} />}></Route>}
          </Route>
        ) : (
          <Route key={path} path={path} element={component}></Route>
        )
      })
    }
  }

  return (
    <HashRouter>
      <Routes>
        <Route index element={<Navigate to='/book/account' />} />
        <Route path='/' element={<Layout />}>
          {routerViews(routes)}
        </Route>
      </Routes>
    </HashRouter>
  )
}
