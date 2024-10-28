import { Purchase, PurchaseListStatusType } from '@/types/purchase.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const URL = 'purchases'

export const addToCart = (body: { product_id: string; buy_count: number }) =>
  http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)

export const getCart = (params: { status: PurchaseListStatusType }) =>
  http.get<SuccessResponse<Purchase[]>>(URL, { params })

export const buyProducts = (body: { product_id: string; buy_count: number }[]) =>
  http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)

export const updatePurchase = (body: { product_id: string; buy_count: number }) =>
  http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)

export const deletePurchase = ({ purchase_ids }: { purchase_ids: string[] }) =>
  http.delete<SuccessResponse<{ deleted_count: number }>>(URL, { data: purchase_ids })
