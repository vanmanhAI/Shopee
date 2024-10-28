/**
 * STATUS_PURCHASE
 * -1: Sản phẩm đang trong giỏ hàng
 * 0: Tất cả sản phẩm
 * 1: Sản phẩm đang đợi xác nhận từ chủ shop
 * 2: Sản phẩm đang được lấy hàng
 * 3: Sản phẩm đang vận chuyển
 * 4: San phẩm đã được giao
 * 5: Sản phẩm đã bị hủy
 */

export const PURCHASE_STATUS = {
  IN_CART: -1,
  WAITING_CONFIRM: 1,
  GETTING_PRODUCT: 2,
  SHIPPING: 3,
  DELIVERED: 4,
  CANCELLED: 5
} as const

export const PURCHASE_LIST_STATUS = {
  ALL: 0,
  IN_CART: PURCHASE_STATUS.IN_CART,
  WAITING_CONFIRM: PURCHASE_STATUS.WAITING_CONFIRM,
  GETTING_PRODUCT: PURCHASE_STATUS.GETTING_PRODUCT,
  SHIPPING: PURCHASE_STATUS.SHIPPING,
  DELIVERED: PURCHASE_STATUS.DELIVERED,
  CANCELLED: PURCHASE_STATUS.CANCELLED
} as const
