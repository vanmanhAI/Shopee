import SearchProductSuggest from '../SearchProductSuggest'
import useDebounce from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from '@/apis/product.api'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { schemaSearch } from '@/utils/rules'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '@/constants/path'
import { omit } from 'lodash'
import useQueryConfig from '@/hooks/useQueryConfig'
import { ProductListConfig } from '@/types/product.type'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@/components/Select/context/select.context'
import SelectTrigger from '@/components/Select/components/SelectTrigger/SelectTrigger'
import SelectContent from '@/components/Select/components/SelectContent/SelectContent'
import classNames from 'classnames'

interface Props {
  placeHolder: string
  classNameForm?: string
  classNameSearchButton?: string
}

export interface SearchProductFormData {
  name: string
}

export default function SearchProduct({
  placeHolder,
  classNameForm = 'bg-white h-10 rounded-sm p-[0.1875rem] flex',
  classNameSearchButton = 'rounded-sm py-2 px-[1.375rem]'
}: Props) {
  const queryConfig = useQueryConfig() as ProductListConfig
  const [isShowSearchSuggest, setIsShowSearchSuggest] = useState(false)
  const [isFocusButtonSearch, setIsFocusButtonSearch] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const searchButtonRef = useRef<HTMLButtonElement | null>(null)

  const { register, handleSubmit, watch, setValue } = useForm<SearchProductFormData>({
    defaultValues: {
      name: ''
    },
    resolver: joiResolver(schemaSearch)
  })

  const handleFocusInputSearch = () => {
    setIsShowSearchSuggest(true)
  }

  const handleBlurInputSearch = () => {
    setIsShowSearchSuggest(false)
  }

  const handleFocusButtonSearch = () => {
    setIsFocusButtonSearch(true)
  }

  const handleBlurButtonSearch = () => {
    setIsFocusButtonSearch(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      searchButtonRef.current?.focus()
    }
  }

  const { ref, ...rest } = register('name')

  const searchValue = watch('name')

  const debouncedValue = useDebounce({ value: searchValue.trim(), delay: 300 })
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_PRODUCTS, debouncedValue],
    queryFn: () => searchProducts(debouncedValue),
    enabled: Boolean(debouncedValue)
  })

  const searchProductsResult = data?.data.data.products

  const onSubmitSearch = handleSubmit(() => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({ ...queryConfig, name: searchValue.trim() }, [
          'sort_by',
          'price_min',
          'price_max',
          'rating_filter',
          'category'
        ])
      ).toString()
    })
  })

  useEffect(() => {
    setValue('name', queryConfig.name || '')
  }, [queryConfig.name, setValue])

  useEffect(() => {
    if (queryConfig.name && inputRef.current) {
      inputRef.current.blur()
    }
  }, [queryConfig.name])

  return (
    <form onSubmit={onSubmitSearch} className={classNameForm}>
      <div onFocus={handleFocusInputSearch} onBlur={handleBlurInputSearch} className='relative flex flex-1'>
        <Select
          open={isShowSearchSuggest}
          onOpenChange={setIsShowSearchSuggest}
          offsetOption={{ mainAxis: 8, crossAxis: -3 }}
          isSameLengthAsReference={true}
          minusFloatingWidth={20}
          refPressEvent='focus'
          mode='search'
          zIndex={15}
        >
          <SelectTrigger asChild={true}>
            <div
              className={classNames('relative flex flex-1 leading-tight px-[0.625rem] text-sm', {
                'before:absolute before:rounded-sm before:z-[1] before:pointer-events-none before:p-[0.1875rem] before:-top-1 before:-left-1 before:-bottom-1 before:right-[0.4375rem] before:-m-[0.1875rem] before:outline before:outline-2 before:outline-black/85 z-[1]':
                  isShowSearchSuggest,
                '': !isShowSearchSuggest
              })}
            >
              <input
                type='text'
                placeholder={placeHolder}
                className='text-[#000000cc] flex-1 flex items-center leading-normal border-none outline-none bg-transparent'
                {...rest}
                ref={(e) => {
                  ref(e)
                  inputRef.current = e
                }}
                autoComplete='off'
                aria-autocomplete='list'
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SearchProductSuggest
              onKeyDown={handleKeyDown}
              searchValue={searchValue}
              query={debouncedValue}
              searchProductsResult={searchProductsResult}
            />
          </SelectContent>
        </Select>
      </div>
      <button
        ref={searchButtonRef}
        onFocus={handleFocusButtonSearch}
        onBlur={handleBlurButtonSearch}
        className={classNames(
          `relative flex justify-center items-center flex-shrink-0 hover:opacity-90 border-none outline-none bg-orange ${classNameSearchButton}`,
          {
            'before:absolute before:rounded-sm before:z-[1] before:pointer-events-none before:p-[0.1875rem] before:-top-1 before:-left-1 before:-bottom-1 before:-right-0.5 before:-m-[0.1875rem] before:outline before:outline-2 before:outline-black/85':
              isFocusButtonSearch,
            '': !isFocusButtonSearch
          }
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='white'
          className='size-[1.1875rem]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>
    </form>
  )
}
