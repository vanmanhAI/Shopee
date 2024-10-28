import { Link, useNavigate } from 'react-router-dom'
import Popover from '@/components/Popover'
import appStoreIcon from '@/assets/images/app-store-icon.png'
import googlePlayIcon from '@/assets/images/google-play-icon.png'
import appGalleryIcon from '@/assets/images/app-gallery-icon.png'
import notificationWithoutAuth from '@/assets/images/notification-without-auth.png'
import appQr from '@/assets/images/app-qr.png'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import path from '@/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/apis/auth.api'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setProfile(null)
      setIsAuthenticated(false)
      queryClient.clear()
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleClickAccount = () => {
    navigate(path.historyPurchase)
  }

  return (
    <div className='flex justify-between text-[0.8125rem] text-white'>
      <div className='flex items-center'>
        <Link to='#' className='px-[0.4375rem] hover:text-gray-300 border-r-2 border-[#ffffff38] cursor-pointer'>
          Kênh Người Bán
        </Link>
        {!isAuthenticated && (
          <Link to='#' className='px-[0.4375rem] hover:text-gray-300 border-r-2 border-[#ffffff38] cursor-pointer'>
            Trở thành Người bán shopee
          </Link>
        )}
        <Popover
          offsetOptions={{ mainAxis: 12 }}
          arrowColor='transparent'
          applyAnimation={false}
          placement='bottom-start'
          zIndex={20}
          renderPopover={
            <div className='flex z-1 flex-col w-[11.25rem] p-[0.125rem] overflow-hidden bg-white rounded-sm'>
              <img src={appQr} alt='app-qr' className='size-[11.25rem]' />
              <div className='px-[0.9375rem] pb-[0.3125rem] grid grid-cols-2 gap-2 mt-[0.3125rem]'>
                <img src={appStoreIcon} alt='app-store' className='col-span-1 flex-shrink-0' />
                <img src={googlePlayIcon} alt='google-play' className='col-span-1 flex-shrink-0' />
                <img src={appGalleryIcon} alt='app-gallery' className='col-span-1 flex-shrink-0' />
              </div>
            </div>
          }
        >
          <Link to='#' className='px-[0.4375rem] hover:text-gray-300 border-r-2 border-[#ffffff38] cursor-pointer'>
            Tải ứng dụng
          </Link>
        </Popover>
        <div className='px-[0.4375rem]'>Kết nối</div>
        <div className='flex items-center gap-[0.625rem]'>
          <Link
            to='#'
            className={`size-4 flex-shrink-0 bg-[url('/src/assets/images/socials.png')] bg-[8.064516129032258%_16.129032258064516%] bg-[length:487.5%_293.75%]`}
          ></Link>
          <Link
            to='#'
            className={`size-4 flex-shrink-0 bg-[url('/src/assets/images/socials.png')] bg-[58.064516129032256%_16.129032258064516%] bg-[length:487.5%_293.75%]`}
          ></Link>
        </div>
      </div>
      <div className='flex items-center justify-end h-[2.125rem]'>
        <Popover
          placement='bottom-end'
          zIndex={20}
          strokeArrowColor='#00000017'
          strokeArrowWidth={1}
          renderPopover={
            <div
              className={`relative flex z-20 flex-col border border-gray-300 overflow-hidden bg-white rounded-sm shadow-[0_1px_3.125rem_0_rgba(0,0,0,.2)] text-sm w-[25rem] ${!isAuthenticated && 'h-[21.875rem] text-[#000000cc]'}`}
            >
              {isAuthenticated && (
                <>
                  <h3 className='flex items-center h-10 px-[0.625rem] capitalize text-[#00000042]'>
                    Thông báo mới nhận
                  </h3>
                  <div className='flex px-2 py-[0.625rem] bg-[#fff2ee] hover:bg-[#f8f8f8] cursor-pointer'>
                    <div className="size-10 overflow-hidden flex-shrink-0 mr-[0.625rem] bg-[url('https://down-vn.img.susercontent.com/file/dbaaaeb4882d243f5552dbdf940f570f_tn')] bg-[#fff2ee] bg-contain"></div>
                    <div className='flex flex-col rm-[0.625rem] overflow-hidden'>
                      <div className='text-[#000000cc] mb-[0.3125rem] truncate'>
                        Tham gia Beauty Club - Ưu đãi thả ga
                      </div>
                      <div className='line-clamp-5 text-xs text-[#0000008a] mb-[0.3125rem]'>
                        🌟 Giá độc quyền giảm đến 50% 🎁 Voucher đến 200.000Đ Thứ 3 hàng tuần 💌 Ưu đãi dành riêng thành
                        viên từ các thương hiệu làm đẹp ▶️ ĐĂNG KÝ THÀNH VIÊN MIỄN PHÍ NGAY!
                      </div>
                    </div>
                  </div>
                  <div className='flex px-2 py-[0.625rem] bg-[#fff2ee] hover:bg-[#f8f8f8] cursor-pointer'>
                    <div className="size-10 overflow-hidden flex-shrink-0 mr-[0.625rem] bg-[url('https://down-vn.img.susercontent.com/file/07b48cd255a12f6d06e80bf0fefba28c_tn')] bg-[#fff2ee] bg-contain"></div>
                    <div className='flex flex-col rm-[0.625rem] overflow-hidden'>
                      <div className='text-[#000000cc] mb-[0.3125rem] truncate'>Cho Shopee biết thêm về bạn nhé</div>
                      <div className='line-clamp-5 text-xs text-[#0000008a] mb-[0.3125rem]'>
                        📝 Hãy cập nhật đầy đủ thông tin để luôn nhận được các ưu đãi Shopee dành riêng cho bạn nhé! 💁‍♀️
                        Cập nhật ngay hôm nay!
                      </div>
                    </div>
                  </div>
                  <div className='flex px-2 py-[0.625rem] bg-[#fff2ee] hover:bg-[#f8f8f8] cursor-pointer'>
                    <div className="size-10 overflow-hidden flex-shrink-0 mr-[0.625rem] bg-[url('https://down-vn.img.susercontent.com/file/sg-11134004-7r99o-llu8aw69z4edc3_tn')] bg-[#fff2ee] bg-contain"></div>
                    <div className='flex flex-col rm-[0.625rem] overflow-hidden'>
                      <div className='text-[#000000cc] mb-[0.3125rem] truncate'>
                        T🎁 Tặng bạn 01 Mã khuyến mãi 0Đ! 💥
                      </div>
                      <div className='line-clamp-5 text-xs text-[#0000008a] mb-[0.3125rem]'>
                        ⏰ Mã hết hạn lúc 22-08-2024 👉 Shopee dành riêng mnhchu572 🛒 Dùng ngay thôi!
                      </div>
                    </div>
                  </div>
                  <div className='flex px-2 py-[0.625rem] bg-[#fff2ee] hover:bg-[#f8f8f8] cursor-pointer'>
                    <div className="size-10 overflow-hidden flex-shrink-0 mr-[0.625rem] bg-[url('https://down-vn.img.susercontent.com/file/sg-11134004-7rdxr-lyw00pv7eakn03_tn')] bg-[#fff2ee] bg-contain"></div>
                    <div className='flex flex-col rm-[0.625rem] overflow-hidden'>
                      <div className='text-[#000000cc] mb-[0.3125rem] truncate'>KHUNG GIỜ SALE CUỐI RỒI Mạnh ƠI</div>
                      <div className='line-clamp-5 text-xs text-[#0000008a] mb-[0.3125rem]'>
                        🌟P&G, Lixibox, LG,...giảm đến 50% 🔥Mã giảm 100K, 40K sắp hết 🎊Shopee Live tung deal nửa giá
                        🚀Mua ngay thôi!
                      </div>
                    </div>
                  </div>
                  <Link to='#' className='flex items-center justify-center h-10 text-[#000000cc] bg-white text-center'>
                    Xem tất cả
                  </Link>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <div className='flex-grow flex flex-col justify-center items-center'>
                    <img className='size-[6.25rem]' src={notificationWithoutAuth} alt='' />
                    <p className='text-center mt-5'>Đăng nhập để xem Thông báo</p>
                  </div>
                  <div className='flex flex-[0_0_2.5rem]'>
                    <Link
                      to={path.register}
                      className='flex items-center justify-center flex-grow flex-shrink-0 hover:bg-[#e8e8e8] hover:text-orange'
                    >
                      Đăng ký
                    </Link>
                    <Link
                      to={path.login}
                      className='flex items-center justify-center flex-grow flex-shrink-0 hover:bg-[#e8e8e8] hover:text-orange'
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </>
              )}
            </div>
          }
        >
          <Link to='#' className='relative flex items-center mr-[0.1875rem] py-1 cursor-pointer hover:text-gray-300'>
            <svg viewBox='3 2.5 14 14' x={0} y={0} className='w-[0.875rem] h-[1.125rem] fill-current'>
              <path d='m17 15.6-.6-1.2-.6-1.2v-7.3c0-.2 0-.4-.1-.6-.3-1.2-1.4-2.2-2.7-2.2h-1c-.3-.7-1.1-1.2-2.1-1.2s-1.8.5-2.1 1.3h-.8c-1.5 0-2.8 1.2-2.8 2.7v7.2l-1.2 2.5-.2.4h14.4zm-12.2-.8.1-.2.5-1v-.1-7.6c0-.8.7-1.5 1.5-1.5h6.1c.8 0 1.5.7 1.5 1.5v7.5.1l.6 1.2h-10.3z' />
              <path d='m10 18c1 0 1.9-.6 2.3-1.4h-4.6c.4.9 1.3 1.4 2.3 1.4z' />
            </svg>
            <span className='mx-1'>Thông báo</span>
          </Link>
        </Popover>
        <Link to='#' className='flex items-center py-1 pr-[0.625rem] cursor-pointer hover:text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-[1.125rem]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
            />
          </svg>
          <span className='mx-1'>Hỗ trợ</span>
        </Link>
        <Popover
          placement='bottom-end'
          zIndex={20}
          renderPopover={
            <div className='bg-white border border-gray-300 rounded-sm shadow-[0_.0625rem_3.125rem_0_rgba(0,0,0,.2)] flex flex-col overflow-hidden min-w-[12.5rem] text-sm cursor-pointer'>
              <button className='text-left p-[0.625rem] hover:text-orange'>
                <span>Tiếng việt</span>
              </button>
              <button className='text-left p-[0.625rem] hover:text-orange'>
                <span>English</span>
              </button>
            </div>
          }
          className='flex items-center py-[0.4375rem] px-[0.625rem] cursor-pointer hover:text-gray-300'
          offsetOptions={{ crossAxis: 0 }}
        >
          <svg
            width='16'
            height='16'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span className='mx-1'>Tiếng việt</span>
          <svg
            width='12'
            height='12'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticated && (
          <Popover
            className='flex items-center px-[0.625rem] py-[0.4375rem] cursor-pointer hover:text-gray-300'
            onClick={handleClickAccount}
            offsetOptions={{ crossAxis: 0 }}
            placement='bottom-end'
            zIndex={20}
            renderPopover={
              <div className='flex flex-col z-1 min-w-[9.375rem] overflow-hidden bg-white rounded-sm border-sm shadow-[0_.0625rem_3.125rem_0_rgba(0,0,0,.2)]'>
                <Link
                  to={path.profile}
                  className='text-sm text-[#000000de] text-left font-[500] capitalize p-[0.625rem] hover:bg-[#fafafa] hover:text-[#00bfa5]'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to={path.historyPurchase}
                  className='text-sm text-[#000000de] text-left font-[500] capitalize p-[0.625rem] hover:bg-[#fafafa] hover:text-[#00bfa5]'
                >
                  Đơn mua
                </Link>
                <button
                  onClick={handleLogout}
                  className='text-sm text-[#000000de] text-left font-[500] capitalize p-[0.625rem] hover:bg-[#fafafa] hover:text-[#00bfa5]'
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='w-5 h-5 mr-1 flex-shrink-0'>
              <div className='w-full h-full bg-[#f5f5f5] rounded-full flex justify-center items-center'>
                {/* <img
                  src='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
                  alt='username'
                  className='block w-full h-full object-cover rounded-full'
                /> */}
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='text-sm leading-none stroke-[#c6c6c6] font-normal size-[0.9375rem] fill-current'
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
            </div>
            <span>{profile?.email.split('@')[0] || 'Tài khoản'}</span>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link
              to={path.register}
              className='capitalize px-[0.625rem] cursor-pointer hover:text-gray-300 border-r-2 border-[#ffffff38]'
            >
              Đăng ký
            </Link>

            <Link to={path.login} className='capitalize px-[0.625rem] cursor-pointer hover:text-gray-300'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
