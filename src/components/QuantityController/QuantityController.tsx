import InputNumber from '@/components/InputNumber'
import { InputNumberProps } from '@/components/InputNumber/InputNumber'
import classNames from 'classnames'
import { forwardRef, useState } from 'react'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
  disabled?: boolean
  checkValueOutside?: boolean
}

export const QuantityController = forwardRef<HTMLInputElement, Props>(
  (
    {
      max,
      onIncrease,
      onDecrease,
      onType,
      onFocusOut,
      value,
      classNameWrapper = 'text-sm mr-[0.9375rem] bg-white',
      disabled = false,
      checkValueOutside = false,
      ...rest
    },
    propRef
  ) => {
    const [localValue, setLocalValue] = useState<number>(0)
    const MIN_VALUE = value ? 1 : 0

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let _value = Number(e.target.value)

      if (max !== undefined && _value > max && !checkValueOutside) {
        _value = max
      } else if (_value < MIN_VALUE) {
        _value = MIN_VALUE
      }
      if (onType) {
        onType(_value)
      }
      setLocalValue(_value)
    }

    const increase = () => {
      let _value = value ? Number(value) + 1 : localValue + 1
      if (!checkValueOutside) {
        if (max !== undefined && _value > max) {
          _value = max
        }
      }
      if (onIncrease) onIncrease(_value)
      setLocalValue(_value)
    }

    const decrease = () => {
      let _value = value ? Number(value) - 1 : localValue - 1
      if (!checkValueOutside) {
        if (_value < MIN_VALUE) {
          _value = MIN_VALUE
        }
      }
      if (onDecrease) onDecrease(_value)
      setLocalValue(_value)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (onFocusOut) onFocusOut(Number(e.target.value))
    }

    return (
      <div className={'flex items-center ' + classNameWrapper}>
        <button
          onClick={decrease}
          disabled={disabled}
          className={classNames(
            'border border-[#00000017] flex items-center justify-center text-black/80 leading-none font-light size-8 tracking-normal outline-none bg-transparent rounded-tl-sm rounded-bl-sm',
            {
              'opacity-30': disabled
            }
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-[0.625rem] flex-shrink-0'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        <InputNumber
          ref={propRef}
          value={value || localValue}
          onChange={handleChange}
          className={classNames(
            'cursor-text py-[1px] px-0.5 border-r-0 rounded-none border-l-0 text-base border border-[#00000017] leading-none tracking-normal bg-transparent font-normal outline-none text-center w-[3.125rem] h-8 focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_#000] text-black/80',
            {
              'opacity-30': disabled
            }
          )}
          onBlur={handleBlur}
          disabled={disabled}
          {...rest}
        />
        <button
          onClick={increase}
          disabled={disabled}
          className={classNames(
            'border border-[#00000017] flex items-center justify-center text-black/80 leading-none font-light size-8 tracking-normal outline-none bg-transparent rounded-tl-sm rounded-bl-sm',
            {
              'opacity-30': disabled
            }
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-[0.625rem] flex-shrink-0'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    )
  }
)
