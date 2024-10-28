import classNames from 'classnames'
import { Dictionary, omit } from 'lodash'
import { useRef } from 'react'
import { createSearchParams, useNavigate, Link } from 'react-router-dom'
import Popover from '@/components/Popover'
import path from '@/constants/path'
import { orderBy, sortBy } from '@/constants/product'
import { ProductListConfig } from '@/types/product.type'

interface Props {
  queryConfig: Dictionary<string>
  pageSize: number
}

export const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const page = +queryConfig.page
  const navigate = useNavigate()
  const initialOrderCost = useRef<{
    defaultOrder: string
    asc: string
    desc: string
  }>({
    defaultOrder: 'Giá',
    [orderBy.asc]: 'Giá: Thấp đến Cao',
    [orderBy.desc]: 'Giá: Cao đến Thấp'
  })
  const { sort_by = sortBy.createdAt, order } = queryConfig as ProductListConfig

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  const disabledNextLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page === pageSize) {
      e.preventDefault()
    }
  }

  const disablePrevLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page === 1) {
      e.preventDefault()
    }
  }

  return (
    <div className='bg-[#ededed] text-sm flex flex-wrap px-5 py-[0.8125rem] justify-between rounded-sm gap-[.625rem]'>
      <div className='flex items-center gap-[.625rem] items-str'>
        <span className='text-[#555] mr-[0.3125rem]'>Sắp xếp theo</span>
        <button
          onClick={() => handleSort(sortBy.createdAt)}
          className={classNames(
            'flex items-center justify-center px-[0.9375rem] h-[2.125rem] rounded-sm  shadow-sm capitalize',
            {
              'bg-orange text-white': isActiveSortBy(sortBy.createdAt),
              'text-[#000000cc] bg-white': !isActiveSortBy(sortBy.createdAt)
            }
          )}
        >
          <span>Mới nhất</span>
        </button>
        <button
          onClick={() => handleSort(sortBy.view)}
          className={classNames(
            'flex items-center justify-center px-[0.9375rem] h-[2.125rem] rounded-sm shadow-sm capitalize ',
            {
              'bg-orange text-white': isActiveSortBy(sortBy.view),
              'text-[#000000cc] bg-white': !isActiveSortBy(sortBy.view)
            }
          )}
        >
          <span>Liên quan</span>
        </button>

        <button
          onClick={() => handleSort(sortBy.sold)}
          className={classNames(
            'flex items-center justify-center px-[0.9375rem] h-[2.125rem] rounded-sm shadow-sm capitalize',
            {
              'bg-orange text-white': isActiveSortBy(sortBy.sold),
              'text-[#000000cc] bg-white': !isActiveSortBy(sortBy.sold)
            }
          )}
        >
          <span>Bán chạy</span>
        </button>
        <Popover
          as='button'
          applyAnimation={false}
          renderPopover={
            <div className='flex flex-col py-[10px] rounded-sm overflow-y-auto bg-white min-w-[12.5rem] shadow-md'>
              <div
                onClick={() => handlePriceOrder(orderBy.asc)}
                className='flex items-center justify-between cursor-pointer pl-[0.9375rem] pr-3 text-[#222] hover:text-orange h-[2.125rem] text-sm'
              >
                <span>{initialOrderCost.current.asc}</span>
                {order === orderBy.asc && (
                  <svg
                    enableBackground='new 0 0 12 12'
                    viewBox='0 0 12 12'
                    x={0}
                    y={0}
                    className='w-[.6875rem] fill-orange h-[0.875rem]'
                  >
                    <g>
                      <path d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z' />
                    </g>
                  </svg>
                )}
              </div>
              <div
                onClick={() => handlePriceOrder(orderBy.desc)}
                className='flex items-center justify-between cursor-pointer pl-[0.9375rem] pr-3 text-[#222] hover:text-orange h-[2.125rem] text-sm'
              >
                <span>{initialOrderCost.current.desc}</span>
                {order === orderBy.desc && (
                  <svg
                    enableBackground='new 0 0 12 12'
                    viewBox='0 0 12 12'
                    x={0}
                    y={0}
                    className='w-[.6875rem] fill-orange h-[0.875rem]'
                  >
                    <g>
                      <path d='m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z' />
                    </g>
                  </svg>
                )}
              </div>
            </div>
          }
          className='bg-white h-[2.125rem] rounded-sm flex items-center justify-between pl-3 pr-[0.375rem] shadow-sm min-w-[12.5rem] border-none outline-none '
        >
          <span className={`${order !== undefined && 'text-orange'}`}>
            {order ? initialOrderCost.current[order] : initialOrderCost.current.defaultOrder}
          </span>
          <svg viewBox='0 0 10 6' className='fill-[#555] mr-3 w-3'>
            <path
              d='M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z'
              fillRule='nonzero'
            />
          </svg>
        </Popover>
      </div>
      <div className='flex items-center justify-end gap-5'>
        <div>
          <span className='text-orange'>{page}</span>/<span>{pageSize}</span>
        </div>
        <div className='h-full flex justify-end'>
          <Link
            onClick={disablePrevLink}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: (page - 1).toString()
              }).toString()
            }}
            className={classNames(
              'px-3 border border-[#00000017] flex items-center justify-center rounded-tl-sm rounded-bl-sm duration-150 h-[2.125rem]',
              {
                'bg-white/60 text-[#ccc] pointer-events-none': page <= 1,
                'bg-transparent hover:bg-[#fdfdfd]': page > 1
              }
            )}
          >
            <svg viewBox='0 0 7 11' className='size-[.625rem] fill-current'>
              <path
                d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                fillRule='nonzero'
              />
            </svg>
          </Link>
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: (page + 1).toString()
              }).toString()
            }}
            className={classNames(
              'px-3 border border-[#00000017] flex items-center justify-center rounded-tr-sm rounded-br-sm duration-150 h-[2.125rem]',
              {
                'bg-white/60 text-[#ccc] pointer-events-none': page >= pageSize,
                'bg-transparent hover:bg-[#fdfdfd]': page < pageSize
              }
            )}
            onClick={disabledNextLink}
          >
            <svg viewBox='0 0 7 11' className='size-[.625rem] fill-current'>
              <path
                d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                fillRule='nonzero'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
