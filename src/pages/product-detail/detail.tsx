import PriceFormat from '@/components/price-format'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { addBasket, selectProductState } from '@/store/reducers/product'
import { Navigate, useParams } from 'react-router-dom'

const ProductDetailCard = () => {
  const { productId } = useParams()
  const { list } = useAppSelector(selectProductState)
  const data = list.find((product) => product.id === productId)
  const dispatch = useAppDispatch()

  if (list.length === 0) return

  if (!data) return <Navigate to="/404" />

  return (
    <div className="flex-1 h-fit bg-white flex max-md:flex-col p-[10px] shadow-default gap-[10px]">
      <div className="w-full h-[400px] flex-1">
        <img src={data.image} className="w-full h-full" alt={data.name} />
      </div>
      <div className="flex-1 flex flex-col p-[10px]">
        <div className="mb-5">
          <p className="font-normal text-2xl">{data.name}</p>
          <p className="text-eteration-blue-primary text-2xl font-medium mt-[10px]">
            <PriceFormat amount={data.price} />
          </p>
        </div>
        <Button
          onClick={() => dispatch(addBasket({ id: data.id }))}
          className="w-full font-bold text-lg">
          Add to Cart
        </Button>
        <p className="text-lg mt-5">{data.description}</p>
      </div>
    </div>
  )
}

export default ProductDetailCard
