import MainLayout from '@/features/main-layout'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('MainLayout component', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      product: {
        basket: []
      },
      filter: {
        search: ''
      }
    })
  })

  it('renders Loading component when isLoading is true', () => {
    render(
      <Router>
        <Provider store={store}>
          <MainLayout isLoading={true}>Content</MainLayout>
        </Provider>
      </Router>
    )

    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument()
  })

  it('renders Navbar, children, and Basket when isLoading is false', () => {
    render(
      <Router>
        <Provider store={store}>
          <MainLayout isLoading={false}>Content</MainLayout>
        </Provider>
      </Router>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Basket is empty')).toBeInTheDocument()
  })
})
