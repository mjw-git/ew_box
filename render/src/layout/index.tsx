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
        <nav className={classNames(styles.menu_container, 'bg-grey-2')}>
          <div className='flex flex-col justify-center gap-1'>
            <img width={48} src={logo} alt='pluto' />
          </div>
          <div className='flex flex-col justify-center gap-4 mt-3 relative'>
            {routes
              .filter((i) => !i.hideInMenu)
              .map((route) => (
                <div
                  onClick={() => {
                    navigate(route.path)
                  }}
                  key={route.path}
                  className={classNames('flex flex-col gap-1 p-1 rounded-md justify-center items-center w-[50px]', { 'bg-grey-3 text-primary': pathname === route.path }, styles.menu_icon, 'hover:bg-grey-3', 'cursor-pointer')}>
                  <SvgIcon key={route.path} className={classNames('text-grey-1', { 'bg-grey-3 text-primary': pathname === route.path }, 'hover:bg-grey-3')} width={15} height={15} name={route.icon} />
                  <span className={classNames('text-[10px] text-grey-1', { 'text-primary': pathname === route.path })}>{route.name}</span>
                </div>
              ))}
          </div>
          <div
            onClick={() => {
              navigate('/setting')
            }}
            className={classNames('flex flex-col gap-1 p-1 rounded-md justify-center items-center w-[50px]', { 'bg-grey-3 text-primary': pathname === '/setting' }, styles.menu_icon, 'hover:bg-grey-3', 'cursor-pointer', 'absolute', 'bottom-5')}>
            <SvgIcon className={classNames('text-grey-1', { 'bg-grey-3 text-primary': pathname === '/setting' }, 'hover:bg-grey-3')} width={15} height={15} name='setting' />
            <span className={classNames('text-[10px] text-grey-1', { 'text-primary': pathname === '/setting' })}>设置</span>
          </div>
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
