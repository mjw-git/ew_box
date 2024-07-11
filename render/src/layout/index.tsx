import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import logo from '../assets/images/pluto.png'
import { Stack, Divider, Snackbar } from '@mui/material'
import useInitLocalApi from '../hook/useInitLocalApi'
import SnackerBarContext from '../context/snackerBarContext'
import { useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import './index.less'
import { routes } from '@/config/route'
import classNames from 'classnames'
import '../styles/global.css'
import { Toaster } from '@/components/ui/toaster'

const Layout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = (msg: string) => {
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
            {routes.map((route) => (
              <SvgIcon
                onClick={() => {
                  navigate(route.path)
                }}
                key={route.path}
                className={classNames(styles.menu_icon, { [styles.menu_item_active]: pathname === route.path })}
                width={28}
                height={30}
                name={route.icon}
              />
            ))}
          </Stack>
        </Stack>
        <main className={styles.main_container}>
          <Toaster />

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
