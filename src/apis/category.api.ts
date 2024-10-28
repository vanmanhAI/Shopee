import { Category } from '@/types/category.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const URL = 'categories'

export const getCategories = () => {
  return http.get<SuccessResponse<Category[]>>(URL)
}
