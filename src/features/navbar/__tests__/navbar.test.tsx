import Navbar from '@/features/navbar'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

jest.mock('@/features/navbar/utils', () => ({
  calculateTotalPrice: jest.fn(() => 100)
}))

const mockStore = configureStore([])

describe('Navbar component', () => {
  it('renders the Navbar with search input and total price', () => {
    const store = mockStore({
      filter: {
        search: ''
      }
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText(/Eteration/i)).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText(/search/i)
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).not.toBeDisabled()

    expect(screen.getByText(/100/i)).toBeInTheDocument()

    expect(screen.getByText(/Doğukan/i)).toBeInTheDocument()
  })

  it('disables the search input on product detail page', () => {
    const store = mockStore({
      filter: {
        search: ''
      }
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Navbar />
        </MemoryRouter>
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    expect(searchInput).toBeDisabled()
  })
})
