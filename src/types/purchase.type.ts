import { PURCHASE_STATUS, PURCHASE_LIST_STATUS } from '@/constants/purchase'
import { Product } from '@/types/product.type'

export type PurchaseStatusType = (typeof PURCHASE_STATUS)[keyof typeof PURCHASE_STATUS]
export type PurchaseListStatusType = (typeof PURCHASE_LIST_STATUS)[keyof typeof PURCHASE_LIST_STATUS]

export interface Purchase {
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatusType
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
  dotsRelatedProducts: boolean
  totalPriceBeforeDiscount: number
  totalPrice: number
  totalPricePerProduct: number
}
