import { buyProducts, deletePurchase, getCart, updatePurchase } from '@/apis/purchase.apis'
import InputCheckbox from '@/components/InputCheckbox'
import { PURCHASE_STATUS } from '@/constants/purchase'
import { QUERY_KEYS } from '@/constants/queryKeys'
import {
  keepPreviousData,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  useSuspenseQuery
} from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import saleTagGroup from '@/assets/images/sale-tag-group.png'
import QuantityController from '@/components/QuantityController'
import { formatNumberToSocialStyle, genNameId } from '@/utils/utils'
import path from '@/constants/path'
import { scrollToTop } from '@/utils/utils'
import { ProductList, ProductListConfig } from '@/types/product.type'
import { getProducts } from '@/apis/product.api'
import Popover from '@/components/Popover'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { produce } from 'immer'
import Spinner from '@/components/Spinner'
import ProductLIstItem from '@/components/Product/components/ProductListItem'
import Pagination from '@/components/Pagination'
import { debounce, Dictionary, keyBy, uniq } from 'lodash'
import { Dialog } from '@/components/Dialog/context/dialog.context'
import DialogHeading from '@/components/Dialog/components/DialogHeading'
import DialogContent from '@/components/Dialog/components/DialogContent'
import DialogClose from '@/components/Dialog/components/DialogClose'
import DialogTrigger from '@/components/Dialog/components/DialogTrigger'
import noProductsDeletedSvg from '@/assets/images/no_products_deleted.svg'
import classNames from 'classnames'
import DialogDescription from '@/components/Dialog/components/DialogDescription'
import { AppContext } from '@/contexts/app.context'
import { AxiosResponse } from 'axios'
import { SuccessResponse } from '@/types/utils.type'
import ProductRelatedItem from '@/components/Product/components/ProductRelatedItem'
import { getCategoryIdsFromLS, setCategoryIdsToLS } from '@/utils/auth'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const [relatedProductsCurrId, setRelatedProductsCurrId] = useState<number | null>(null)
  const [targetPage, setTargetPage] = useState('1')
  const [showException, setShowException] = useState(false)
  const [aboveMax, setAboveMax] = useState<number | null>(null)
  const [showConfirmDeleteProducts, setShowConfirmDeleteProducts] = useState(false)
  const [showConfirmDeleteProduct, setShowConfirmDeleteProduct] = useState(false)
  const [showBuyNoProduct, setShowBuyNoProduct] = useState(false)
  const [purchaseConfirmDelete, setPurchaseConfirmDelete] = useState<{ nameProduct: string; purchaseId: string }>({
    nameProduct: '',
    purchaseId: ''
  })
  const inputNumberRef = useRef<HTMLInputElement>(null)
  const stickySectionRef = useRef<HTMLElement>(null)
  const queryClient = useQueryClient()

  const location = useLocation()
  const purchaseBuyNowId = (location.state as { purchaseId: string } | null)?.purchaseId

  const { data: cartData } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_CART, { status: PURCHASE_STATUS.IN_CART }],
    queryFn: () => getCart({ status: PURCHASE_STATUS.IN_CART })
  })
  const purchases = cartData.data.data

  const queryConfig: ProductListConfig = useMemo(
    () => ({
      page: targetPage,
      limit: '6',
      category: purchases[relatedProductsCurrId || 0]?.product.category._id
    }),
    [purchases, relatedProductsCurrId, targetPage]
  )
  const { data: relatedProductsData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS, queryConfig, relatedProductsCurrId],
    queryFn: () => getProducts(queryConfig),
    enabled: relatedProductsCurrId !== null,
    placeholderData: keepPreviousData
  })

  const relatedProducts = relatedProductsData?.data.data.products || []

  const categoryIds = getCategoryIdsFromLS()
  const relatedProductsQueries = useMemo(() => {
    return categoryIds.map((id) => {
      const queryConfig: ProductListConfig = {
        page: '1',
        limit: '6',
        category: id
      }
      return {
        queryKey: [QUERY_KEYS.GET_PRODUCTS, queryConfig],
        queryFn: () => getProducts(queryConfig),
        placeholderData: keepPreviousData
      }
    })
  }, [categoryIds])

  const relatedProductsResult = useQueries<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UseQueryOptions<AxiosResponse<SuccessResponse<ProductList>, any>>[]
  >({
    queries: relatedProductsQueries
  })

  const relatedProductsSuggestion = useMemo(() => {
    const productIds = purchases.map((purchase) => purchase.product._id)
    // Trộn tất cả các sản phẩm liên quan từ các danh mục khác nhau
    return relatedProductsResult
      .filter((result) => Boolean(result.data))
      .flatMap((result) => result.data?.data.data.products || [])
      .filter((product) => !productIds.includes(product._id))
  }, [relatedProductsResult, purchases])

  const updatePurchaseMutation = useMutation({
    mutationFn: updatePurchase
  })

  const buyProductsMutation = useMutation({
    mutationFn: buyProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CART]
      })
      history.replaceState(null, '')
    }
  })

  const deleteProductsMutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CART, { status: PURCHASE_STATUS.IN_CART }],
        refetchType: 'all'
      })
    }
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValue = useCallback(
    debounce(function ({
      productId,
      qtt,
      value,
      nameProductConfirmDelete,
      purchaseIdObj
    }: {
      productId: string
      value: number
      qtt: number
      nameProductConfirmDelete?: string
      purchaseIdObj: string
    }) {
      if (value > qtt) {
        value = qtt
        setAboveMax(qtt)
        setShowException(true)
      } else if (value < 1 && nameProductConfirmDelete) {
        value = 1
        setShowConfirmDeleteProduct(true)
        setPurchaseConfirmDelete({ nameProduct: nameProductConfirmDelete, purchaseId: purchaseIdObj })
      }

      updatePurchaseMutation.mutate(
        { product_id: productId, buy_count: value },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.GET_CART]
            })
          }
        }
      )
    }, 500),
    [updatePurchaseMutation.status === 'success']
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDisable = useCallback(
    debounce(function (purchaseId: number) {
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseId].disabled = true
        })
      )
    }, 500),
    [updatePurchaseMutation.status === 'success']
  )

  const handleQttChange = ({
    purchaseId,
    value,
    purchaseIdObj,
    nameProductConfirmDelete,
    onType = false
  }: {
    purchaseId: number
    value: number
    purchaseIdObj: string
    nameProductConfirmDelete?: string

    onType?: boolean
  }) => {
    const purchasesObjectById = keyBy(purchases, '_id')

    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseId].buy_count = value
      })
    )

    if (purchasesObjectById[purchaseIdObj].buy_count === value) return
    if (!onType) {
      const productId = extendedPurchases[purchaseId].product._id
      const qtt = extendedPurchases[purchaseId].product.quantity
      debounceDisable(purchaseId)
      debounceValue({ productId, value, qtt, nameProductConfirmDelete, purchaseIdObj })
    }
  }

  const handleClickProduct = () => {
    scrollToTop()
  }

  const [totalPriceBeforeDiscount_v, totalPrice_v, qttChecked_v] = extendedPurchases.reduce(
    (acc, curr) => {
      if (curr.checked) {
        acc[0] += curr.totalPriceBeforeDiscount
        acc[1] += curr.totalPrice
        acc[2]++
      }
      return acc
    },
    [0, 0, 0]
  )

  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])

  const handleChecked = (purchaseId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseId].checked = e.target.checked
      })
    )
  }

  const handleCheckedAll = () => {
    setExtendedPurchases((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }

  const handleClickRelatedProducts = (productId: number) => () => {
    setTargetPage('1')
    setExtendedPurchases(
      produce((draft) => {
        if (relatedProductsCurrId !== null && productId !== relatedProductsCurrId) {
          draft[relatedProductsCurrId].dotsRelatedProducts = false
        }
        if (productId === relatedProductsCurrId && draft[productId].dotsRelatedProducts) {
          draft[productId].dotsRelatedProducts = false
        } else {
          draft[productId].dotsRelatedProducts = true
        }
      })
    )
    setRelatedProductsCurrId(productId)
  }

  const handleDeleteProduct = ({
    purchaseId,
    isDelete,
    confirmDelete = true
  }: {
    purchaseId?: string
    isDelete?: boolean
    confirmDelete?: boolean
  }) => {
    if (confirmDelete) {
      if (purchaseId) {
        if (isDelete === true) {
          setExtendedPurchases((prev) => prev.filter((purchase) => purchase._id !== purchaseId))
          deleteProductsMutation.mutate({ purchase_ids: [purchaseId] })
          setShowConfirmDeleteProduct(false)
        } else if (isDelete === false) {
          setShowConfirmDeleteProduct(false)
        }
      } else {
        const checkedIds = extendedPurchases.filter((purchase) => purchase.checked).map((purchase) => purchase._id)
        setShowConfirmDeleteProducts(true)

        if (checkedIds.length > 0) {
          if (isDelete === true) {
            deleteProductsMutation.mutate({ purchase_ids: checkedIds })
            if (isAllChecked) scrollToTop()
            setShowConfirmDeleteProducts(false)
          } else if (isDelete === false) {
            setShowConfirmDeleteProducts(false)
          }
        }
      }
    } else {
      if (purchaseId) {
        deleteProductsMutation.mutate({ purchase_ids: [purchaseId] })
      }
    }
  }

  const handleBuyPurchases = () => {
    const checkedIds = extendedPurchases.filter((purchase) => purchase.checked).map((purchase) => purchase._id)

    if (checkedIds.length === 0) {
      console.log('showBuyNoProduct')

      setShowBuyNoProduct(true)
      return
    }

    const checkedPurchases: { product_id: string; buy_count: number }[] = extendedPurchases
      .filter((purchase) => purchase.checked)
      .map((purchase) => ({ product_id: purchase.product._id, buy_count: purchase.buy_count }))

    buyProductsMutation.mutate(checkedPurchases)
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    const beforeClass = [
      'before:block',
      'before:absolute',
      'before:h-5',
      'before:w-full',
      'before:-top-5',
      'before:left-0',
      'before:bg-[linear-gradient(transparent,rgba(0,0,0,.06))]'
    ]
    const handleScroll = () => {
      if (stickySectionRef.current) {
        const { bottom } = stickySectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (Math.floor(bottom) - viewportHeight === 0) {
          stickySectionRef.current.classList.add(...beforeClass)
        } else {
          stickySectionRef.current.classList.remove(...beforeClass)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')

      if (purchases.length === 0) return []
      return purchases.map((purchase) => {
        const totalPriceBeforeDiscount =
          purchase.price_before_discount > purchase.price
            ? purchase.price_before_discount * purchase.buy_count
            : purchase.price * purchase.buy_count
        const totalPricePerProduct = purchase.price * purchase.buy_count
        const totalPrice = purchase.buy_count * purchase.price
        return {
          ...purchase,
          totalPriceBeforeDiscount,
          totalPricePerProduct,
          totalPrice,
          disabled: false,
          checked: extendedPurchasesObject[purchase._id]?.checked || purchaseBuyNowId === purchase._id || false,
          dotsRelatedProducts: false
        }
      })
    })
  }, [purchases, purchaseBuyNowId, setExtendedPurchases])

  useEffect(() => {
    const categoryIds = getCategoryIdsFromLS()
    const newCategoryIds = uniq([...categoryIds, ...purchases.map((purchase) => purchase.product.category._id)])
    setCategoryIdsToLS(newCategoryIds)
  }, [purchases])

  useEffect(() => {
    if (showConfirmDeleteProducts && qttChecked_v === 0) {
      const timer = setTimeout(() => {
        setShowConfirmDeleteProducts(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showConfirmDeleteProducts, qttChecked_v])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className='bg-[#f5f5f5] flex flex-col'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='flex flex-col text-black/80 pt-5'>
              <div className='px-5 mb-3 bg-white rounded-[0.1875rem] shadow-[0_1px_1px_0_rgba(0,0,0,.05)] overflow-hidden text-sm h-[3.4375rem] flex items-center capitalize'>
                <InputCheckbox checked={isAllChecked} onChange={handleCheckedAll} />
                <div className='flex-1'>Sản phẩm</div>
                <div className='text-center text-[#888] w-[15.88022%]'>Đơn giá</div>
                <div className='text-center text-[#888] w-[15.4265%]'>Số lượng</div>
                <div className='text-center text-[#888] w-[10.43557%]'>Số tiền</div>
                <div className='text-center text-[#888] w-[12.70417%]'>Thao tác</div>
              </div>
              {extendedPurchases.map((productItem, id) => (
                <div
                  key={productItem._id}
                  className='p-5 pt-[1.875rem] bg-white rounded-[0.1875rem] shadow-[0_1px_1px_0_rgba(0,0,0,.05)] overflow-hidden text-sm flex items-center mb-[0.9375rem]'
                >
                  <InputCheckbox checked={productItem.checked} onChange={handleChecked(id)} />
                  <div className='flex-1'>
                    <div className='flex'>
                      <Link
                        to={`${path.home}${genNameId({ name: productItem.product.name, id: productItem.product._id })}`}
                        onClick={handleClickProduct}
                        className=''
                      >
                        <img
                          src={productItem.product.image}
                          alt={productItem.product.name}
                          loading='lazy'
                          className='align-bottom size-20 object-cover'
                        />
                      </Link>
                      <div className='flex flex-col flex-1 pt-[0.3125rem] pl-[0.625rem] pr-5 text-sm leading-4 overflow-hidden'>
                        <Link
                          onClick={handleClickProduct}
                          to={`${path.home}${genNameId({ name: productItem.product.name, id: productItem.product._id })}`}
                          className='text-black/85 line-clamp-2 break-all mb-[0.3125rem]'
                        >
                          {productItem.product.name}
                        </Link>
                        <div className='flex items-center mb-[0.3125rem] gap-[0.3125rem]'>
                          <span className='text-orange border-orange rounded-sm truncate border text-[0.625rem] font-normal px-1 py-0.5 leading-3 block'>
                            Đổi ý miễn phí 15 ngày
                          </span>
                        </div>
                        <img
                          src={saleTagGroup}
                          alt='sale tag group'
                          className='h-[1.125rem] object-contain object-left'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='text-center text-[#888] w-[17.24138%]'>{`Phân loại hàng: ${productItem.product.category.name}`}</div>
                  <div className='flex justify-center text-center text-[#888] w-[15.88022%]'>
                    <div className='flex items-center gap-[0.625rem]'>
                      {productItem.price_before_discount > productItem.price && (
                        <span className='text-black/55 line-through'>
                          {productItem.price_before_discount.toLocaleString('vi-VN')}
                        </span>
                      )}
                      <span className='text-black/85'>{productItem.price.toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                  <div className='text-center flex justify-center text-[#888] w-[15.4265%]'>
                    {' '}
                    <QuantityController
                      ref={inputNumberRef}
                      classNameWrapper='text-sm bg-white'
                      checkValueOutside={true}
                      value={productItem.buy_count}
                      onType={(value) =>
                        handleQttChange({ purchaseId: id, value, purchaseIdObj: productItem._id, onType: true })
                      }
                      onFocusOut={(value) => handleQttChange({ purchaseId: id, value, purchaseIdObj: productItem._id })}
                      onIncrease={(value) => handleQttChange({ purchaseId: id, value, purchaseIdObj: productItem._id })}
                      onDecrease={(value) =>
                        handleQttChange({
                          purchaseId: id,
                          value,
                          purchaseIdObj: productItem._id,
                          nameProductConfirmDelete: productItem.product.name
                        })
                      }
                      disabled={productItem.disabled}
                      max={productItem.product.quantity}
                    />
                  </div>
                  <div className='text-center w-[10.43557%] flex items-center justify-center text-orange'>
                    <span>{`₫${productItem.totalPricePerProduct.toLocaleString('vi-VN')}`}</span>
                  </div>
                  <div className='text-center text-[#888] w-[12.70417%] flex items-center justify-center flex-col'>
                    <button
                      onClick={() => handleDeleteProduct({ purchaseId: productItem._id, confirmDelete: false })}
                      className='border-none bg-none hover:text-orange text-black/85 py-[0.0625rem] px-[0.375rem]'
                    >
                      Xóa
                    </button>
                    <Popover
                      as='button'
                      placement='bottom-end'
                      offsetOptions={{ crossAxis: 20 }}
                      open={productItem.dotsRelatedProducts}
                      onClick={handleClickRelatedProducts(id)}
                      className='text-orange font-normal self-stretch leading-none h-[1.875rem] flex items-center gap-1 px-2'
                      applyAnimation={false}
                      refPressEvent='click'
                      arrowColor='transparent'
                      renderPopover={
                        <div className='bg-white border border-orange px-[1.875rem] py-[1.625rem] text-black/85 capitalize text-sm w-[75rem] max-w-[75rem]'>
                          {isLoading && <Spinner className='py-[1.875rem]' />}
                          {!isLoading && (
                            <div className='grid grid-cols-6 gap-6'>
                              {relatedProducts.map((product) => (
                                <div className='col-span-1' key={product._id}>
                                  <ProductLIstItem product={product} />
                                </div>
                              ))}
                            </div>
                          )}
                          {relatedProductsData && (
                            <Pagination
                              className='mt-[1.625rem] gap-[1.25rem]'
                              classNamePageNumber='size-6 rounded-[0.0625rem]'
                              classNameTextColor='text-black/85'
                              classNameArrowPage='size-6 bg-transparent border border-black/10 text-black/55'
                              classNameArrowInside='fill-current w-[0.6875rem] h-[0.875rem] align-middle'
                              specialPageNumber={3}
                              specialRange={5}
                              toTopPage={false}
                              queryConfig={queryConfig as Dictionary<string>}
                              pageSize={relatedProductsData?.data.data.pagination.page_size}
                              setTargetPage={setTargetPage}
                            />
                          )}
                        </div>
                      }
                    >
                      <span className={productItem.dotsRelatedProducts ? 'line-clamp-1' : ''}>
                        Tìm sản phẩm tương tự
                      </span>
                      <svg
                        enableBackground='new 0 0 15 15'
                        viewBox='0 0 15 15'
                        x={0}
                        y={0}
                        className='fill-current h-[0.875rem] w-2'
                      >
                        <path d='m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z' />
                      </svg>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
            <section
              ref={stickySectionRef}
              className='sticky bottom-0 mt-3 flex items-center py-3 text-base text-black/80 bg-white'
            >
              <InputCheckbox checked={isAllChecked} onChange={handleCheckedAll} />
              <button className='border-none bg-none px-[0.375rem] py-[0.0625rem] capitalize'>{`Chọn tất cả (${extendedPurchases.length})`}</button>
              <Dialog
                closeByEscapeOrClickOutside={false}
                isLockScroll={qttChecked_v > 0}
                open={showConfirmDeleteProducts}
                onOpenChange={setShowConfirmDeleteProducts}
              >
                <DialogTrigger asChild onClick={() => handleDeleteProduct({})}>
                  <button className='border-none bg-none px-[0.375rem] py-[0.0625rem] mx-2'>Xóa</button>
                </DialogTrigger>
                <DialogContent
                  className={classNames('', {
                    'bg-black/65 leading-tight text-white text-sm w-[11.275rem] p-3 flex flex-col items-center justify-center rounded-md select-none':
                      qttChecked_v === 0,
                    'bg-white rounded-[0.1875rem] w-[32.5rem] px-10 pt-11 pb-6 text-base shadow-sm text-black/80':
                      qttChecked_v > 0
                  })}
                  classNameOverlay={classNames('', {
                    'bg-transparent z-20 grid place-items-center px-10': qttChecked_v === 0,
                    'bg-[#0006] z-20 grid place-items-center px-10': qttChecked_v > 0
                  })}
                >
                  {qttChecked_v <= 0 ? (
                    <>
                      <img className='w-[1.75rem]' src={noProductsDeletedSvg} alt='no-product-selected' />
                      <DialogHeading className='mt-3'>Vui lòng chọn sản phẩm</DialogHeading>
                    </>
                  ) : (
                    <>
                      <div className='text-[#333] leading-[1.125rem]'>{`Bạn có muốn bỏ ${qttChecked_v} sản phẩm?`}</div>
                      <div className='flex justify-end mt-[2.1875rem]'>
                        <button
                          onClick={() => handleDeleteProduct({ isDelete: false })}
                          className='uppercase bg-orange mr-6 rounded-sm text-white outline-none border-none w-[6.5625rem] min-h-10 flex items-center justify-center text-sm shadow-sm leading-none tracking-normal select-none font-light transition-opacity hover:opacity-90'
                        >
                          Trở lại
                        </button>
                        <button
                          onClick={() => handleDeleteProduct({ isDelete: true })}
                          className='uppercase w-[6.5625rem] min-h-10 text-sm outline-none border-none hover:bg-[#f8f8f8] transition-colors font-normal text-[#555] flex items-center justify-center select-none leading-none mr-[0.375rem] tracking-normal'
                        >
                          Có
                        </button>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              <button className='border-none bg-none px-[0.375rem] py-[0.0625rem] mx-2 max-w-[10.5rem] truncate text-orange'>
                Lưu vào mục Đã thích
              </button>
              <div className='flex-1'></div>
              <div className='flex flex-col'>
                <Popover
                  isChangePositionX={false}
                  placement='top-end'
                  isShowAtRoot={false}
                  refPressEvent={totalPriceBeforeDiscount_v - totalPrice_v <= 0 ? 'none' : 'hover'}
                  renderPopover={
                    <div className='bg-white text-black/80 w-[34.375rem] px-[1.875rem] rounded-[0.1875rem] shadow-md'>
                      <div className='border-b-[0.0313rem] border-black/10 text-xl leading-6 py-[1.5625rem]'>
                        Chi tiết khuyến mại
                      </div>
                      <div className='py-[0.9375rem] border-b-[0.0313rem] border-black/10 flex text-sm leading-[1.0625rem] justify-between'>
                        <span>Tổng tiền hàng</span>
                        <span>{`₫${totalPriceBeforeDiscount_v.toLocaleString('vi-VN')}`}</span>
                      </div>
                      <div className='py-[0.9375rem] border-b-[0.0313rem] border-black/10 flex text-sm leading-[1.0625rem] justify-between'>
                        <span>Giảm giá sản phẩm</span>
                        <span>{`-₫${(totalPriceBeforeDiscount_v - totalPrice_v).toLocaleString('vi-VN')}`}</span>
                      </div>
                      <div className='py-[0.9375rem]'>
                        <div className='mb-2 flex text-sm leading-[1.0625rem] font-medium justify-between'>
                          <span>Tiết kiệm</span>
                          <span className='text-orange'>{`₫${(totalPriceBeforeDiscount_v - totalPrice_v).toLocaleString('vi-VN')}`}</span>
                        </div>
                        <div className='mb-2 flex text-sm leading-[1.0625rem] font-medium justify-between'>
                          <span>Tổng số tiền</span>
                          <span>{`₫${totalPrice_v.toLocaleString('vi-VN')}`}</span>
                        </div>
                        <div className='text-black/55 text-xs leading-[0.875rem] pt-0.5 pb-[0.6875rem] text-right'>
                          Số tiền cuối cùng thanh toán
                        </div>
                      </div>
                    </div>
                  }
                  className='flex items-center justify-end gap-2 group'
                >
                  <div className='flex items-center ml-5'>
                    <div className='text-[#222] leading-[1.1875rem]'>{`Tổng thanh toán (${qttChecked_v} Sản phẩm):`}</div>
                    <div className='text-orange ml-[0.3125rem] text-2xl leading-[1.75rem]'>{`₫${totalPrice_v.toLocaleString('vi-VN')}`}</div>
                  </div>
                  {totalPriceBeforeDiscount_v - totalPrice_v > 0 && (
                    <div className='group-hover:rotate-180'>
                      <svg viewBox='0 0 12 12' fill='none' width={12} height={12} color='rgba(0, 0, 0, 0.54)'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M6 4L.854 9.146.146 8.44l5.147-5.146a1 1 0 011.414 0l5.147 5.146-.707.707L6 4z'
                          fill='currentColor'
                        />
                      </svg>
                    </div>
                  )}
                </Popover>
                {totalPriceBeforeDiscount_v - totalPrice_v > 0 && (
                  <div className='flex gap-6 items-center justify-end'>
                    <span>Tiết kiệm</span>
                    <span className='text-orange text-sm'>{`₫${formatNumberToSocialStyle(totalPriceBeforeDiscount_v - totalPrice_v, 3)}`}</span>
                  </div>
                )}
              </div>
              <Dialog
                open={showBuyNoProduct}
                onOpenChange={setShowBuyNoProduct}
                isLockScroll={true}
                closeByEscapeOrClickOutside={false}
              >
                <DialogTrigger asChild onClick={handleBuyPurchases}>
                  <button
                    disabled={buyProductsMutation.isPending}
                    className='rounded-sm bg-orange text-center capitalize w-[13.125rem] h-10 font-light text-sm leading-none px-[2.25rem] py-[0.8125rem] text-white ml-[0.9375rem] mr-[1.375rem] tracking-normal outline-none border-none flex items-center justify-center select-none hover:opacity-95'
                  >
                    Mua Hàng
                  </button>
                </DialogTrigger>
                <DialogContent
                  className='bg-white p-5 rounded-[0.1875rem] w-[33.75rem] text-black/80 flex flex-col'
                  classNameOverlay='bg-[#0006] z-20 grid place-items-center px-10'
                >
                  <DialogHeading className='text-base mt-10 mb-[1.875rem] leading-[1.2rem]]'>
                    Bạn vẫn chưa chọn sản phẩm nào để mua.
                  </DialogHeading>
                  <DialogClose className='uppercase mt-[6.25rem] hover:opacity-90 bg-orange rounded-sm text-white py-3 flex items-center justify-center border-none outline-none shadow-sm text-sm tracking-normal leading-none select-none font-light w-full'>
                    OK{' '}
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </section>
          </>
        ) : (
          <div className='h-[21rem] flex flex-col items-center justify-center'>
            <div className='w-[6.75rem] h-[6.125rem] bg-no-repeat bg-center bg-cover bg-[url("/src/assets/images/no-product.png")]'></div>
            <div className='text-sm text-black/40 mt-[1.125rem] leading-4 font-bold'>Giỏ hàng của bạn còn trống</div>
            <Link to={path.home} className='mt-[1.0625rem]'>
              <button className='border-none outline-none bg-none text-base bg-orange text-white rounded-sm uppercase px-[2.625rem] py-[0.625rem] shadow-sm flex items-center justify-center tracking-normal leading-none select-none hover:opacity-95'>
                Mua ngay
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className='container'>
        <div className='mt-10 mb-[4.375rem]'>
          <div className='flex items-center py-5'>
            <span className='text-black/55 text-base font-medium flex-1 uppercase truncate mr-5'>
              Có thể bạn cũng thích
            </span>
            <Link to={path.home} className='capitalize text-orange flex items-center gap-[0.3125rem] text-sm'>
              Xem tất cả
              <svg
                enableBackground='new 0 0 11 11'
                viewBox='0 0 11 11'
                x={0}
                y={0}
                className='text-[0.625rem] fill-current size-[0.625rem] '
              >
                <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
              </svg>
            </Link>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.625rem]'>
            {relatedProductsSuggestion.slice(0, 12).map((relatedProduct) => {
              return (
                <div className='col-span-1' key={relatedProduct._id}>
                  <ProductRelatedItem
                    product={relatedProduct}
                    to={`${path.home}${genNameId({ name: relatedProduct.name, id: relatedProduct._id })}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Dialog
        open={showException}
        onOpenChange={setShowException}
        closeByEscapeOrClickOutside={false}
        disableFocusManagement={true}
      >
        <DialogContent className='bg-white p-5 rounded-[0.1875rem] w-[33.75rem] text-black/80 flex flex-col'>
          {aboveMax != null && (
            <>
              <DialogHeading className='text-base mt-10 leading-[1.2rem] mb-[1.875rem]'>{`Rất tiếc, bạn chỉ có thể mua tối đa ${aboveMax} sản phẩm của chương trình giảm giá này.`}</DialogHeading>
              <DialogClose className='uppercase mt-[6.25rem] bg-orange rounded-sm text-white py-3 flex items-center justify-center border-none outline-none shadow-sm text-sm tracking-normal leading-none select-none font-light w-full'>
                OK
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={showConfirmDeleteProduct}
        onOpenChange={setShowConfirmDeleteProduct}
        isLockScroll={true}
        closeByEscapeOrClickOutside={false}
      >
        <DialogContent
          className='bg-white p-5 rounded-[0.1875rem] w-[33.75rem] text-black/80 flex flex-col'
          classNameOverlay='bg-[#0006] z-20 grid place-items-center px-10'
        >
          <DialogHeading className='mt-[1.875rem] text-orange text-2xl leading-tight'>
            Bạn có chắc chắn muốn xóa sản phẩm này?
          </DialogHeading>
          <DialogDescription className='text-base text-black/80 leading-[1.2rem] mt-10'>
            {purchaseConfirmDelete.nameProduct}
          </DialogDescription>
          <div className='flex mt-[6.25rem] gap-[0.625rem]'>
            <button
              onClick={() => handleDeleteProduct({ purchaseId: purchaseConfirmDelete.purchaseId, isDelete: true })}
              className='bg-orange rounded-sm h-10 max-w-[13.75rem] min-w-[4.375rem] text-white py-5 flex items-center justify-center border-none outline-none text-sm tracking-normal leading-none select-none font-light w-full'
            >
              Có
            </button>
            <button
              onClick={() => handleDeleteProduct({ purchaseId: purchaseConfirmDelete.purchaseId, isDelete: false })}
              className='bg-white rounded-sm h-10 max-w-[13.75rem] min-w-[4.375rem] text-[#555] py-5 flex items-center justify-center outline-none text-sm tracking-normal leading-none select-none font-light w-full border border-black/10'
            >
              Không
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
