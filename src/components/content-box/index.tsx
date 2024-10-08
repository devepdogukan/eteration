import { cn } from '@/lib/utils'
import { ContentBoxProps } from './type'

const ContentBox = ({ title, children, classes }: ContentBoxProps) => {
  return (
    <div className={cn('relative', classes?.wrapper)}>
      {title && (
        <p className={cn('font-normal text-xs text-label-gray mb-[6px]', classes?.title)}>
          {title}
        </p>
      )}
      <div className={cn('bg-white shadow-default p-[15px]', classes?.content)}>{children}</div>
    </div>
  )
}

export default ContentBox
