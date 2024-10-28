import Product from '@/components/Product'
import { Product as ProductType } from '@/types/product.type'
import { formatNumberToSocialStyle } from '@/utils/utils'
import { To } from 'react-router-dom'

interface Props {
  product: ProductType
  to: To
}

export default function ProductRelatedItem({ product, to }: Props) {
  return (
    <Product product={product} to={to} applyRelatedProduct={true}>
      <div className='flex h-5 items-center space-x-1 text-[.625rem] mb-2 mt-1'>
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
      <div className='flex items-center justify-between font-medium gap-1 mt-auto'>
        <div className='flex items-baseline flex-shrink text-orange truncate'>
          <span className='mr-px text-xs'>₫</span>
          <span className='text-base truncate'>{product.price.toLocaleString('vi-VN')}</span>
        </div>
        <div className='text-xs truncate'>
          <span>{`Đã bán ${formatNumberToSocialStyle(product.sold)}`}</span>
        </div>
      </div>
    </Product>
  )
}
