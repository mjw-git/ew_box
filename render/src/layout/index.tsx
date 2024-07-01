import { Link, Outlet } from 'react-router-dom'
import styles from './index.module.less'
import logo from '../assets/images/pluto.png'
import { Stack, Divider, Snackbar } from '@mui/material'
import useInitLocalApi from '../hook/useInitLocalApi'
import SnackerBarContext from '../context/snackerBarContext'
import { useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import './index.less'

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
        <Stack component='nav' gap={4} className={styles.menu_container}>
          <Stack spacing={1} direction='column' justifyContent='center'>
            <img width={48} src={logo} alt='pluto' />
          </Stack>
          <Stack spacing={1} gap={1} direction='column' justifyContent='center'>
            <SvgIcon className={styles.menu_icon} width={28} height={30} name='pic' />
            <SvgIcon className={styles.menu_icon} width={28} height={30} name='password_box' />
          </Stack>
        </Stack>
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
