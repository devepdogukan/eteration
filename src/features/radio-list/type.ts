export type RadioItem = {
  value: string | number
  label: string
}

export type RadioListProps = {
  title?: string
  items: RadioItem[]
  defaultValue?: string
}
