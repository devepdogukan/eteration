import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useId } from 'react'
import ListWrapper from '../list-wrapper'
import { ListProps } from '../list-wrapper/type'

const RadioList = ({ title, items, defaultValue, onChange }: ListProps) => {
  const id = useId()

  return (
    <ListWrapper title={title}>
      <RadioGroup onValueChange={onChange} defaultValue={defaultValue}>
        {items.map((item) => (
          <div className="flex items-center space-x-2" key={item.value}>
            <RadioGroupItem
              value={item.value.toString()}
              id={`radio-${id}-${item.value.toString()}`}
            />
            <label
              htmlFor={`radio-${id}-${item.value.toString()}`}
              className="text-sm font-normal text-label-default cursor-pointer">
              {item.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </ListWrapper>
  )
}

export default RadioList
