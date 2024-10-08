import Loading from '@/components/loading'
import Navbar from '@/features/navbar'
import Basket from '@/features/navbar/basket'
import { MainLayoutProps } from './type'

const MainLayout = ({ isLoading, children }: MainLayoutProps) => {
  if (isLoading) return <Loading />

  return (
    <div>
      <Navbar />
      <main className="relative flex px-4 md:px-8 lg:px-12 xl:px-16 bg-gray-bg py-6 min-h-screen">
        {children}
        <Basket />
      </main>
    </div>
  )
}

export default MainLayout
