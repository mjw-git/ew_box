import PasswordBox from '@/pages/password-box'
import ImageShape from '@/pages/image-shape'
import Setting from '@/pages/setting'

export const routes = [
  { icon: 'pic', path: '/shape', component: <ImageShape /> },
  {
    path: '/password',
    icon: 'password_box',
    component: <PasswordBox />,
  },
  {
    path: '/setting',
    hideInMenu: true,
    icon: 'setting',
    components: <Setting />,
  },
]
