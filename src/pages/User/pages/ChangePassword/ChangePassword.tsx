import classNames from 'classnames'
import { ProfileFormData } from '@/pages/User/pages/Profile/Profile'

export type changePasswordFormData = Pick<ProfileFormData, 'password'>

export default function ChangePassword() {
  return (
    <div className='relative bg-white rounded-sm flex-grow shadow-sm'>
      <div className='px-[1.875rem] pb-[0.625rem]'>
        <div className='py-5 border-b border-[#efefef]'>
          <h1 className='text-black/85 text-xl leading-8 font-medium m-0 capitalize'>Thêm mật khẩu</h1>
          <div className='text-base text-black/55 mt-1'>
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </div>
        </div>
        <div className='flex pt-[1.5625rem]'>
          <form>
            <div className='flex flex-col items-center'>
              <div className='flex items-center w-[50rem] mb-3'>
                <div className='w-1/5 flex justify-end items-center'>
                  <div className='h-10 text-black/65 text-right'>Mật khẩu mới</div>
                </div>
                <div className='w-1/2 pl-5'>
                  <div>
                    <div
                      className={classNames('h-10 border border-black/15 overflow-hidden w-full', {
                        'shadow-sm bg-[#fff6f7] border-orange': false
                      })}
                    ></div>
                    <div className='mt-2 text-orange'></div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
