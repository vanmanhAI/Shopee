import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductDetail, getProducts } from '@/apis/product.api'
import BreadCrumb from '@/components/BreadCrumb'
import ProductRating from '@/components/ProductRating'
import { formatNumberToSocialStyle, genNameId, getIdFromNameId } from '@/utils/utils'
import Popover from '@/components/Popover'
import Button from '@/components/Button'
import DOMPurify from 'dompurify'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Dialog } from '@/components/Dialog/context/dialog.context'
import DialogTrigger from '@/components/Dialog/components/DialogTrigger'
import DialogContent from '@/components/Dialog/components/DialogContent'
import DialogHeading from '@/components/Dialog/components/DialogHeading'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { ProductListConfig } from '@/types/product.type'
import ProductRelatedItem from '@/components/Product/components/ProductRelatedItem'
import path from '@/constants/path'
import QuantityController from '@/components/QuantityController'
import { addToCart, getCart } from '@/apis/purchase.apis'
import { PURCHASE_STATUS } from '@/constants/purchase'
import { AppContext } from '@/contexts/app.context'
import 'react-toastify/dist/ReactToastify.css'
import checkAddCartSuccess from '@/assets/images/check-addCart-success.svg'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const [isShowCheckAddCart, setIsShowCheckAddCart] = useState(false)
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [currentImagesRange, setCurrentImagesRange] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const [activeImageInner, setActiveImageInner] = useState(0)
  const queryClient = useQueryClient()

  const { data: productDetailData } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, id],
    queryFn: () => getProductDetail(id as string)
  })
  const product = productDetailData.data.data
  const currentImages = useMemo(() => product.images.slice(...currentImagesRange), [currentImagesRange, product])

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => addToCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CART]
      })
    }
  })

  const queryConfig: ProductListConfig = { page: '1', limit: '40', category: product.category._id }
  const { data: relatedProductsData } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS, queryConfig],
    queryFn: () => getProducts(queryConfig)
  })
  const products = relatedProductsData.data.data.products

  const { data: cartData } = useQuery({
    queryKey: [QUERY_KEYS.GET_CART, { status: PURCHASE_STATUS.IN_CART }],
    queryFn: () => getCart({ status: PURCHASE_STATUS.IN_CART }),
    enabled: isAuthenticated
  })
  const purchases = cartData?.data.data

  const maxQtt = useMemo(() => {
    const purchaseInCart = (purchases ?? []).find((purchase) => purchase.product._id === product._id)
    if (purchaseInCart) {
      return product.quantity - purchaseInCart.buy_count
    }
    return product.quantity
  }, [purchases, product])

  const hoverToShowImage = (img: string) => {
    setActiveImage(img)
  }

  const chooseImage = (image: string) => {
    const index = product.images.findIndex((img) => img === image)
    const newIndex = index === -1 ? 0 : index
    setActiveImageInner(newIndex)
  }

  const nextImage = (inner?: boolean) => {
    if (currentImagesRange[1] < product.images.length && !inner) {
      setCurrentImagesRange((prev) => [prev[0] + 1, prev[1] + 1])
    }
    if (inner) {
      if (activeImageInner < product.images.length - 1) {
        setActiveImageInner((prev) => prev + 1)
      } else {
        setActiveImageInner(0)
      }
    }
  }

  const prevImage = (inner?: boolean) => {
    if (currentImagesRange[0] > 0 && !inner) {
      setCurrentImagesRange((prev) => [prev[0] - 1, prev[1] - 1])
    }
    if (inner) {
      if (activeImageInner > 0) {
        setActiveImageInner((prev) => prev - 1)
      } else {
        setActiveImageInner(product.images.length - 1)
      }
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate(path.login)
      return
    }

    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product._id },
      {
        onSuccess: () => {
          setIsShowCheckAddCart(true)
        }
      }
    )
  }

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate(path.login)
      return
    }
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product._id })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  const handleClickCheckCart = () => {
    setIsShowCheckAddCart(false)
  }

  useEffect(() => {
    setActiveImage(product.image)
  }, [nameId, product.image])

  useEffect(() => {
    if (isShowCheckAddCart) {
      const timer = setTimeout(() => {
        setIsShowCheckAddCart(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isShowCheckAddCart])

  return (
    <div className='bg-[#f5f5f5] py-5'>
      <div className='container'>
        <BreadCrumb productName={product.name} />
        <section className='flex mt-5 bg-white rounded-md shadow-sm'>
          <figure className='flex-shrink-0 w-[480px] p-[0.9375rem] flex-col'>
            <div className='flex flex-col'>
              <div className='relative w-full pt-[100%]'>
                <img
                  className='absolute top-0 left-0 w-full h-full object-contain object-center bg-white align-middle'
                  src={activeImage}
                  alt={product.name}
                />
              </div>
              <div className='relative my-[0.3125rem] grid grid-cols-5 gap-[0.625rem]'>
                <button
                  onClick={() => prevImage()}
                  className='absolute z-10 cursor-pointer outline-none tracking-normal font-light flex items-center justify-center w-5 h-10 bg-[#0003] text-white left-0 top-1/2 -translate-y-1/2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={3}
                    stroke='currentColor'
                    className='size-full'
                  >
                    <path strokeLinecap='square' strokeLinejoin='inherit' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                <button
                  onClick={() => nextImage()}
                  className='absolute z-10 cursor-pointer outline-none tracking-normal font-light flex items-center justify-center w-5 h-10 bg-[#0003] text-white right-0 top-1/2 -translate-y-1/2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={3}
                    stroke='currentColor'
                    className='size-full'
                  >
                    <path strokeLinecap='square' strokeLinejoin='inherit' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
                <Dialog>
                  {currentImages.map((image) => {
                    const isActive = image === activeImage
                    return (
                      <div key={image}>
                        <DialogTrigger
                          asChild={true}
                          className='relative w-full pt-[100%] cursor-pointer'
                          onClick={() => chooseImage(image)}
                          onMouseEnter={() => hoverToShowImage(image)}
                        >
                          <div>
                            <img
                              className='absolute top-0 left-0 w-full h-full object-contain object-center bg-white align-middle'
                              src={image}
                              alt={product.name}
                            />
                            {isActive && (
                              <div className='absolute top-0 left-0 w-full h-full border-2 border-orange'></div>
                            )}
                          </div>
                        </DialogTrigger>
                        <DialogContent className='bg-white focus:outline-none flex rounded-[0.1875rem] shadow-md w-full h-[33.75rem] lg:w-[52.25rem] '>
                          <div className='relative flex-1 size-full p-3 pr-0'>
                            <button
                              onClick={() => prevImage(true)}
                              className='absolute z-10 cursor-pointer outline-none tracking-normal font-light flex items-center justify-center w-10 h-20 bg-[#0000008a] text-white left-3 top-1/2 -translate-y-1/2'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={3}
                                stroke='currentColor'
                                className='size-full'
                              >
                                <path strokeLinecap='square' strokeLinejoin='inherit' d='M15.75 19.5 8.25 12l7.5-7.5' />
                              </svg>
                            </button>
                            <button
                              onClick={() => nextImage(true)}
                              className='absolute z-10 cursor-pointer outline-none tracking-normal font-light flex items-center justify-center w-10 h-20 bg-[#0000008a] text-white right-0 top-1/2 -translate-y-1/2'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={3}
                                stroke='currentColor'
                                className='size-full'
                              >
                                <path strokeLinecap='square' strokeLinejoin='inherit' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                              </svg>
                            </button>
                            <div className='relative w-full pt-[100%]'>
                              <img
                                src={product.images[activeImageInner]}
                                alt={product.name}
                                className='absolute w-full h-full top-0 left-0'
                              />
                            </div>
                          </div>
                          <div className='flex flex-col w-[19.25rem] pt-10 pl-3 pb-[1.875rem]'>
                            <DialogHeading className='text-[1.0625rem] pr-3 break-words line-clamp-2'>
                              {product.name}
                            </DialogHeading>
                            <div className='grid grid-cols-[repeat(3,5rem)] gap-3 pr-3 mt-5 overflow-auto'>
                              {product.images.map((img, index) => {
                                const isActive = index === activeImageInner
                                return (
                                  <div
                                    className='relative w-full pt-[100%] cursor-pointer bg-whit'
                                    key={img}
                                    onClick={() => chooseImage(img)}
                                  >
                                    <img
                                      className='absolute w-full h-full top-0 left-0 object-contain object-center'
                                      src={img}
                                      alt={product.name}
                                    />
                                    {isActive && (
                                      <div className='absolute top-0 left-0 w-full h-full border-2 border-orange'></div>
                                    )}
                                    <div className='absolute w-full h-full top-0 left-0 bg-transparent hover:bg-white/25 z-10'></div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </DialogContent>
                      </div>
                    )
                  })}
                </Dialog>
              </div>
            </div>
            <div className='flex items-center justify-center mt-[0.9375rem]'>
              <div className='flex items-center justify-between px-[1.875rem] border-r border-[#00000017] gap-[5px]'>
                <span className='text-[#222] text-base'>Chia sẻ:</span>
                <button
                  title='messenger'
                  type='button'
                  aria-label='messenger'
                  className={`size-[1.5625rem] outline-none relative bg-[url('/src/assets/images/socials-post.png')] bg-[length:100%] bg-[0_-100%]`}
                ></button>
                <button
                  title='facebook'
                  type='button'
                  aria-label='facebook'
                  className={`size-[1.5625rem] outline-none relative bg-[url('/src/assets/images/socials-post.png')] bg-[length:100%] bg-[0_0]`}
                ></button>
                <button
                  title='pinterest'
                  type='button'
                  aria-label='pinterest'
                  className={`size-[1.5625rem] outline-none relative bg-[url('/src/assets/images/socials-post.png')] bg-[length:100%] bg-[0_-300%]`}
                ></button>
                <button
                  title='twitter'
                  type='button'
                  aria-label='twitter'
                  className={`size-[1.5625rem] outline-none relative bg-[url('/src/assets/images/socials-post.png')] bg-[length:100%] bg-[0_-400%]`}
                ></button>
              </div>
              <div className='flex-1 flex items-center justify-center'>
                <button className='border-none outline-none bg-transparent relative flex items-center justify-center gap-[0.625rem]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-7 text-orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                    />
                  </svg>
                  <span className='text-[#222] text-base'>Đã thích (118)</span>
                </button>
              </div>
            </div>
          </figure>
          <section className='flex flex-1 flex-col pt-5 pl-5 pr-[1.5625rem] text-[#000000cc]'>
            <h3 className='text-xl font-medium m-0 leading-6 break-words line-clamp-2'>{product.name}</h3>
            <div className='flex items-center min-h-[1.55rem] mt-[0.625rem]'>
              <button className='bg-transparent outline-none border-none text-orange cursor-pointer flex items-baseline gap-[0.3125rem] pr-[0.9375rem]'>
                <div className='border-b border-current'>{product.rating.toFixed(1)}</div>
                <ProductRating />
              </button>
              <button className='bg-transparent border-l border-[#00000024] outline-none text-orange cursor-pointer flex items-baseline px-[0.9375rem] gap-[0.3125rem]'>
                <div className='border-b border-current text-[#222] text-base leading-[1.2rem]'>66</div>
                <div className='text-[#767676] text-sm'>Đánh giá</div>
              </button>
              <button className='bg-transparent border-l border-[#00000024] outline-none text-orange cursor-pointer flex items-baseline px-[0.9375rem] gap-[0.3125rem]'>
                <div className='text-[#222] text-base leading-[1.2rem]'>{formatNumberToSocialStyle(product.sold)}</div>
                <div className='text-[#767676] text-sm'>Đã bán</div>
              </button>
              <button className='text-[#0000008a] leading-[1.05rem] ml-auto text-sm'>Tố cáo</button>
            </div>
            <div className='flex bg-[#fafafa] px-5 py-[0.9375rem] items-center flex-wrap min-h-[2.25rem] mt-[0.625rem]'>
              {product.price_before_discount - product.price > 0 && (
                <div className='text-base leading-[1.2rem] text-[#929292] line-through mr-[0.625rem]'>{`₫${product.price_before_discount.toLocaleString('vi-VN')}`}</div>
              )}
              <div className='flex items-center'>
                <div className='text-orange font-medium text-3xl'>{`₫${product.price.toLocaleString('vi-VN')}`}</div>
                {product.price_before_discount - product.price > 0 && (
                  <div className='bg-orange text-white px-1 py-0.5 rounded-sm uppercase font-semibold text-xs leading-none ml-[0.9375rem]'>
                    {`${Math.round(
                      ((product.price_before_discount - product.price) / product.price_before_discount) * 100
                    )}% giảm`}
                  </div>
                )}
              </div>
            </div>
            <div className='flex items-center text-[#222] p-1 mb-[1.5625rem] text-sm leading-[1.05rem]'>
              <div className='flex-shrink-0 capitalize w-[6.875rem] font-normal text-[#757575]'>
                Chính sách Trả hàng
              </div>
              <div className='flex items-center text-[#555]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={32}
                  height={32}
                  className='size-4 mr-[0.3125rem]'
                  viewBox='0 0 32 32'
                  fill='none'
                >
                  <path
                    d='M15.7481 7.78492C15.8265 7.74794 15.9121 7.72876 15.9988 7.72876C16.0854 7.72876 16.171 7.74794 16.2494 7.78492L23.4153 11.1803L15.9973 15.0657L8.57935 11.1803L15.7481 7.78492Z'
                    fill='#EE4D2D'
                  />
                  <path
                    d='M16.5846 16.0792L23.9972 12.1963V20.0179C23.9971 20.1245 23.968 20.2291 23.9129 20.3203C23.8579 20.4116 23.7789 20.4861 23.6846 20.5358L16.5846 24.2728V16.0792Z'
                    fill='#EE4D2D'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.4147 16.0793V24.2715L8.31647 20.5358C8.22212 20.4862 8.14313 20.4117 8.08804 20.3205C8.03296 20.2292 8.00386 20.1246 8.00391 20.018V12.1978L15.4147 16.0793Z'
                    fill='#EE4D2D'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.97422 4.66404C14.1175 1.47143 20.9625 2.10736 25.4281 6.57255C29.8857 11.0302 30.5263 17.859 27.3514 22.9991L28.2113 23.8572L26.7086 24.0567L25.2048 24.2572L25.4043 22.7546L25.6038 21.2522L26.3204 21.9688C28.961 17.4086 28.3312 11.4735 24.4285 7.57074C20.4415 3.58375 14.3335 3.01192 9.73654 5.8538C9.61115 5.93269 9.46258 5.96637 9.31543 5.94928C9.16827 5.93219 9.03138 5.86534 8.92741 5.75981L8.85539 5.68779C8.78542 5.61786 8.73217 5.53302 8.6996 5.43961C8.66704 5.3462 8.656 5.24664 8.66733 5.14836C8.67865 5.05009 8.71204 4.95565 8.765 4.87209C8.81795 4.78854 8.8891 4.71803 8.97314 4.66584L8.97422 4.66404ZM6.79312 7.7425L5.29152 7.94344L3.78884 8.14293L4.64839 9.00248C1.47378 14.1429 2.11403 20.9714 6.57202 25.429C11.0372 29.8942 17.8823 30.5297 23.0259 27.3375C23.1098 27.2852 23.1809 27.2147 23.2337 27.1311C23.2866 27.0476 23.32 26.9531 23.3313 26.8549C23.3426 26.7567 23.3316 26.6572 23.2991 26.5638C23.2666 26.4704 23.2135 26.3855 23.1436 26.3155L23.0716 26.2435C22.9676 26.138 22.8307 26.0711 22.6835 26.0539C22.5363 26.0368 22.3876 26.0704 22.2621 26.1492C17.6659 28.9911 11.5579 28.4178 7.57021 24.4322C3.66748 20.5295 3.03768 14.5944 5.67826 10.0342L6.39485 10.7507L6.59435 9.24842L6.79348 7.74574L6.79312 7.7425Z'
                    fill='#EE4D2D'
                  />
                </svg>
                <div className='mr-3'>Trả hàng 15 ngày</div>
                <div className='mr-3'>Đổi ý miễn phí</div>
                <Popover
                  offsetOptions={({ rects }) => {
                    return {
                      crossAxis: rects.floating.width / 2,
                      mainAxis: rects.reference.height / 2 + 3
                    }
                  }}
                  applyAnimation={false}
                  arrowWidth={16}
                  arrowHeight={8}
                  strokeArrowWidth={2}
                  strokeArrowColor='#00000017'
                  renderPopover={
                    <div className='relative text-sm leading-[1.375rem] w-[29.6875rem] max-h-[12.5rem] overflow-y-auto break-words text-left text-[#000c] p-5 bg-white border border-[#00000017] rounded-sm shadow-sm box-content'>
                      Miễn phí Trả hàng trong 15 ngày nếu Đổi ý (hàng trả phải còn nguyên seal, tem, hộp sản phẩm), áp
                      dụng cho một số sản phẩm nhất định. Ngoài ra, tại thời điểm nhận hàng, bạn có thể đồng kiểm và
                      được trả hàng miễn phí.
                      <Link to='#' className='text-[#08f] block'>
                        Xem thêm
                      </Link>
                    </div>
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    width={15}
                    height={15}
                    fill='rgba(0,0,0,0.54)'
                    className='size-[0.875rem]'
                  >
                    <g>
                      <circle cx='7.5' cy='7.5' fill='none' r='6.5' strokeMiterlimit={10} stroke='rgba(0,0,0,0.54)' />
                      <path
                        d='m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z'
                        stroke='none'
                      />
                    </g>
                  </svg>
                </Popover>
              </div>
            </div>
            <div className='flex items-center text-[#222] p-1 text-sm leading-[1.05rem]'>
              <div className='flex-shrink-0 capitalize w-[6.875rem] font-normal text-[#757575]'>Số lượng</div>
              <div className='flex items-center text-[#555]'>
                <QuantityController
                  value={buyCount}
                  onType={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  max={maxQtt}
                />
                <div>{`${product.quantity} sản phẩm có sẵn`}</div>
              </div>
            </div>
            <div className='text-orange ml-[6.875rem] mt-[0.9375rem] text-sm leading-tight'>
              {buyCount >= maxQtt && 'Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này'}
            </div>
            <div className='flex mt-[1.875rem]'>
              <Dialog isLockScroll={false} open={isShowCheckAddCart} onOpenChange={setIsShowCheckAddCart}>
                <DialogTrigger
                  onClick={handleAddToCart}
                  className='flex items-center bg-[#ff57221a] justify-center border border-orange shadow-sm outline-none  h-12 px-5 truncate rounded-sm cursor-pointer mr-[0.9375rem] text-orange text-sm leading-tight max-w-[15.625rem] hover:bg-[#ffc5b22e]'
                >
                  <img
                    className='size-5 mr-[0.625rem]'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
                    alt=''
                  />
                  <div>Thêm vào giỏ hàng</div>
                </DialogTrigger>
                <DialogContent
                  onClick={handleClickCheckCart}
                  classNameOverlay='bg-transparent z-20 grid place-items-center px-10'
                >
                  <div className='flex justify-center items-center transition-opacity'>
                    <div className='bg-black/70 rounded-sm text-white text-[1.0625rem] leading-tight overflow-hidden flex flex-col items-center gap-5 px-5 py-10 min-w-[21.25rem]'>
                      <div className='size-[3.75rem] bg-[#00bfa5] flex items-center justify-center rounded-full'>
                        <img className='size-[1.875rem]' src={checkAddCartSuccess} alt='' />
                      </div>
                      <div>Sản phẩm đã được thêm vào Giỏ hàng</div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                onClick={handleBuyNow}
                className='flex items-center bg-orange border-none shadow-sm outline-none justify-center h-12 px-5 truncate rounded-sm cursor-pointer mr-[0.9375rem] text-white text-sm capitalize leading-tight max-w-[15.625rem] hover:bg-orange/95 min-w-[11.25rem]'
              >
                <span>Mua ngay</span>
              </Button>
            </div>
          </section>
        </section>
        <section className='flex mt-[0.9375rem] bg-white rounded-sm shadow-sm overflow-hidden'>
          <div className='container mx-0 flex flex-1'>
            <section className='flex-1 p-[1.5625rem] pb-[0.625rem]'>
              <h2 className='uppercase bg-[#00000005] font-normal m-0 p-[0.875rem] text-lg leading-tight text-black/85'>
                Mô tả sản phẩm
              </h2>
              <div className='m-[0.9375rem] mt-[1.875rem]'>
                <div
                  className='text-sm leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                />
              </div>
            </section>
          </div>
        </section>
        <div className='text-black/80 text-sm leading-tight'>
          <div className='pt-5 pb-[0.625rem] uppercase'>Có thể bạn cũng thích</div>
          <div className='mt-[0.3125rem] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[0.625rem]'>
            {products.map((relatedProduct) => {
              if (relatedProduct._id === product._id) return null
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
    </div>
  )
}
