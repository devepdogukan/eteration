import ContentBox from '@/components/content-box'
import PriceFormat from '@/components/price-format'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { addBasket, decreaseBasket, selectProductState } from '@/store/reducers/product'
import { MinusIcon, PlusIcon } from 'lucide-react'
import Checkout from './checkout'

const EmptyBasket = () => (
  <div
    className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
    role="alert">
    Basket is empty
  </div>
)

const Basket = ({ disableHidden = false }: { disableHidden?: boolean }) => {
  const { basket, list } = useAppSelector(selectProductState)
  const dispatch = useAppDispatch()

  return (
    <div
      className={cn('sticky top-5  w-full flex flex-col gap-0 h-fit', {
        'max-lg:hidden min-w-sm max-w-sm  gap-8 ml-[30px]': !disableHidden
      })}>
      {basket.length > 0 ? (
        <>
          <ContentBox classes={{ content: 'p-[10px]' }}>
            <div className="flex flex-col gap-3">
              {basket.map((item, i) => {
                const basketProduct = list.find((product) => product.id === item.id)

                if (!basketProduct) return

                return (
                  <div className="flex items-start gap-3" key={i}>
                    <div>
                      <p className="text-sm text-black">{basketProduct.name}</p>
                      <p className="text-xs font-medium text-eteration-blue-primary">
                        <PriceFormat amount={basketProduct.price} />
                      </p>
                    </div>
                    <div className="flex items-center ml-auto">
                      <button
                        data-testid="decrease-basket-button"
                        onClick={() => dispatch(decreaseBasket(item.id))}
                        className="flex-1 min-w-[25px] h-[25px] flex items-center justify-center bg-gray-button">
                        <MinusIcon className="w-4 h-4 text-eteration-blue-dark" />
                      </button>
                      <div className="min-w-fit  w-[25px]  bg-eteration-blue-primary flex px-0.5 items-center justify-center h-full flex-1">
                        <p className="text-lg text-white">{item.quantity}</p>
                      </div>
                      <button
                        data-testid="increase-basket-button"
                        onClick={() => dispatch(addBasket({ id: item.id }))}
                        className="flex-1 min-w-[25px] h-[25px] flex items-center justify-center bg-gray-button">
                        <PlusIcon className="w-4 h-4 text-eteration-blue-dark" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </ContentBox>
          <Checkout />
        </>
      ) : (
        <EmptyBasket />
      )}
    </div>
  )
}

export default Basket
