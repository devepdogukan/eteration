import ContentBox from '@/components/content-box/index'
import { render, screen } from '@testing-library/react'

describe('ContentBox Component', () => {
  it('renders without crashing', () => {
    render(<ContentBox title="Test Title">Test Content</ContentBox>)
    const titleElement = screen.getByText('Test Title')
    const contentElement = screen.getByText('Test Content')

    expect(titleElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
  })

  it('renders children content correctly', () => {
    render(<ContentBox title="Title Example">Example Content</ContentBox>)
    const contentElement = screen.getByText('Example Content')

    expect(contentElement).toBeInTheDocument()
  })

  it('applies the correct classes from props', () => {
    const customClasses = {
      wrapper: 'custom-wrapper-class',
      title: 'custom-title-class',
      content: 'custom-content-class'
    }

    const { container } = render(
      <ContentBox title="Title Example" classes={customClasses}>
        Custom Content
      </ContentBox>
    )

    const wrapperElement = container.firstChild
    const titleElement = screen.getByText('Title Example')
    const contentElement = screen.getByText('Custom Content')

    expect(wrapperElement).toHaveClass('custom-wrapper-class')
    expect(titleElement).toHaveClass('custom-title-class')
    expect(contentElement).toHaveClass('custom-content-class')
  })

  it('renders without title when no title prop is provided', () => {
    render(<ContentBox>Content without title</ContentBox>)
    const titleElement = screen.queryByText('Test Title')

    expect(titleElement).toBeNull()
    const contentElement = screen.getByText('Content without title')
    expect(contentElement).toBeInTheDocument()
  })
})
