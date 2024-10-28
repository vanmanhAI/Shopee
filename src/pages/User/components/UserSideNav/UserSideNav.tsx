import path from '@/constants/path'
import { Link, useLocation } from 'react-router-dom'
import editProfilePen from '@/assets/images/edit-profile-pen.svg'
import userIcon from '@/assets/images/user-icon.png'
import purchaseInvoiceIcon from '@/assets/images/purchase-invoice-icon.png'
import { Select } from '@/components/Select/context/select.context'
import SelectTrigger from '@/components/Select/components/SelectTrigger'
import SelectContent from '@/components/Select/components/SelectContent'
import classNames from 'classnames'

export default function UserSideNav() {
  const { pathname } = useLocation()

  return (
    <div className='w-[11.25rem] flex-shrink-0'>
      <div className='flex py-[0.9375rem] text-black/80 border-b border-[#efefef] gap-[0.9375rem]'>
        <Link
          to={path.profile}
          className='size-[3.125rem] flex-shrink-0 border border-black/10 rounded-full overflow-hidden flex items-center justify-center'
        >
          {/* <img
            src='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
            className='size-full object-cover'
          /> */}
          <svg
            className='stroke-[#c6c6c6] text-2xl font-normal size-6 fill-current'
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
          >
            <g>
              <circle cx='7.5' cy='4.5' fill='none' r='3.8' strokeMiterlimit={10} />
              <path d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6' fill='none' strokeLinecap='round' strokeMiterlimit={10} />
            </g>
          </svg>
        </Link>
        <div className='flex-1 flex flex-col gap-[0.3125rem] truncate justify-center'>
          <div className='truncate font-semibold text-[#333] leading-tight'>b21dccn510_chuvnmnh</div>
          <Link to={path.profile} className='text-[#888] text-sm leading-tight truncate capitalize flex gap-1'>
            <img src={editProfilePen} alt='editProfilePen' className='size-3' />
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-[1.6875rem] flex flex-col'>
        <div className='flex flex-col'>
          <Select
            open={pathname.startsWith('/user/account')}
            isShowAtRoot={false}
            refPressEvent='click'
            isSameLengthAsReference={true}
            applyAnimation={true}
            framesAnimation={{
              initial: { display: 'grid', gridTemplateRows: '0fr', opacity: 0 },
              animate: { opacity: 1, gridTemplateRows: '1fr' },
              transition: { gridTemplateRows: { duration: 0.08 } },
              exit: {
                gridTemplateRows: '0fr',
                opacity: 0,
                transition: { ease: [0.4, 0, 0.2, 1], duration: 0.4 }
              }
            }}
          >
            <SelectTrigger asChild>
              <Link
                to={path.profile}
                className='flex items-center gap-[0.625rem] capitalize text-black/85 hover:text-orange mb-[0.9375rem]'
              >
                <div className='size-5 flex-shrink-0'>
                  <img src={userIcon} alt='userIcon' className='size-full' />
                </div>
                <div className='font-medium leading-4'>Tài khoản của tôi</div>
              </Link>
            </SelectTrigger>
            <SelectContent>
              <div className='pl-[2.125rem] flex flex-col h-full overflow-hidden'>
                <Link
                  to={path.profile}
                  className={classNames('hover:text-orange text-black/65 mb-[0.9375rem]', {
                    'text-orange': pathname === path.profile || pathname === path.changePhone,
                    'text-black/65': pathname !== path.profile && pathname !== path.changePhone
                  })}
                >
                  Hồ sơ
                </Link>
                <Link
                  to={path.changePassword}
                  className={classNames('hover:text-orange text-black/65 mb-[0.9375rem]', {
                    'text-orange': pathname === path.changePassword,
                    'text-black/65': pathname !== path.changePassword
                  })}
                >
                  Đổi mật khẩu
                </Link>
              </div>
            </SelectContent>
          </Select>
        </div>
        <Link
          to={path.historyPurchase}
          className={classNames('flex items-center gap-[0.625rem] capitalize hover:text-orange', {
            'text-orange': pathname === path.historyPurchase,
            'text-black/65': pathname !== path.historyPurchase
          })}
        >
          <div className='size-5 flex-shrink-0'>
            <img src={purchaseInvoiceIcon} alt='purchaseInvoiceIcon' className='size-full' />
          </div>
          <div className='font-medium leading-4'>Đơn mua</div>
        </Link>
      </div>
    </div>
  )
}
