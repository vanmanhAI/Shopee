import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  isShowError?: boolean
}

export default function InputV2<T extends FieldValues, N extends FieldPath<T>>(
  props: UseControllerProps<T, N> & InputNumberProps
) {
  const { field } = useController(props)
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full h-10 text-[#000] leading-normal text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md',
    classNameError = 'text-red-500 text-sm mt-1',
    isShowError = false,
    errorMessage,
    ...rest
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const conditionNumber = type === 'number' && (/^\d+$/.test(inputValue) || inputValue === '')
    if (conditionNumber || type !== 'number') {
      field.onChange(e)
      if (onChange) {
        onChange(e)
      }
    }
  }

  if (isShowError)
    return (
      <div className={className}>
        <input className={classNameInput} {...rest} {...field} onChange={handleChange} />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    )
  return <input className={classNameInput} {...rest} {...field} onChange={handleChange} />
}
