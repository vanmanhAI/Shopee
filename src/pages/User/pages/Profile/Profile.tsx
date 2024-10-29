import DateSelect from '@/components/DateSelect'
import Input from '@/components/Input'
import DaySelect from '@/components/DateSelect/components/DaySelect'
import MonthSelect from '@/components/DateSelect/components/MonthSelect'
import YearSelect from '@/components/DateSelect/components/YearSelect'
import { useNavigate } from 'react-router-dom'
import path from '@/constants/path'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { getProfile } from '@/apis/user.api'
import Spinner from '@/components/Spinner'
import { useForm } from 'react-hook-form'
import { truncateEmail } from '@/utils/utils'
import { User } from '@/types/user.type'

export interface ProfileFormData {
  name: string
  address: string
  email: string
  phone: string
  date_of_birth: string
}

export const Profile = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors }
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: '',
      address: '',
      email: '',
      date_of_birth: new Date().toISOString()
    }
  })

  const handleChangePhone = () => {
    navigate(path.changePhone)
  }

  const { data: profileData, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROFILE],
    queryFn: getProfile
  })

  const profile = profileData?.data.data
  console.log('profile', profile)

  return (
    <div className='relative bg-white rounded-sm flex-grow shadow-sm'>
      {!isSuccess ? (
        <Spinner className='absolute top-0 left-0 w-full h-full' />
      ) : (
        <div className='px-[1.875rem] pb-[0.625rem]'>
          <div className='py-[1.125rem] border-b border-[#efefef]'>
            <h1 className='text-[#333] text-lg font-medium m-0 capitalize'>Hồ sơ của tôi</h1>
            <div className='text-sm text-[#555] mt-[0.1875rem] leading-[1.0625rem]'>
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </div>
          </div>
          <div className='flex items-start pt-[1.875rem]'>
            <div className='flex-1 pr-[3.125rem]'>
              <form className='w-[37.625rem]'>
                <div className='flex mb-[1.875rem]'>
                  <div className='w-[24.7%] truncate text-[#555c] h-10 flex items-center justify-end'>Tên</div>
                  <Input
                    className='w-[75.3%] rounded-sm overflow-hidden h-10 pl-5'
                    register={register}
                    name='name'
                    placeholder='Tên'
                    errorMessage={errors.name?.message}
                    classNameInput='p-3 shadow-sm w-full h-10 text-[#000] leading-normal text-sm outline-none border border-gray-300 rounded-sm'
                  />
                </div>
                <div className='flex mb-[1.875rem]'>
                  <div className='w-[24.7%] truncate text-[#555c] h-10 flex items-center justify-end'>Địa chỉ</div>
                  <Input
                    className='w-[75.3%] rounded-sm overflow-hidden pl-5 h-10'
                    register={register}
                    name='address'
                    placeholder='Địa chỉ'
                    errorMessage={errors.address?.message}
                    classNameInput='p-3 shadow-sm w-full h-10 text-[#000] leading-normal text-sm outline-none border border-gray-300 rounded-sm'
                  />
                </div>
                <div className='flex items-center mb-[1.875rem]'>
                  <div className='w-[24.7%] truncate text-[#555c] flex items-center justify-end'>Email</div>

                  <div className='text-[#333] pl-5 w-[75.3%]'>{truncateEmail((profile as User).email)}</div>
                </div>
                <div className='flex items-center mb-[1.875rem]'>
                  <div className='w-[24.7%] truncate text-[#555c] flex items-center justify-end'>Số điện thoại</div>
                  <div className='text-[#333] pl-5 w-[75.3%]'>
                    <button
                      onClick={handleChangePhone}
                      className='bg-none border-none outline-none text-[0.8125rem] capitalize underline text-[#05a]'
                    >
                      Thêm
                    </button>
                  </div>
                </div>
                <div className='flex justify-between mb-[1.875rem]'>
                  <div className='w-[24.7%] truncate text-[#555c] h-10 flex items-center justify-end'>Ngày sinh</div>
                  <div className='text-[#333] h-10 pl-5 w-[75.3%] flex justify-between'>
                    <DateSelect>
                      <DaySelect />
                      <MonthSelect />
                      <YearSelect />
                    </DateSelect>
                  </div>
                </div>
                <div className='flex items-center mb-[1.875rem]'>
                  <div className='w-[24.7%] truncate text-[#555c] flex items-center justify-end'></div>
                  <div className='text-[#333] pl-5 w-[75.3%]'>
                    <button className='h-10 max-[13.75rem] min-w-[4.375rem] px-5 outline-none bg-orange text-white truncate rounded-sm shadow-sm text-sm'>
                      Lưu
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className='flex justify-center w-[17.5rem] border-l border-[#efefef]'>
              <div className='flex flex-col items-center'>
                <div className='size-[6.25rem] my-5 flex items-center justify-center rounded-full overflow-hidden bg-[#efefef]'>
                  {/* <div className='size-full bg-[url("https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D")] bg-no-repeat bg-cover bg-center'></div> */}
                  <svg
                    className='stroke-[#c6c6c6] text-2xl font-normal size-[3.125rem] fill-current'
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                  >
                    <g>
                      <circle cx='7.5' cy='4.5' fill='none' r='3.8' strokeMiterlimit={10} />
                      <path
                        d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
                        fill='none'
                        strokeLinecap='round'
                        strokeMiterlimit={10}
                      />
                    </g>
                  </svg>
                </div>
                <input className='hidden' type='file' accept='.jpg,jpeg,.png' />
                <button className='bg-white border border-black/10 text-[#555] min-w-[4.375rem] max-w-[13.75rem] h-10 flex items-center justify-center truncate capitalize rounded-sm px-5'>
                  Chọn ảnh
                </button>
                <div className='mt-3'>
                  <div className='text-[#999] leading-5'>Dụng lượng file tối đa 1 MB</div>
                  <div className='text-[#999] leading-5'>Định dạng:.JPEG, .PNG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
