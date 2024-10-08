export interface IFilterItem {
  value: (string | number)[]
  id: string
}

export interface IFilterReducerState {
  list: IFilterItem[]
  search: string
}
