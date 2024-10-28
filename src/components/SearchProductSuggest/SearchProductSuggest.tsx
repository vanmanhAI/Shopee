import path from '@/constants/path'
import useQueryConfig from '@/hooks/useQueryConfig'
import { Product } from '@/types/product.type'
import { omit } from 'lodash'
import { HTMLAttributes, useCallback } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import SelectOption from '@/components/Select/components/SelectOption/SelectOption'

interface SearchProductsProps extends HTMLAttributes<HTMLDivElement> {
  query?: string
  searchValue: string
  searchProductsResult: Product[] | undefined
}

export default function SearchProductSuggest({
  query = '',
  searchProductsResult,
  searchValue,
  ...props
}: SearchProductsProps) {
  const queryConfig = useQueryConfig()
  const getProductName = useCallback(
    (productName: string) => {
      const queryLength = query.length
      const productNameLength = productName.length
      const productNameLowerCase = productName.toLowerCase()
      const queryLowerCase = query.toLowerCase()

      const queryIndex = productNameLowerCase.indexOf(queryLowerCase)
      if (queryIndex === -1) return productName

      const start = queryIndex
      let end = queryIndex + queryLength

      if (end > productNameLength) end = productNameLength

      let count = 0
      for (let i = end; i < productNameLength; i++) {
        if (productName[i] === ' ') {
          count++
          if (count === 4) {
            end = i
            break
          }
        }
      }

      return productName.slice(start, end)
    },
    [query]
  )

  if (!query.trim()) return null

  return (
    <div
      className='bg-white shadow-md overflow-hidden border-none outline-none rounded-sm  flex flex-col focus-within:border-none focus:border-none focus-within:outline-none focus:outline-none'
      {...props}
    >
      <SelectOption asChild={true} classNameActive='bg-[#fafafa]' classNameSelected='bg-[#fafafa]'>
        <Link
          to='#'
          className='flex items-center text-black/85 truncate text-sm leading-4 no-underline p-[0.625rem] focus-visible:border-none focus-within:outline-none'
        >
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            strokeWidth={0}
            className='text-orange size-4 mr-2 fill-current'
          >
            <path d='m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z' />
          </svg>
          <div className='truncate'>{`Tìm Shop "${searchValue.trim()}"`}</div>
        </Link>
      </SelectOption>
      {searchProductsResult &&
        searchProductsResult
          .map((product) => {
            const suggestProductName = getProductName(product.name)
            return (
              <SelectOption
                classNameActive='bg-[#fafafa]'
                classNameSelected='bg-[#fafafa]'
                key={product._id}
                asChild={true}
              >
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams(
                      omit({ ...queryConfig, name: suggestProductName }, [
                        'sort_by',
                        'price_min',
                        'price_max',
                        'rating_filter',
                        'category'
                      ])
                    ).toString()
                  }}
                  className='flex items-center text-black/85 truncate text-sm leading-4 no-underline p-[0.625rem] focus-visible:border-none focus-within:outline-none'
                >
                  <span className='truncate'>{suggestProductName}</span>
                </Link>
              </SelectOption>
            )
          })
          .slice(0, 10)}
    </div>
  )
}
