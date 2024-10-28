import Product from '@/components/Product'
import path from '@/constants/path'
import { formatNumberToSocialStyle, genNameId } from '@/utils/utils'
import { Product as ProductType } from '@/types/product.type'

interface Props {
  product: ProductType
}

export default function ProductLIstItem({ product }: Props) {
  return (
    <Product
      product={product}
      isShowRelatedBtn={true}
      isShowBorderHover={true}
      to={`${path.home}${genNameId({ name: product.name, id: product._id })}`}
    >
      <div className='flex items-center font-medium text-orange gap-1'>
        <div className='flex items-baseline flex-shrink truncate'>
          <span className='mr-px text-xs'>₫</span>
          <span className='text-base truncate'>{product.price.toLocaleString('vi-VN')}</span>
        </div>
        {product.price_before_discount - product.price > 0 && (
          <div className='font-medium py-[0.125rem] px-1 text-[0.625rem] mr-1 bg-[#feeeea] rounded-sm'>
            -{Math.round(((product.price_before_discount - product.price) / product.price_before_discount) * 100)}%
          </div>
        )}
      </div>
      <div className='flex flex-col flex-1 justify-between gap-2'>
        <div className='flex h-5 mb-auto items-center space-x-1 text-[.625rem]'>
          <div className='flex flex-shrink-0 items-stretch truncate h-4 text-white max-w-[60%] rounded-sm'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='flex-none -mr-px leading-4'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
            <div className='px-px leading-4 text-[0.625rem] bg-[#f69113] truncate'>Giảm ₫3.8k</div>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='rotate-180 -ml-px'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                strokeWidth={1}
                stroke='#F69113'
                fill='#F69113'
              />
            </svg>
          </div>
          <div className='capitalize text-orange px-[0.1875rem] leading-4 rounded-sm truncate flex-shrink-0 max-w-[60%] h-4 border border-current'>
            <span>Rẻ vô địch</span>
          </div>
        </div>
        <div className='flex mt-auto items-center space-x-1 text-[#000000de] mb-2'>
          <div className='flex-none h-[0.875rem] flex items-center space-x-0.5'>
            <svg xmlns='http://www.w3.org/2000/svg' width={10} height={10} viewBox='0 0 12 12' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.99983 9.93762L2.76524 11.7208C2.54602 11.8417 2.28393 11.6567 2.32433 11.4097L2.94569 7.61076L0.300721 4.9072C0.129793 4.73248 0.228342 4.43764 0.469974 4.40083L4.11226 3.84584L5.72839 0.411994C5.83648 0.18233 6.16317 0.18233 6.27126 0.411995L7.88739 3.84584L11.5297 4.40083C11.7713 4.43764 11.8699 4.73248 11.6989 4.9072L9.05396 7.61076L9.67532 11.4097C9.71572 11.6567 9.45364 11.8417 9.23441 11.7208L5.99983 9.93762Z'
                fill='url(#paint0_linear_1_7602)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1_7602'
                  x1='0.299805'
                  y1='0.29985'
                  x2='0.299805'
                  y2='11.6998'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#FFCA11' />
                  <stop offset={1} stopColor='#FFAD27' />
                </linearGradient>
              </defs>
            </svg>
            <span className='flex-none text-xs'>{product.rating.toFixed(1)}</span>
          </div>
          <div className='h-[0.625rem] border-l'></div>
          <div className='text-xs truncate'>
            <span>{`Đã bán ${formatNumberToSocialStyle(product.sold)}`}</span>
          </div>
        </div>
      </div>
      <div className='flex items-center space-x-1'>
        <div className='flex items-center flex-shrink-0'>
          <svg xmlns='http://www.w3.org/2000/svg' width={16} height={10} viewBox='0 0 16 10' fill='none'>
            <path
              d='M6.03523 9.22335C6.52887 8.79438 6.66113 8.14243 6.33064 7.76716C6.00015 7.3919 5.33205 7.43544 4.8384 7.8644C4.34476 8.29337 4.2125 8.94532 4.54299 9.32059C4.87349 9.69585 5.54158 9.65232 6.03523 9.22335Z'
              fill='#26AA99'
            />
            <path
              d='M12.0577 9.2231C12.5513 8.79414 12.6836 8.14218 12.3531 7.76692C12.0226 7.39166 11.3545 7.43519 10.8609 7.86416C10.3672 8.29312 10.235 8.94508 10.5655 9.32034C10.8959 9.69561 11.564 9.65207 12.0577 9.2231Z'
              fill='#26AA99'
            />
            <path
              d='M12.0379 0.56362L10.5835 5.88835H3.00415L3.18532 5.24068H5.13243C5.31609 5.24036 5.49603 5.18922 5.65206 5.093C5.8081 4.99678 5.93406 4.85927 6.01583 4.69592C6.09759 4.53256 6.13192 4.34981 6.11496 4.16815C6.09801 3.9865 6.03044 3.81313 5.91984 3.66749C5.82815 3.54625 5.70921 3.44797 5.5725 3.3805C5.43578 3.31303 5.28509 3.27823 5.13243 3.27889H3.7159L3.8921 2.63319H7.84803C8.06282 2.632 8.27146 2.56183 8.4428 2.43316C8.61414 2.30449 8.73898 2.12422 8.79869 1.91928C8.83951 1.77361 8.84587 1.62054 8.81729 1.47203C8.7887 1.32352 8.72593 1.18358 8.63389 1.06315C8.54185 0.942722 8.42303 0.845056 8.28671 0.777785C8.15039 0.710514 8.00025 0.675458 7.84803 0.675356H4.42765L4.45851 0.56362C4.49837 0.413049 4.58379 0.278259 4.70325 0.177463C4.8227 0.0766669 4.97043 0.0147227 5.12646 0L11.6726 0C11.9672 0.0148321 12.1295 0.265989 12.0379 0.56362Z'
              fill='#26AA99'
            />
            <path
              d='M15.2303 4.81544L14.1084 2.75872C14.0599 2.67496 13.9891 2.60611 13.9037 2.55971C13.8184 2.51332 13.7218 2.49117 13.6246 2.4957H12.1444L11.0494 6.54387H1.69212C1.64048 6.54704 1.5911 6.56605 1.5508 6.59829C1.51051 6.63053 1.48128 6.67439 1.46715 6.72384L1.28498 7.39623C1.27621 7.4161 1.27257 7.43783 1.27438 7.45946C1.27619 7.48108 1.2834 7.50192 1.29536 7.52008C1.30732 7.53824 1.32364 7.55315 1.34286 7.56346C1.36208 7.57378 1.38359 7.57917 1.40543 7.57916H2.59998L2.48152 8.00929C2.4663 8.05012 2.46153 8.09406 2.46762 8.13718C2.47372 8.18029 2.4905 8.22123 2.51645 8.25632C2.5424 8.29141 2.57671 8.31955 2.61631 8.33822C2.65591 8.35688 2.69955 8.3655 2.74332 8.36328H3.87117C4.20764 7.47929 5.18119 6.84052 6.04624 6.93742C6.7789 7.02048 7.2159 7.61376 7.09645 8.36724H9.89368C10.2301 7.48324 11.2037 6.84447 12.0677 6.94137C12.8014 7.02048 13.2394 7.61376 13.118 8.36724H14.0358C14.1394 8.36192 14.2388 8.32456 14.32 8.26038C14.4012 8.1962 14.4602 8.10841 14.4887 8.00929L15.2612 5.14669C15.2936 5.03638 15.2825 4.91797 15.2303 4.81544Z'
              fill='#26AA99'
            />
            <path
              d='M8.17512 1.74831C8.15496 1.81917 8.11207 1.88156 8.05296 1.926C7.99385 1.97044 7.92175 1.9945 7.84762 1.99452H2.56573C2.53957 1.99457 2.51377 1.98852 2.49039 1.97686C2.46701 1.9652 2.44671 1.94825 2.43112 1.92738C2.41553 1.90651 2.40509 1.8823 2.40064 1.8567C2.39618 1.83109 2.39783 1.80481 2.40546 1.77995L2.50501 1.43486C2.51461 1.39994 2.5355 1.36912 2.56446 1.34714C2.59341 1.32517 2.62884 1.31325 2.66528 1.31323H7.84762C7.90071 1.31323 7.95307 1.32553 8.00054 1.34915C8.04801 1.37277 8.08928 1.40706 8.12107 1.44929C8.15286 1.49153 8.1743 1.54055 8.18368 1.59245C8.19307 1.64436 8.19014 1.69772 8.17512 1.74831Z'
              fill='#26AA99'
            />
            <path
              d='M0.00643111 4.39127L0.105977 4.04617C0.115567 4.01152 0.136344 3.98095 0.165116 3.95915C0.193889 3.93736 0.229067 3.92555 0.265249 3.92554H5.13302C5.22332 3.92554 5.30991 3.96117 5.37375 4.02459C5.4376 4.088 5.47347 4.17402 5.47347 4.26371C5.47347 4.3534 5.4376 4.43941 5.37375 4.50283C5.30991 4.56625 5.22332 4.60188 5.13302 4.60188H0.166699C0.140919 4.60195 0.115476 4.59607 0.0923796 4.58469C0.0692836 4.57331 0.049168 4.55675 0.0336227 4.53632C0.0180774 4.51589 0.00752824 4.49215 0.00280903 4.46698C-0.00191019 4.4418 -0.00067016 4.41588 0.00643111 4.39127Z'
              fill='#26AA99'
            />
          </svg>
          <span className='text-[#26aa99] font-normal whitespace-nowrap text-[0.625rem] truncate'>1 - 2 ngày</span>
        </div>
        <div className='h-[0.625rem] border-l'></div>
        <div className='flex items-center font-extralight text-[0.625rem] truncate'>
          <svg xmlns='http://www.w3.org/2000/svg' width={8} height={10} viewBox='0 0 8 10' fill='none'>
            <path
              d='M4.36872 8.81893C4.28492 8.93416 4.15084 9 4 9C3.84916 9 3.71508 8.93416 3.63128 8.81893C2.82682 7.76543 1 5.23045 1 3.9465C1 2.31687 2.34078 1 4 1C5.65922 1 7 2.31687 7 3.9465C7 5.21399 5.17318 7.76543 4.36872 8.81893Z'
              stroke='black'
              strokeOpacity='54%'
              strokeWidth='0.8'
            />
            <path
              d='M5 4C5 3.44186 4.55814 3 4 3C3.44186 3 3 3.44186 3 4C3 4.55814 3.44186 5 4 5C4.55814 5 5 4.55814 5 4Z'
              fill='black'
              fillOpacity='50%'
            />
          </svg>
          <span className='ml-[3px] align-middle text-[#0000008a] truncate'>Hà Nội</span>
        </div>
      </div>
    </Product>
  )
}
