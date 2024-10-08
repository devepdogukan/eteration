import PaginationButton from '@/components/pagination/button'
import { fireEvent, render, screen } from '@testing-library/react'

describe('PaginationButton component', () => {
  const mockOnClick = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders with active style when active prop is true', () => {
    render(<PaginationButton active={true} page={1} onClick={mockOnClick} />)

    const button = screen.getByText('1')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-white')
    expect(button).toHaveClass('shadow-lg')
    expect(button).toHaveClass('text-eteration-blue-primary')
  })

  it('renders with default style when active prop is false', () => {
    render(<PaginationButton active={false} page={2} onClick={mockOnClick} />)

    const button = screen.getByText('2')
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveClass('bg-white')
    expect(button).not.toHaveClass('shadow-lg')
    expect(button).not.toHaveClass('text-eteration-blue-primary')
  })

  it('calls onClick function when clicked', () => {
    render(<PaginationButton active={false} page={3} onClick={mockOnClick} />)

    const button = screen.getByText('3')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<PaginationButton active={false} page={4} onClick={mockOnClick} disabled={true} />)

    const button = screen.getByText('4')
    expect(button).toBeDisabled()
  })

  it('does not call onClick when disabled', () => {
    render(<PaginationButton active={false} page={5} onClick={mockOnClick} disabled={true} />)

    const button = screen.getByText('5')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(0)
  })
})
