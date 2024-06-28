import ImageCompress from '@/pages/image-compress'
import ImageShape from '@/pages/image-shape'

export const routes = [
  {
    path: '/shape',
    component: <ImageShape />,
  },
  {
    path: '/invoices',
    component: <ImageCompress />,
  },
]
