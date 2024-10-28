import Button from '@/components/Button'
import Input from '@/components/Input'
import { schemaChangePhone } from '@/utils/rules'
import { joiResolver } from '@hookform/resolvers/joi'
import { FieldPath, FieldValues, RegisterOptions, useForm, UseFormRegister } from 'react-hook-form'
import classNames from 'classnames'
import { formatEnforceToVnPhoneNumber } from '@/utils/utils'
import { debounce } from 'lodash'

export interface ChangePhoneFormData {
  phone: string
}

export default function ChangePhone() {
  const {
    register,
    formState: { errors, isValid },
    getValues,
    setValue
  } = useForm<ChangePhoneFormData>({
    defaultValues: {
      phone: ''
    },
    resolver: joiResolver(schemaChangePhone),
    mode: 'onChange'
  })

  const applyDebounce = <T extends FieldValues, TName extends FieldPath<T>>(register: UseFormRegister<T>) => {
    return (name: TName, options?: RegisterOptions<T, TName>) => {
      const { onChange, ...field } = register(name, options)

      return {
        ...field,
        onChange: debounce(onChange, 300)
      }
    }
  }

  const registerWithDebounce = applyDebounce(register)

  const handleBlurPhoneNumber = () => {
    if (isValid) {
      const phoneNumber = getValues('phone')
      const phoneNumberVn = formatEnforceToVnPhoneNumber(phoneNumber)
      setValue('phone', phoneNumberVn)
    }
  }

  return (
    <div className='bg-white rounded-sm flex-grow shadow-sm'>
      <div className='px-[1.875rem] pb-[0.625rem]'>
        <div className='py-[1.125rem] border-b border-[#efefef]'>
          <h1 className='text-[#333] text-lg font-medium m-0 capitalize'>Chỉnh sửa số điện thoại</h1>
        </div>
        <div className='flex pt-[1.5625rem]'>
          <form>
            <div className='flex w-[43.75rem] mb-[0.375rem]'>
              <div className='w-1/5 flex justify-end text-base leading-[1.2] text-[#757575]'>
                Thêm số điện thoại mới
              </div>
              <Input
                register={registerWithDebounce as UseFormRegister<ChangePhoneFormData>}
                name='phone'
                onBlur={handleBlurPhoneNumber}
                errorMessage={errors.phone?.message}
                className='w-4/5 ml-auto pl-5 flex flex-col'
                classNameInput={classNames(
                  'shadow-sm border border-black/15 rounded-sm outline-none p-[0.625rem] transition-colors duration-100 h-10 text-[#222] leading-normal hover:shadow-inner focus:outline-none',
                  {
                    'border-orange bg-[#fff9fa]': errors.phone !== undefined,
                    'focus:border-black/55': errors.phone === undefined
                  }
                )}
                classNameError='text-orange text-sm leading-[1.2] mt-[0.3125rem] min-h-[1.2em]'
              />
            </div>
            <div className='flex w-[43.75rem] mb-[1.75rem] '>
              <div className='w-1/5 flex justify-end text-[#757575]'></div>
              <div className='w-4/5 pl-5 ml-auto'>
                <Button
                  className={classNames(
                    'capitalize rounded-sm bg-none outline-none text-white min-w-20 max-w-[15.625rem] text-base px-5 truncate h-10 w-[7.5625rem]',
                    {
                      'bg-[#facac0] cursor-not-allowed shadow-none': errors.phone !== undefined,
                      'bg-orange shadow-sm': errors.phone === undefined
                    }
                  )}
                  disabled={errors.phone !== undefined}
                >
                  Tiếp theo
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
