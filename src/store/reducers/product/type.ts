import { Product } from '@/services/product/type'

export interface IBasketItem {
  quantity: number
  id: string
}

export interface IProductReducerState {
  list: Product[]
  basket: IBasketItem[]
  isLoading: boolean
  error: null | string
}
