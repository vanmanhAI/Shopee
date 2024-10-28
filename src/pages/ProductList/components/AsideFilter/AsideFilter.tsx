import { Dictionary, omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import path from '@/constants/path'
import { Category } from '@/types/category.type'
import { joiResolver } from '@hookform/resolvers/joi'
import { ProductListConfig } from '@/types/product.type'
import { schemaProductsFilter } from '@/utils/rules'
import RatingStars from '@/components/RatingStars'
import { useEffect } from 'react'
import InputV2 from '@/components/InputV2'

interface Props {
  categories: Category[]
  queryConfig: Dictionary<string>
  handleRemoveAll: () => void
}

export interface ProductsFilterFormData {
  price_min: string
  price_max: string
}

export const AsideFilter = ({ categories, queryConfig, handleRemoveAll }: Props) => {
  const { category, price_min, price_max } = queryConfig as ProductListConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<ProductsFilterFormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: joiResolver(schemaProductsFilter),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    clearErrors()
    setValue('price_min', price_min || '')
    setValue('price_max', price_max || '')
  }, [queryConfig, clearErrors, setValue, price_min, price_max])

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        limit: '20',
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = e.target
    if (!checked) {
      navigate({
        pathname: path.home,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              page: '1',
              limit: '20'
            },
            ['category']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          page: '1',
          limit: '20',
          category: id
        }).toString()
      })
    }
  }

  return (
    <div className='flex-shrink-0'>
      <div className='flex items-center'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='text-[0.75rem] mr-[0.625rem] stroke-current size-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        <h2 className='font-bold uppercase text-base text-[#000c]'>Bộ lọc tìm kiếm</h2>
      </div>
      <fieldset className='border-b border-[#00000017] mt-5 pb-5'>
        <legend className='text-sm text-[#000000cc] mb-[0.625rem]'>Theo Danh Mục</legend>
        {categories.map((categoryItem) => (
          <div className='py-2' key={categoryItem._id}>
            <label className='flex items-center justify-start flex-wrap'>
              <div className='relative mr-[10px] flex'>
                <input
                  type='checkbox'
                  onChange={(e) => handleCheckboxChange(e, categoryItem._id)}
                  name={categoryItem._id}
                  checked={category === categoryItem._id}
                  className='border select=none rounded-sm shadow-[inset_0_1px_0_0_rgba(0,0,0,.05)] border-[rgba(0,0,0,.26)] appearance-none bg-white cursor-pointer size-[.8125rem]'
                />
                {category === categoryItem._id && (
                  <svg
                    enableBackground='new 0 0 12 12'
                    viewBox='0 0 12 12'
                    x={0}
                    y={0}
                    className='size-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current text-[.5rem] text-orange'
                  >
                    <g>
                      <path d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z' />
                    </g>
                  </svg>
                )}
              </div>
              <span className='text-sm line-clamp-3 break-words select-none capitalize'>{categoryItem.name}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <form className='border-b border-[#00000017] mt-5 pb-5' onSubmit={onSubmit}>
        <div className='text-sm text-[#000000cc]'>Khoảng giá</div>
        <div className='flex justify-between items-center mt-5 mb-[0.625rem]'>
          <InputV2
            control={control}
            name='price_min'
            classNameInput='text-xs w-20 h-[1.875rem] pl-[.3125rem] outline-none shadow-[inset_0_1px_0_0_rgba(0,0,0,.05)] rounded-sm border border-[#00000042] bg-white'
            type='number'
            placeholder='₫ TỪ'
            onChange={() => {
              clearErrors()
            }}
          />
          <div className='bg-[#bdbdbd] h-[0.0625rem] mx-[0.625rem] flex-1'></div>
          <InputV2
            control={control}
            name='price_max'
            classNameInput='text-xs w-20 h-[1.875rem] pl-[.3125rem] outline-none shadow-[inset_0_1px_0_0_rgba(0,0,0,.05)] rounded-sm border border-[#00000042] bg-white'
            type='number'
            placeholder='₫ ĐẾN'
            onChange={() => {
              clearErrors()
            }}
          />
        </div>
        {errors.price_min && (
          <div className='text-[#ff424f] text-xs py-[0.625rem] text-center w-full'>{errors.price_min.message}</div>
        )}
        <Button
          type='submit'
          className='mt-5 w-full text-sm bg-orange text-white h-[1.875rem] rounded-sm uppercase font-normal shadow-sm flex items-center justify-center px-[0.375rem] py-[0.0625rem]'
        >
          Áp dụng
        </Button>
      </form>
      <RatingStars queryConfig={queryConfig} stopLines={5} />
      <Button
        onClick={handleRemoveAll}
        className='mt-5 w-full text-sm bg-orange text-white h-[1.875rem] rounded-sm uppercase font-normal shadow-sm flex items-center justify-center px-[0.375rem] py-[0.0625rem]'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
