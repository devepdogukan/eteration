export type PaginationButtonProps = {
  onClick: () => void
  active?: boolean
  page?: string | number
  disabled?: boolean
  children?: React.ReactNode
}

export type PaginationProps = {
  totalItems: number
  itemsPerPage?: number
  onPageChange: (page: number) => void
}
