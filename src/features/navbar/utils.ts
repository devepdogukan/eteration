import { store } from '@/store'

export const calculateTotalPrice = () => {
  const {
    product: { basket, list }
  } = store.getState()

  const totalPrice = basket.reduce((acc, cur) => {
    const product = list.find((item) => item.id === cur.id)
    const totalPrice = Number(product?.price) * cur.quantity
    return (acc += isNaN(totalPrice) ? 0 : totalPrice)
  }, 0)

  return totalPrice ?? 0
}
