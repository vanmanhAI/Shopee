import classNames from 'classnames'
import { Dictionary } from 'lodash'
import { createSearchParams, Link } from 'react-router-dom'
import path from '@/constants/path'
import { scrollToTop } from '@/utils/utils'
import { HTMLProps, useCallback } from 'react'

interface Props {
  queryConfig: Dictionary<string>
  pageSize: number
  setTargetPage?: React.Dispatch<React.SetStateAction<string>>
  toTopPage?: boolean
  classNamePageNumber?: string
  classNameTextColor?: string
  classNameArrowPage?: string
  classNameArrowInside?: string
  specialPageNumber?: number
  specialRange?: number
}

const RANGE = 2
const RANGE_FIRST = 4

export const Pagination = ({
  queryConfig,
  pageSize,
  setTargetPage,
  toTopPage = true,
  className = 'mt-10 mb-[3.75rem] text-sm text-[#0006] gap-[1.875rem]',
  classNamePageNumber = 'h-[1.875rem] min-w-10 text-xl hover:text-orange rounded-sm',
  classNameArrowPage = 'h-[1.875rem] min-w-10 font-light bg-transparent',
  classNameTextColor = 'text-[#0006]',
  classNameArrowInside = 'align-middle size-[0.875rem] fill-current',
  specialPageNumber,
  specialRange = 4
}: Props & HTMLProps<HTMLDivElement>) => {
  const page = +queryConfig.page

  const disabledNextLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page === pageSize) {
      e.preventDefault()
    } else {
      if (setTargetPage) {
        e.preventDefault()
        setTargetPage((page + 1).toString())
      }
      if (toTopPage) scrollToTop()
    }
  }

  const disablePrevLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page === 1) {
      e.preventDefault()
    } else {
      if (setTargetPage) {
        e.preventDefault()
        setTargetPage((page - 1).toString())
      }
      if (toTopPage) scrollToTop()
    }
  }

  const renderPagination = useCallback(() => {
    const isInRange = (pageNumber: number) => {
      const range = specialPageNumber && page === specialPageNumber ? specialRange : RANGE
      return Math.abs(page - pageNumber) <= range
    }

    const isInRangeFirst = (pageNumber: number) => {
      const range = Math.abs(1 - page) <= RANGE_FIRST ? RANGE_FIRST : 1
      return Math.abs(1 - pageNumber) <= range
    }

    const isInRangeLast = (pageNumber: number) => {
      const range = Math.abs(page - pageSize) <= 1 ? RANGE_FIRST : -1
      return Math.abs(pageSize - pageNumber) <= range
    }

    const isLeftDots = (pageNumber: number) => pageNumber - page < 0
    const isRightDots = (pageNumber: number) => pageNumber - page > 0

    let hasDotsLeft = false
    let hasDotsRight = false

    const handleClickPageNumber = (pageNumber: number) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (setTargetPage) {
        e.preventDefault()
        setTargetPage(pageNumber.toString())
      }
      if (toTopPage) scrollToTop()
    }

    return Array.from({ length: pageSize }, (_, index) => {
      const pageNumber = index + 1
      const isVisible = isInRange(pageNumber) || isInRangeFirst(pageNumber) || isInRangeLast(pageNumber)

      if (!isVisible) {
        if (isLeftDots(pageNumber) && !hasDotsLeft) {
          hasDotsLeft = true
          return (
            <Link
              key={pageNumber}
              to='#'
              className={`flex items-center justify-center font-light transition bg-transparent cursor-pointer ${classNamePageNumber}`}
            >
              ...
            </Link>
          )
        } else if (isRightDots(pageNumber) && !hasDotsRight) {
          hasDotsRight = true
          return (
            <Link
              key={pageNumber}
              to='#'
              className={`flex items-center justify-center font-light transition bg-transparent cursor-pointer ${classNamePageNumber}`}
            >
              ...
            </Link>
          )
        } else {
          return null
        }
      } else {
        return (
          <Link
            key={pageNumber}
            onClick={handleClickPageNumber(pageNumber)}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={`flex items-center justify-center font-light transition cursor-pointer ${classNamePageNumber} ${
              pageNumber === page ? 'bg-orange text-white' : `bg-transparent ${classNameTextColor}`
            }`}
          >
            {pageNumber}
          </Link>
        )
      }
    })
  }, [
    page,
    pageSize,
    queryConfig,
    setTargetPage,
    toTopPage,
    classNamePageNumber,
    classNameTextColor,
    specialPageNumber,
    specialRange
  ])

  return (
    <nav className={`flex justify-center items-center ${className}`}>
      <Link
        onClick={disablePrevLink}
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: (page - 1).toString()
          }).toString()
        }}
        className={classNames(`flex items-center justify-center transition ${classNameArrowPage}`, {
          'cursor-auto': page === 1
        })}
      >
        <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className={classNameArrowInside}>
          <g>
            <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
          </g>
        </svg>
      </Link>
      {renderPagination()}
      <Link
        onClick={disabledNextLink}
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: (page + 1).toString()
          }).toString()
        }}
        className={classNames(`flex items-center justify-center transition ${classNameArrowPage}`, {
          'cursor-auto': page === pageSize
        })}
      >
        <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className={classNameArrowInside}>
          <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
        </svg>
      </Link>
    </nav>
  )
}
