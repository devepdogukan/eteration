import PriceFormat from '@/components/price-format'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectFilterState, setSearch } from '@/store/reducers/filter'
import { ArchiveIcon, PersonIcon } from '@radix-ui/react-icons'
import { SearchIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { calculateTotalPrice } from './utils'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { search } = useAppSelector(selectFilterState)
  const { pathname } = useLocation()

  const isProductDetailPage = pathname.includes('/product/')
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-[5px] bg-eteration-blue-primary flex items-center">
      <div className="w-sm mr-6">
        <Link to="/">
          <p className="font-extrabold text-xl text-white">Eteration</p>
        </Link>
      </div>
      <div className="w-md h-10 relative">
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
      <div className="w-sm ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
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
    </div>
  )
}

export default Navbar
