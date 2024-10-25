import PasswordBox from '@/pages/password-box'
import ImageShape from '@/pages/image-shape'
import Setting from '@/pages/setting'
import Todo from '@/pages/todo'
import Book from '@/pages/book'

export const routes = [
  { icon: 'pic', path: '/shape', component: <ImageShape />, name: '压缩' },
  {
    path: '/password',
    icon: 'password_box',
    name: '密码箱',
    component: <PasswordBox />,
  },
  {
    path: '/setting',
    hideInMenu: true,
    icon: 'setting',
    name: '设置',
    component: <Setting />,
  },
  {
    path: '/todo',
    icon: 'todo',
    name: 'Todo',
    component: <Todo />,
  },
  {
    path: '/book',
    icon: 'book',
    name: '记账',
    redirect: '/book/account',
    // component: <Book />,
    children: [
      {
        path: '/book/account',
        name: '账本',
        icon: 'book_account',
        component: <Book />,
      },
    ],
  },
]
