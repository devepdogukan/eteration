import ContentBox from '@/components/content-box'
import PriceFormat from '@/components/price-format'
import { Button } from '@/components/ui/button'
import { calculateTotalPrice } from './utils'

const Checkout = () => {
  return (
    <ContentBox classes={{ content: 'p-[10px]' }}>
      <p className="text-base">
        Total Price:{' '}
        <strong className="text-eteration-blue-primary">
          <PriceFormat amount={calculateTotalPrice()} />
        </strong>
      </p>
      <Button className="mt-3 w-full">Checkout</Button>
    </ContentBox>
  )
}

export default Checkout
