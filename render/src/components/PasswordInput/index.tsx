interface PasswordInputProps {
  count?: number
}
const PasswordInput = (props: PasswordInputProps) => {
  const { count = 4 } = props
  return (
    <div className='flex items-center gap-4'>
      {new Array(4).fill(0).map((_, index) => (
        <input className='outline-none text-primary pl-[15px] pr-[10px] h-[50px] w-[50px] text-3xl bg-white border-solid border-[1px] rounded-[4px] border-primary' key={index} />
      ))}
    </div>
  )
}
export default PasswordInput
