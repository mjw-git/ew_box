import SvgIcon from '../SvgIcon'
const Empty = () => {
  return (
    <div className='flex justify-center flex-col items-center p-6'>
      <SvgIcon name='empty' className='text-border' width={120} height={64} />
      <span className='text-border'>No Data</span>
    </div>
  )
}
export default Empty
