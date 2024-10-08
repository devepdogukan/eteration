import ContentBox from '@/components/content-box'
import { ListWrapperProps } from './type'

const ListWrapper = ({ title, children }: ListWrapperProps) => {
  return <ContentBox title={title}>{children}</ContentBox>
}

export default ListWrapper
