import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.less'
import logo from '../assets/images/pluto.png'
import { Stack, Divider } from '@mui/material'
const Layout = () => {
  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.menu_container}>
          <Stack spacing={1} direction='row' alignItems='center'>
            <img width={50} src={logo} alt='pluto' />

            <div className={styles.title}>
              <b>P</b>luto
            </div>
          </Stack>
          <Divider sx={{ width: '85%', borderColor: '#ffffff56', marginTop: 1 }} variant='middle' component='div'></Divider>
          <div className={styles.menu_item}>
            <Link to='/shape'>
              <div>Image Sharp</div>
            </Link>
          </div>
        </nav>
        <main className={styles.main_container}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
