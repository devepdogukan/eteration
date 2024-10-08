import { useEffect } from 'react'

import MainLayout from '@/features/main-layout'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchAllProducts, selectProductState } from '@/store/reducers/product'
import ProductsList from './list'
import ListSection from './sections'

function ProductListPage() {
  const { isLoading } = useAppSelector(selectProductState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  return (
    <MainLayout isLoading={isLoading}>
      <div className="flex flex-auto">
        <ListSection />
        <ProductsList />
      </div>
    </MainLayout>
  )
}

export default ProductListPage
