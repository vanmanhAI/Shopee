import { ProductListConfig } from '@/types/product.type'
import omitBy from 'lodash/omitBy'
import { useQueryParams } from './useQueryParams'
import { Dictionary } from 'lodash'

export default function useQueryConfig() {
  const queryParams: ProductListConfig = useQueryParams()

  const queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    (value) => {
      return value === undefined
    }
  ) as Dictionary<string>

  return queryConfig
}
