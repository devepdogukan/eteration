import Sort from '@/pages/product-list/sections/sort'
import Filters from './filters'

const ListSection = () => {
  return (
    <div className="w-sm mr-6 flex flex-col gap-5 sticky top-5 h-fit">
      <Sort />
      <Filters />
    </div>
  )
}

export default ListSection
