import { Product, ProductList, ProductListConfig } from '@/types/product.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const URL = 'products'

export const getProducts = (params: ProductListConfig) => {
  return http.get<SuccessResponse<ProductList>>(URL, { params })
}

export const getProductDetail = (id: string) => {
  return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
}

export const searchProducts = (name: string) => {
  return http.get<SuccessResponse<ProductList>>(URL, { params: { name } })
}
