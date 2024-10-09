import PriceFormat from '@/components/price-format'
import { Button } from '@/components/ui/button'
import { Product } from '@/services/product/type'
import { useAppDispatch } from '@/store'
import { addBasket } from '@/store/reducers/product'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ image, name, id, price }: Partial<Product>) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <div
      className="bg-white p-[10px] flex flex-col gap-[15px] h-fit cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}>
      <div className="h-[160px] w-full">
        <img className="w-full h-full" src={image} alt={name} />
      </div>
      <p className="text-eteration-blue-primary font-medium">
        <PriceFormat amount={price ?? 0} />
      </p>
      <p className="font-medium line-clamp-1">{name}</p>
      <Button
        className="w-full"
        onClick={(e) => {
          e.stopPropagation()
          dispatch(addBasket({ id }))
        }}>
        Add to Cart
      </Button>
    </div>
  )
}

export default ProductCard
