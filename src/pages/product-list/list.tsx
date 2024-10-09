import Pagination from '@/components/pagination'
import ProductCard from '@/components/product-card'
import { PRODUCT_PAGINATION_COUNT } from '@/config/constants'
import { Product } from '@/services/product/type'
import { useAppSelector } from '@/store'
import { selectFilterState } from '@/store/reducers/filter'
import { selectProductState } from '@/store/reducers/product'
import { useMemo, useState } from 'react'
import NotFoundItem from './not-found'

const ProductsList = () => {
  const { list } = useAppSelector(selectProductState)
  const { list: filters, search } = useAppSelector(selectFilterState)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const startIndex = (pageIndex - 1) * PRODUCT_PAGINATION_COUNT
  const endIndex = startIndex + PRODUCT_PAGINATION_COUNT

  const filteredList = useMemo(() => {
    if (filters.length === 0 && !search) return list

    const filteredItems = list.filter((product) =>
      filters.every((filter) => filter.value.includes(product[filter.id as keyof Product]))
    )

    return filteredItems.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [filters, list, pageIndex, search])

  return (
    <div className="flex-1 h-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6 mb-6">
        {filteredList.slice(startIndex, endIndex).map((product) => (
          <ProductCard {...product} key={product.id}></ProductCard>
        ))}
      </div>
      {filteredList.length > 0 ? (
        <Pagination onPageChange={(page) => setPageIndex(page)} totalItems={filteredList.length} />
      ) : (
        <NotFoundItem />
      )}
    </div>
  )
}

export default ProductsList
