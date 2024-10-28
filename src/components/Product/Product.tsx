import { Link, To } from 'react-router-dom'
import Button from '@/components/Button'
import { Product as ProductType } from '@/types/product.type'
import { scrollToTop } from '@/utils/utils'
import classNames from 'classnames'

interface Props {
  product: ProductType
  to: To
  isShowRelatedBtn?: boolean
  isShowBorderHover?: boolean
  children: React.ReactNode
  applyRelatedProduct?: boolean
}

export const Product = ({
  children,
  product,
  to,
  isShowRelatedBtn = false,
  isShowBorderHover = false,
  applyRelatedProduct = false
}: Props) => {
  return (
    <Link
      onClick={scrollToTop}
      to={to}
      className={classNames(
        'flex h-full flex-col relative border border-[#00000017] group z-1 hover:z-[2] hover:shadow-md duration-100 hover:-translate-y-px active:translate-y-0',
        {
          'hover:border-orange': isShowBorderHover
        }
      )}
    >
      <div className='w-full pt-[100%] flex-shrink-0 relative bg-no-repeat bg-center bg-[url("https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.35/pc/a6aac7ccbd908f1d6e29.svg")]'>
        <img
          className='absolute top-0 left-0 w-full h-full object-contain align-middle size-full'
          loading='lazy'
          src={product.image}
          alt={product.name}
        />
        <div className='absolute top-0 left-0 w-full h-full z-5'>
          <img
            className='size-full align-middle'
            src='https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lz6hkeebbl418d'
            alt=''
            loading='lazy'
          />
        </div>
        <div className='inline-block rounded-sm text-xs leading-3 z-6 bg-[#00000042] absolute right-1 bottom-1 px-1 py-0.5 text-white whitespace-nowrap'>
          Ad
        </div>
        {product.price_before_discount - product.price > 0 && applyRelatedProduct && (
          <div className='absolute top-0 text-xs leading-[0.875rem] text-orange right-0 font-medium py-[0.125rem] px-1 text-[0.625rem] bg-[#feeeea]'>
            -{Math.round(((product.price_before_discount - product.price) / product.price_before_discount) * 100)}%
          </div>
        )}
      </div>
      <div className='flex-grow p-2 flex flex-col bg-white'>
        <div className='text-sm break-words line-clamp-2 text-[#000000cc]'>
          <img className='mr-[0.125rem] h-[0.875rem] inline align-middle' src='@/assets/images/mall-icon.png' alt='' />
          {product.name}
        </div>
        {children}
      </div>
      {isShowRelatedBtn && (
        <Button className='absolute opacity-0 group-hover:opacity-100 duration-100 z-[-1] bg-orange top-full -inset-x-[0.0625rem] text-white text-sm h-[1.875rem] text-center leading-[1.875rem] rounded-bl-sm rounded-br-sm'>
          Tìm sản phẩm tương tự
        </Button>
      )}
    </Link>
  )
}
