import { Checkbox } from '@/components/ui/checkbox'
import ListWrapper from '@/features/list-wrapper'
import { ListItem, ListProps } from '@/features/list-wrapper/type'
import { SearchIcon } from 'lucide-react'
import { useId, useMemo, useState } from 'react'

interface CheckboxListProps extends Omit<ListProps, 'items' | 'onChange'> {
  isSearchable?: boolean
  items: (ListItem & {
    checked?: boolean
  })[]
  onChange: ({ checked, key }: { checked: boolean; key: string }) => void
}

const CheckboxList = ({ items, title, isSearchable = true, onChange }: CheckboxListProps) => {
  const id = useId()
  const [search, setSearch] = useState<string>('')

  const filteredItems = useMemo(() => {
    if (items.length === 0) return []
    if (!search) return items

    return items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
  }, [search, items])
  return (
    <ListWrapper title={title}>
      <div>
        {isSearchable && (
          <div className="h-10 w-full relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="bg-[#fafbfb] pl-10 h-full w-full font-medium"
              placeholder="Search"
            />
            <SearchIcon className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 text-[#868da5]" />
          </div>
        )}
        <div className="h-24 overflow-y-scroll mt-4">
          <div className="flex flex-col items-center gap-2">
            {filteredItems.map((item) => (
              <div className="items-center flex space-x-2 w-full" key={item.value}>
                <Checkbox
                  onCheckedChange={(checked) =>
                    onChange({ checked: checked as boolean, key: item.value as string })
                  }
                  checked={item.checked}
                  id={`checkbox-${id}-${item.value.toString()}`}
                />
                <label
                  htmlFor={`checkbox-${id}-${item.value.toString()}`}
                  className="select-none cursor-pointer">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ListWrapper>
  )
}

export default CheckboxList
