import NotFoundPage from '@/pages/404'
import ProductDetailPage from '@/pages/product-detail'
import ProductListPage from '@/pages/product-list'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListPage />
  },
  {
    path: '/product/:productId',
    element: <ProductDetailPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

export default router
