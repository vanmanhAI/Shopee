import path from '@/constants/path'
import { scrollToTop } from '@/utils/utils'
import classNames from 'classnames'
import { Dictionary, omit } from 'lodash'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

interface Props {
  queryConfig: Dictionary<string>
  stopLines?: number
}

export const RatingStars = ({ queryConfig, stopLines = 6 }: Props) => {
  const { rating_filter } = queryConfig

  const stopLinesIdInitial = rating_filter === '1' ? 6 : stopLines - 1
  const [lineStopId, setLineStopId] = useState<number>(stopLinesIdInitial)
  const navigate = useNavigate()

  const handleRatingClick = (rating: number) => {
    if (rating_filter === rating.toString()) {
      navigate({
        pathname: path.home,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              page: '1',
              limit: '20'
            },
            ['rating_filter']
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
          rating_filter: rating.toString()
        }).toString()
      })
    }
    scrollToTop()
  }

  const handleExpandClick = () => {
    setLineStopId(6)
  }

  return (
    <fieldset className='border-b border-[#00000017] mt-5 pb-5 text-sm text-[#000000cc]'>
      <legend className='mb-[0.625rem]'>Đánh giá</legend>
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < lineStopId) {
          return (
            <div
              className={classNames(
                'flex items-center font-medium gap-1 h-[1.5625rem] whitespace-nowrap px-3 w-full leading-[1.05rem] hover:cursor-pointer rounded-full',
                {
                  'mt-[0.3125rem]': index !== 0,
                  'bg-[#ebebeb]': rating_filter === (5 - index).toString()
                }
              )}
              onClick={() => handleRatingClick(5 - index)}
              key={index}
              aria-hidden='true'
            >
              {Array.from({ length: 5 }).map((_, starIndex) => {
                if (starIndex < 5 - index) {
                  return (
                    <svg viewBox='0 0 9.5 8' className='text-[#ffce3d] stroke-current size-[0.875rem]' key={starIndex}>
                      <defs>
                        <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                          <stop offset={0} stopColor='#ffca11' />
                          <stop offset={1} stopColor='#ffad27' />
                        </linearGradient>
                        <polygon
                          id='ratingStar'
                          points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                        />
                      </defs>
                      <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                        <g transform='translate(-876 -1270)'>
                          <g transform='translate(155 992)'>
                            <g transform='translate(600 29)'>
                              <g transform='translate(10 239)'>
                                <g transform='translate(101 10)'>
                                  <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )
                }
                return (
                  <svg viewBox='0 0 30 30' className='text-[#ffce3d] stroke-current size-[0.875rem]' key={starIndex}>
                    <defs>
                      <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                        <stop offset='0%' stopColor='#FFD211' />
                        <stop offset='100%' stopColor='#FFAD27' />
                      </linearGradient>
                    </defs>
                    <path
                      fill='none'
                      fillRule='evenodd'
                      stroke='url(#star__hollow)'
                      strokeWidth={2}
                      d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                    />
                  </svg>
                )
              })}
              {index !== 0 && <span>trở lên</span>}
            </div>
          )
        } else if (index === lineStopId) {
          return (
            <button
              key={index}
              onClick={handleExpandClick}
              className='cursor-pointer flex items-center justify-center py-2 pl-5 pr-[0.625rem] font-medium border-0 text-sm leading-[1.05rem] gap-[0.625rem]'
            >
              Thêm
              <svg
                enableBackground='new 0 0 11 11'
                viewBox='0 0 12 12'
                x={0}
                y={0}
                className='text-[.4375rem] fill-current size-[0.4375rem]'
              >
                <g>
                  <path d='m11 2.5c0 .1 0 .2-.1.3l-5 6c-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-6c-.2-.2-.1-.5.1-.7s.5-.1.7.1l4.6 5.5 4.6-5.5c.2-.2.5-.2.7-.1.1.1.2.3.2.4z' />
                </g>
              </svg>
            </button>
          )
        } else {
          return null
        }
      })}
    </fieldset>
  )
}
