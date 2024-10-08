import PriceFormat from '@/components/price-format'
import { useWindowSize } from '@/hooks/use-window-size'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectFilterState, setSearch } from '@/store/reducers/filter'
import { ArchiveIcon, PersonIcon } from '@radix-ui/react-icons'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Basket from './basket'
import { calculateTotalPrice } from './utils'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { search } = useAppSelector(selectFilterState)
  const { pathname } = useLocation()
  const [mobileNavbarShow, setMobileNavbarShow] = useState<boolean>(false)

  const { isMobile } = useWindowSize()

  const isProductDetailPage = pathname.includes('/product/')
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-[5px] relative bg-eteration-blue-primary flex max-lg:gap-3 max-lg:items-center items-center max-lg:flex-col">
      <div className="w-sm xl:mr-6 max-lg:text-center">
        <Link to="/">
          <p className="font-extrabold text-xl text-white">Eteration</p>
        </Link>
      </div>
      <div className="w-md max-lg:w-full h-10 relative">
        <input
          value={search}
          data-testid="navbar-search-input"
          disabled={isProductDetailPage}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          type="text"
          className="bg-[#fafbfb] pl-10 h-full w-full font-medium"
          placeholder="Search"
        />
        <SearchIcon className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 text-[#868da5]" />
      </div>
      <div className="w-sm lg:ml-auto flex items-center gap-4">
        <div
          className={cn('flex items-center gap-2', {
            'cursor-pointer': isMobile
          })}
          onClick={() => setMobileNavbarShow((current) => isMobile && !current)}>
          <ArchiveIcon className="w-5 h-5 text-white" />
          <p className="font-normal text-white">
            <PriceFormat amount={calculateTotalPrice()} />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PersonIcon className="w-5 h-5 text-white" />
          <p className="font-normal text-white">Doğukan</p>
        </div>
      </div>
      {mobileNavbarShow && isMobile && (
        <div className="absolute top-full z-50 left-0 w-full">
          <Basket disableHidden />
        </div>
      )}
    </div>
  )
}

export default Navbar
