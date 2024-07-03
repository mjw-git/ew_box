import ImageCompress from '@/pages/image-compress'
import ImageShape from '@/pages/image-shape'

export const routes = [
  { icon: 'pic', path: '/shape', component: <ImageShape /> },
  {
    path: '/invoices',
    icon: 'password_box',
    component: <ImageCompress />,
  },
]
