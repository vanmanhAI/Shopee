import { forwardRef, useState } from 'react'

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  isShowError?: boolean
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    className,
    classNameInput = 'p-3 w-full h-10 text-[#000] leading-normal text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md',
    classNameError = 'text-red-500 text-sm mt-1',
    value,
    onChange,
    isShowError = false,
    ...rest
  },
  PropRef
) {
  const [localValue, setLocalValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (/^\d+$/.test(value) || value === '') {
      if (onChange) {
        onChange(e)
      }
      setLocalValue(value)
    }
  }

  if (isShowError)
    return (
      <div className={className}>
        <input className={classNameInput} value={value ?? localValue} onChange={handleChange} {...rest} ref={PropRef} />
        <div className={classNameError}>{rest.errorMessage}</div>
      </div>
    )
  return <input className={className} value={value ?? localValue} onChange={handleChange} {...rest} ref={PropRef} />
})
