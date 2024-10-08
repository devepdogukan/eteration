import ProductService from '@/services/product'
import { Product } from '@/services/product/type'
import { AppState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProductReducerState } from './type'

const initialState: IProductReducerState = {
  list: [],
  basket: [],
  isLoading: false,
  error: null
}

export const fetchAllProducts = createAsyncThunk<Product[]>('product/getAll', async () => {
  const response = await ProductService.getAllProducts()
  return response
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    decreaseBasket: (state, action) => {
      const id = action.payload
      const findedItem = state.list.find((item) => item.id === id)
      if (!findedItem) return
      const basketIndex = state.basket.findIndex((item) => item.id === id)

      if (basketIndex < 0) return
      const activeItem = state.basket[basketIndex]

      if (activeItem.quantity > 1) {
        activeItem.quantity -= 1
        return
      }

      state.basket.splice(basketIndex, 1)
    },
    addBasket: (state, action) => {
      const { id } = action.payload
      const basketIndex = state.basket.findIndex((item) => item.id === id)

      if (basketIndex < 0) {
        state.basket = [...state.basket, { id, quantity: 1 }]
      } else {
        state.basket[basketIndex].quantity += 1
      }
    },
    sortBasket: (state, action) => {
      switch (action.payload) {
        case '1':
          state.list = state.list.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          break

        case '2':
          state.list = state.list.sort((a, b) => Number(b.price) - Number(a.price))
          break

        case '3':
          state.list = state.list.sort((a, b) => Number(a.price) - Number(b.price))
          break

        default:
          state.list = state.list.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          break
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.list = action.payload.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    })
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
  }
})

export const { addBasket, decreaseBasket, sortBasket } = productSlice.actions
export const selectProductState = (state: AppState) => state.product
export default productSlice.reducer
