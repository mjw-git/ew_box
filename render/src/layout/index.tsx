import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import logo from '../assets/images/pluto.png'
import SvgIcon from '@/components/SvgIcon'
import './index.less'
import { routes } from '@/config/route'
import classNames from 'classnames'
import '../styles/global.css'
import { Toaster } from '@/components/ui/toaster'

const Layout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className='font-mono'>
      <div className={styles.container}>
        <nav className={styles.menu_container}>
          <div className='flex flex-col justify-center gap-1'>
            <img width={48} src={logo} alt='pluto' />
          </div>
          <div className='flex flex-col justify-center gap-4 mt-3 relative'>
            {routes
              .filter((i) => !i.hideInMenu)
              .map((route) => (
                <SvgIcon
                  onClick={() => {
                    navigate(route.path)
                  }}
                  key={route.path}
                  className={classNames(styles.menu_icon, { 'bg-muted': pathname === route.path }, 'text-foreground', 'hover:bg-muted')}
                  width={28}
                  height={30}
                  name={route.icon}
                />
              ))}
          </div>
          <SvgIcon
            onClick={() => {
              navigate('/setting')
            }}
            name='setting'
            width={28}
            height={30}
            className={classNames(styles.menu_icon, { 'bg-muted': pathname === '/setting' }, 'text-foreground', 'hover:bg-muted', 'absolute', 'bottom-5')}
          />
        </nav>
        <main className={styles.main_container}>
          <Toaster />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
