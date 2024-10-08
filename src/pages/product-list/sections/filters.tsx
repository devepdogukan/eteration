import CheckboxList from '@/features/checkbox-list'
import { Product } from '@/services/product/type'
import { useAppDispatch, useAppSelector } from '@/store'
import { addFilter, removeFilter, selectFilterState } from '@/store/reducers/filter'
import { selectProductState } from '@/store/reducers/product'
import { useState } from 'react'

const Filters = () => {
  const { list: products } = useAppSelector(selectProductState)
  const { list: selectedFilters } = useAppSelector(selectFilterState)
  const [localProducts, _] = useState(products)
  const dispatch = useAppDispatch()

  const filterItems: {
    title: string
    key: keyof Product
  }[] = [
    { title: 'Brands', key: 'brand' },
    { title: 'Model', key: 'model' }
  ]

  return (
    <>
      {filterItems.map((filterItem, i) => {
        const filterValues = selectedFilters.find(({ id }) => id === filterItem.key)?.value

        return (
          <CheckboxList
            key={`${filterItem.key}-${i}`}
            title={filterItem.title}
            onChange={({ key, checked }) => {
              const params = { id: filterItem.key, value: key }
              if (checked) {
                dispatch(addFilter(params))
                return
              }
              dispatch(removeFilter(params))
            }}
            items={Array.from(
              new Set([...localProducts.map((product) => product[filterItem.key])])
            ).map((product) => ({
              value: product,
              label: product,
              checked: filterValues?.includes(product) ?? false
            }))}
          />
        )
      })}
    </>
  )
}

export default Filters
