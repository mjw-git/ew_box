import PasswordBox from '@/pages/password-box'
import ImageShape from '@/pages/image-shape'

export const routes = [
  { icon: 'pic', path: '/shape', component: <ImageShape /> },
  {
    path: '/password',
    icon: 'password_box',
    component: <PasswordBox />,
  },
]
