import { UseFormRegister } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
}

export const Input = ({
  type,
  errorMessage,
  classNameInput = 'p-3 w-full h-10 text-[#000] leading-normal text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md',
  classNameError = 'mt-1 text-red-600 min-h-4 text-xs',
  placeholder,
  className,
  register,
  name,
  ...rest
}: Props) => {
  const registerResult = register && name ? register(name) : {}
  return (
    <div className={className}>
      <input type={type} {...registerResult} className={classNameInput} placeholder={placeholder} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
