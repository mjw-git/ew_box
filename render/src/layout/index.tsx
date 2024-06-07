import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.less'
import logo from '../assets/images/pluto.png'
import { Stack, Divider, Snackbar } from '@mui/material'
import useInitLocalApi from '../hook/useInitLocalApi'
import SnackerBarContext from '../context/snackerBarContext'
import { useState } from 'react'
const Layout = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = (msg: string) => {
    console.log(msg)

    setValue(msg)
    setOpen(true)
  }
  useInitLocalApi()
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
          <Snackbar
            onClose={() => {
              setOpen(false)
            }}
            autoHideDuration={2400}
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            message={value}
          />
          <SnackerBarContext.Provider
            value={{
              show: handleOpen,
            }}>
            <Outlet />
          </SnackerBarContext.Provider>
        </main>
      </div>
    </div>
  )
}
export default Layout
