import { Link } from 'react-router-dom'
import appQr from '@/assets/images/app-qr.png'
import appStoreIcon from '@/assets/images/app-store-icon.png'
import googlePlayIcon from '@/assets/images/google-play-icon.png'
import appGalleryIcon from '@/assets/images/app-gallery-icon.png'

interface Props {
  inRegisterLayout?: boolean
}

export const Footer = ({ inRegisterLayout }: Props) => {
  return (
    <footer className={!inRegisterLayout ? 'border-t-4 border-orange' : ''}>
      <div className='bg-[#fbfbfb]'>
        <div className='container'>
          <div className='grid grid-cols-5 text-[#000000a6] p-[0.3125rem] border-b-2 text-xs w-full'>
            <div className='px-[0.3125rem]'>
              <div className='font-bold text-[#000000de] mt-10 mb-5'>CHĂM SÓC KHÁCH HÀNG</div>
              <div className='mb-3'>
                <Link to='#'>Trung Tâm Trợ Giúp</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Shopee Blog</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Shopee Mall</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Hướng Dẫn Mua Hàng</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Hướng Dẫn Bán Hàng</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Thanh Toán</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Shopee Xu</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Vận Chuyển</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Trả Hàng & Hoàn Tiền</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Chăm Sóc Khách Hàng</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Chính Sách Bảo Hành</Link>
              </div>
            </div>

            <div className='px-[0.3125rem]'>
              <div className='font-bold text-[#000000de] mt-10 mb-5'>VỀ SHOPEE</div>
              <div className='mb-3'>
                <Link to='#'>Giới Thiệu Về Shopee Việt Nam</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Tuyển Dụng</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Điều Khoản Shopee</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Chính Sách Bảo Mật</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Chính Hãng</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Kênh Người Bán</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Flash Sales</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Chương Trình Tiếp Thị Liên Kết Shopee</Link>
              </div>
              <div className='mb-3'>
                <Link to='#'>Liên Hệ Với Truyền Thông</Link>
              </div>
            </div>
            <div className='px-[0.3125rem]'>
              <div className='font-bold text-[#000000de] mt-10 mb-5'>THANH TOÁN</div>
              <div className='grid grid-cols-4 auto-rows-[1.875rem] gap-2'>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full block object-contain'
                    src='https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08'
                    alt='logo'
                  />
                </div>
                <div></div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full block object-contain'
                    src='https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09'
                    alt='logo'
                  />
                </div>
                <div></div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full block object-contain'
                    src='https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 justify-center items-center row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-ful block'
                    src='https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492'
                    alt='logo'
                  />
                </div>
              </div>
              <div className='font-bold text-[#000000de] my-5'>ĐƠN VỊ VẬN CHUYỂN</div>
              <div className='grid grid-cols-4 auto-rows-[1.875rem] gap-2 mb-5'>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full block object-contain'
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6'
                    alt='logo'
                  />
                </div>
                <div></div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full block object-contain'
                    src='https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full object-contain block'
                    src='https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63'
                    alt='logo'
                  />
                </div>
                <div></div>
                <div className='col-span1 row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-full block object-contain'
                    src='https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 justify-center items-center row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-ful block'
                    src='https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 justify-center items-center row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-ful block'
                    src='https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63'
                    alt='logo'
                  />
                </div>
                <div></div>
                <div className='col-span1 justify-center items-center row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-ful block'
                    src='https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
                    alt='logo'
                  />
                </div>
                <div className='col-span1 justify-center items-center row-span-1 p-1 shadow-sm bg-white rounded-sm'>
                  <img
                    className='w-full h-ful block'
                    src='https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd'
                    alt='logo'
                  />
                </div>
              </div>
            </div>
            <div className='px-[0.3125rem]'>
              <div className='font-bold text-[#000000de] mt-10 mb-5'>THEO DÕI CHÚNG TÔI TRÊN</div>
              <div className='mb-3'>
                <Link to='#' className='flex items-center gap-2'>
                  <img
                    className='w-4 h-4'
                    src='https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5'
                    alt='facebook'
                  />
                  <span className='hover:text-orange'>Facebook</span>
                </Link>
              </div>
              <div className='mb-3'>
                <Link to='#' className='flex items-center gap-2'>
                  <img
                    className='w-4 h-4'
                    src='https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91'
                    alt='instagram'
                  />
                  <span className='hover:text-orange'>Instagram</span>
                </Link>
              </div>
              <div className='mb-3'>
                <Link to='#' className='flex items-center gap-2'>
                  <img
                    className='w-4 h-4'
                    src='https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a'
                    alt='linkedIn'
                  />
                  <span className='hover:text-orange'>LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className='w-[12.5rem] justify-self-end'>
              <div className='font-bold text-[#000000de] mt-10 mb-5'>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</div>
              <div className='flex gap-3'>
                {inRegisterLayout && null}
                {!inRegisterLayout && (
                  <Link to='#' className='bg-white shadow-sm rounded-sm'>
                    <img src={appQr} className='p-1 size-20' alt='' />
                  </Link>
                )}
                <div className='flex flex-col justify-between gap-2 w-[4.75rem]'>
                  <Link to='#' className='p-1 bg-white shadow-sm rounded-sm'>
                    <img src={appStoreIcon} alt='' />
                  </Link>
                  <Link to='#' className='p-1 bg-white shadow-sm rounded-sm'>
                    <img src={googlePlayIcon} alt='' />
                  </Link>
                  <Link to='#' className='p-1 bg-white shadow-sm rounded-sm'>
                    <img src={appGalleryIcon} alt='' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-[#0000008a] py-10'>
            <div className='lg:col-span-1'>
              <div>© 2024 Shopee. Tất cả các quyền được bảo lưu.</div>
            </div>
            <div className='lg:col-span-2'>
              <div className='flex justify-end items-center'>
                <div>Quốc gia & Khu vực:</div>
                <div className='border-r border-[]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Indonesia
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Thái Lan
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Malaysia
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Việt Nam
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Philippines
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Brazil
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    México
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Colombia
                  </Link>
                </div>
                <div className='border-r border-[#00000033]'>
                  <Link to='#' className='px-[0.3125rem]'>
                    Chile
                  </Link>
                </div>
                <div>
                  <Link to='#' className='px-[0.3125rem]'>
                    Đài Loan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-[2.625rem] pb-[2.3125rem] bg-[#f5f5f5]'>
        <div className='container'>
          <div className='flex items-center justify-center uppercase text-xs text-[#0000008a]'>
            <div className='px-[1.5625rem] border-r'>
              <Link to='#'>Chính sách bảo mật</Link>
            </div>
            <div className='px-[1.5625rem] border-r'>
              <Link to='#'>Quy chế hoạt động</Link>
            </div>
            <div className='px-[1.5625rem] border-r'>
              <Link to='#'>Chính sách vận chuyển</Link>
            </div>
            <div className='px-[1.5625rem] border-l'>
              <Link to='#'>Chính sách trả hàng và hoàn tiền</Link>
            </div>
          </div>
          <div className='flex items-center justify-center mt-10'>
            <div className='mx-5'>
              <Link to='#'>
                <div className='h-12 w-[7.5rem] bg-[length:551.6666666666666%_477.77777777777777%] bg-[14.391143911439114%_99.41176470588235%] bg-footer-texture'></div>
              </Link>
            </div>
            <div className='mx-5'>
              <Link to='#'>
                <div className='h-12 w-[7.5rem] bg-[length:551.6666666666666%_477.77777777777777%] bg-[14.391143911439114%_99.41176470588235%] bg-footer-texture'></div>
              </Link>
            </div>
            <div className='mx-5'>
              <Link to='#'>
                <div className='size-12 bg-[length:1379.1666666666667%_447.9166666666667%] bg-[1.6286644951140066%_92.21556886227545%] bg-footer-texture'></div>
              </Link>
            </div>
          </div>
          <div className='text-center text-xs mt-[0.625rem] text-[#000000a6]'>
            <p>Công ty TNHH Shopee</p>
            <p className='mt-6'>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
              phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </p>
            <p className='mt-2'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</p>
            <p className='mt-2'>
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
            </p>
            <p className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
