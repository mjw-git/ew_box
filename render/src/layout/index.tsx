import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.less'
import logo from '../assets/images/pluto.png'
import { Stack } from '@mui/material'
const Layout = () => {
  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.menu_container}>
          <Stack direction='row' alignItems='center'>
            <img width={80} src={logo} alt='pluto' />
            <h1 className={styles.title}>Pluto</h1>
          </Stack>
          <Link to='expenses'>111</Link>
          <Link to='invoices'>12211</Link>
        </nav>
        <main className={styles.main_container}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
