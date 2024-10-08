import Pagination from '@/components/pagination'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Pagination component', () => {
  const totalItems = 50
  const itemsPerPage = 10
  const onPageChangeMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    window.history.pushState({}, '', '/')
  })

  it('renders pagination buttons correctly', () => {
    render(
      <Router>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChangeMock}
        />
      </Router>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()

    expect(screen.getByTestId('prev-pagination').parentElement).toBeDisabled()
    expect(screen.getByTestId('next-pagination').parentElement).toBeEnabled()
  })

  it('handles zero current page correctly', () => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set('page', '0')
    window.history.pushState({}, '', `?${searchParams.toString()}`)

    render(
      <Router>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChangeMock}
        />
      </Router>
    )

    expect(onPageChangeMock).toHaveBeenCalledWith(1)
  })

  it('handles current page greater than total pages', () => {
    const searchParams = new URLSearchParams(window.location.search)
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    searchParams.set('page', (totalPages + 1).toString())

    window.history.pushState({}, '', `?${searchParams.toString()}`)

    render(
      <Router>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChangeMock}
        />
      </Router>
    )

    expect(onPageChangeMock).toHaveBeenCalledWith(totalPages)
  })

  it('renders ellipsis when there are many pages', () => {
    render(
      <Router>
        <Pagination totalItems={100} itemsPerPage={10} onPageChange={onPageChangeMock} />
      </Router>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('navigates to the next page when clicking right arrow', () => {
    render(
      <Router>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChangeMock}
        />
      </Router>
    )

    fireEvent.click(screen.getByTestId('next-pagination'))
    expect(onPageChangeMock).toHaveBeenCalledWith(2)
  })

  it('navigates to the previous page when clicking left arrow', () => {
    render(
      <Router>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChangeMock}
        />
      </Router>
    )

    fireEvent.click(screen.getByTestId('next-pagination').parentElement as HTMLElement)
    fireEvent.click(screen.getByTestId('prev-pagination').parentElement as HTMLElement)
    expect(onPageChangeMock).toHaveBeenCalledWith(2)
  })

  it('navigates to the correct page when clicking page number', () => {
    render(
      <Router>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChangeMock}
        />
      </Router>
    )

    fireEvent.click(screen.getByText('5'))
    expect(onPageChangeMock).toHaveBeenCalledWith(5)
  })

  it('handles edge cases correctly', () => {
    render(
      <Router>
        <Pagination totalItems={0} itemsPerPage={10} onPageChange={onPageChangeMock} />
      </Router>
    )

    expect(screen.queryByText('1')).not.toBeInTheDocument()
  })

  it('renders ellipsis correctly when navigating through pages', () => {
    render(
      <Router>
        <Pagination totalItems={100} itemsPerPage={10} onPageChange={onPageChangeMock} />
      </Router>
    )

    fireEvent.click(screen.getByText('1'))
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })
})
