import RadioList from '@/features/radio-list'
import { useAppDispatch } from '@/store'
import { sortBasket } from '@/store/reducers/product'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const items = [
  {
    value: 0,
    label: 'Old to new'
  },
  {
    value: 1,
    label: 'New to old'
  },
  {
    value: 2,
    label: 'Price hight to low'
  },
  {
    value: 3,
    label: 'Price low to High'
  }
]

const Sort = () => {
  const dispatch = useAppDispatch()
  let [searchParams, setSearchParams] = useSearchParams()

  const sortValue = searchParams.get('sort')

  useEffect(() => {
    dispatch(sortBasket(sortValue))
  }, [sortValue])

  return (
    <div>
      <RadioList
        title="Sort By"
        onChange={(value) => {
          searchParams.set('sort', value as string)

          setSearchParams(searchParams)
        }}
        defaultValue={(searchParams.get('sort') ?? '0') as string}
        items={items}
      />
    </div>
  )
}

export default Sort
