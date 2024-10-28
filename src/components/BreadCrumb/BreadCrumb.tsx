import path from '@/constants/path'
import { Link } from 'react-router-dom'

interface Props {
  productName: string
}

export const BreadCrumb = ({ productName }: Props) => {
  return (
    <div className='flex items-center text-[0.8125rem] gap-[5px] truncate h-4'>
      <Link to={path.home} className='text-[#05a]'>
        Shopee
      </Link>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-3'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
      </svg>
      <span className='truncate'>{productName}</span>
    </div>
  )
}
