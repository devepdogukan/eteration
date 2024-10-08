export type ListItem = {
  value: string | number
  label: string
}

export type ListWrapperProps = {
  title?: string
  children: React.ReactNode
}

export type ListProps = {
  title?: string
  items: ListItem[]
  defaultValue?: string
  onChange?: (v: string | boolean) => void
}
