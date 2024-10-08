import ListWrapper from '@/features/list-wrapper'
import { render, screen } from '@testing-library/react'

describe('ListWrapper component', () => {
  it('renders with given title and children', () => {
    const title = 'Test Title'
    const children = <div>Test Content</div>

    render(<ListWrapper title={title}>{children}</ListWrapper>)

    expect(screen.getByText(title)).toBeInTheDocument()

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders without title', () => {
    const children = <div>Test Content</div>

    render(<ListWrapper>{children}</ListWrapper>)

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
