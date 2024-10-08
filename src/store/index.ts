import filterSlice from '@/store/reducers/filter'
import productSlice from '@/store/reducers/product'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const productPersistConfig = {
  key: 'basket',
  storage,
  blacklist: ['list', 'error', 'isLoading']
}

const filterPersistConfig = {
  key: 'filter',
  storage,
  blacklist: ['search']
}

const reducers = combineReducers({
  product: persistReducer(productPersistConfig, productSlice),
  filter: persistReducer(filterPersistConfig, filterSlice)
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
