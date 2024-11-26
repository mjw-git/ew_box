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
  const childrenMenu = routes.find((i) => pathname.startsWith(i.path))?.children ?? []
  return (
    <div className='font-mono'>
      <div className={styles.container}>
        <nav className={classNames(styles.menu_container, 'bg-container-bg-2', 'border-grey border-r')}>
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
                  className={classNames('flex flex-col gap-1 p-1 rounded-md justify-center items-center w-[50px]', { 'bg-grey-3 text-primary': pathname.startsWith(route.path) }, styles.menu_icon, 'hover:bg-grey-3', 'cursor-pointer')}>
                  <SvgIcon key={route.path} className={classNames('text-grey-1', { 'bg-grey-3 text-primary': pathname.startsWith(route.path) }, 'hover:bg-grey-3')} width={15} height={15} name={route.icon} />
                  <span className={classNames('text-[10px] text-grey-1', { 'text-primary': pathname.startsWith(route.path) })}>{route.name}</span>
                </div>
              ))}
          </div>
          <div
            onClick={() => {
              const html = document.getElementsByTagName('html')
              html[0].classList.toggle('dark')
            }}
            className={classNames('text-black cursor-pointer', 'absolute', 'bottom-20', 'left-5', styles.menu_icon)}>
            <SvgIcon width={20} className='cursor-pointer' height={20} name='sun' />
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
        {childrenMenu.length > 0 && (
          <div className='w-[50px] pt-3 bg-container-bg-2 border-r border-grey flex flex-col items-center'>
            {childrenMenu.map((i) => (
              <div key={i.path} className={classNames('flex flex-col gap-1 p-1 rounded-md justify-center items-center w-[40px]', { 'bg-grey-3 text-primary': pathname.startsWith(i.path) }, styles.menu_icon, 'hover:bg-grey-3', 'cursor-pointer')}>
                <SvgIcon className={classNames('text-grey-1', { 'bg-grey-3 text-primary': pathname === i.path }, 'hover:bg-grey-3')} width={15} height={15} name={i.icon} />
                <span className={classNames('text-[10px] text-grey-1', { 'text-primary': pathname === i.path })}>{i.name}</span>
              </div>
            ))}
          </div>
        )}
        <main className={classNames(styles.main_container, 'bg-container-bg')}>
          <Toaster />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default Layout
