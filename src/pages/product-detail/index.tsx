import { useEffect } from 'react'

import MainLayout from '@/features/main-layout'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchAllProducts, selectProductState } from '@/store/reducers/product'
import ProductDetailCard from './detail'

function ProductDetailPage() {
  const { isLoading } = useAppSelector(selectProductState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  return (
    <MainLayout isLoading={isLoading}>
      <div className="flex flex-auto">
        <ProductDetailCard />
      </div>
    </MainLayout>
  )
}

export default ProductDetailPage
