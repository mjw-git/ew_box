import dayjs from 'dayjs'

export const PIC_PATH_PREFIX = 'atom:///'
export const randomColor = ['blue-400', 'pink-500', 'slate-400', 'red-400', 'orange-400']
export const bookIcon = ['game', 'shoe', 'car', 'rice', 'house']
export function convertBytes(bytes: number) {
  if (!bytes) return '-'
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }

  return `${bytes.toFixed(2)} ${units[i]}`
}
export const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const yearOptions = Array.from({ length: (dayjs().year() - 2018) * 2 }).map((_, index) => 2018 + index)

export const bookSettingOptions = [
  {
    label: '标签',
    value: 'tag',
  },
  {
    label: '外观',
    value: 'css',
  },
]

export const defaultPaymentTag = [
  {
    label: '餐饮',
    value: 'cook',
  },
  {
    label: '购物',
    value: 'shop',
  },
  { label: '服饰', value: 'shirt' },
  { label: '日用', value: 'daily' },
  { label: '服饰', value: 'shirt2' },
  { label: '日用', value: 'daily43' },
  {
    label: '数码',
    value: 'figure',
  },
  {
    label: '美妆',
    value: 'beauty',
  },
  {
    label: '应用程序',
    value: 'app',
  },
  {
    label: '住房',
    value: 'house',
  },
  {
    label: '娱乐',
    value: 'game',
  },
  {
    label: '医疗',
    value: 'medical',
  },
  {
    label: '办公',
    value: 'office',
  },
  {
    label: '运动',
    value: 'sport',
  },
  {
    label: '社交',
    value: 'social',
  },
  {
    label: '旅行',
    value: 'travel',
  },
  {
    label: '通讯',
    value: 'phone',
  },
  {
    label: '交通',
    value: 'traffic',
  },
  {
    label: '其他',
    value: 'other',
  },
]
export const defaultIncomeTag = [
  {
    label: '工资',
    value: 'salary',
  },
  {
    label: '奖金',
    value: 'bonus',
  },
  {
    label: '红包',
    value: 'red',
  },
  {
    label: '兼职',
    value: 'part',
  },
  {
    label: '退税',
    value: 'refund',
  },
  {
    label: '投资',
    value: 'invest',
  },
  {
    label: '其他',
    value: 'other',
  },
]
export const iconBgColors = [
  { label: 'red', value: '#F06554' },
  { label: 'blue', value: '#50ABF3' },
  { label: 'purple', value: '#9B51E0' },
  { label: 'green', value: '#43C470' },
  { label: 'brown', value: '#8F7E4F' },
  { label: 'yellow', value: '#FBC74E' },
  { label: 'orange', value: '#F69934' },
  { label: 'grey', value: '#5B6670' },
]
