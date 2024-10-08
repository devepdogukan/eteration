import { AppState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'
import type { IFilterReducerState } from './type'

const initialState: IFilterReducerState = {
  list: [],
  search: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      const { id, value } = action.payload

      const filterIndex = state.list.findIndex((item) => item.id === id)

      if (filterIndex < 0) {
        state.list = [...state.list, { id, value: [value] }]
        return
      }
      state.list[filterIndex].value.push(value)
    },
    removeFilter: (state, action) => {
      const { id, value } = action.payload
      const filterIndex = state.list.findIndex((item) => item.id === id)
      if (filterIndex < 0) return
      const activeFilter = state.list[filterIndex]

      if (activeFilter.value.length > 1) {
        activeFilter.value = activeFilter.value.filter((filter) => filter !== value)
        return
      }
      state.list.splice(filterIndex, 1)
    },
    setSearch: (state, action) => {
      state.search = action.payload
    }
  }
})

export const { addFilter, removeFilter, setSearch } = filterSlice.actions
export const selectFilterState = (state: AppState) => state.filter
export default filterSlice.reducer
