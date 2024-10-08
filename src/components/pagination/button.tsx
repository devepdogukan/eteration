import { cn } from '@/lib/utils'
import { PaginationButtonProps } from './type'

const PaginationButton = ({ active, page, onClick, disabled, children }: PaginationButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'bg-transparent min-w-6 min-h-6 rounded-lg text-gray-default p-1 px-3 hover:text-eteration-blue-primary disabled:pointer-events-none',
        {
          'bg-white shadow-lg text-eteration-blue-primary': active
        }
      )}>
      {children ? children : page}
    </button>
  )
}

export default PaginationButton
