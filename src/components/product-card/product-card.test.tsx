import ProductCard from '@/components/product-card'
import { addBasket } from '@/store/reducers/product'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('ProductCard component', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      product: {
        basket: []
      }
    })
  })

  it('renders product information correctly', () => {
    const product = {
      image: 'https://example.com/image.jpg',
      name: 'Test Product',
      id: '1',
      price: '1000'
    }

    render(
      <Provider store={store}>
        <Router>
          <ProductCard {...product} />
        </Router>
      </Provider>
    )

    const imageElement = screen.getByAltText(product.name)
    const nameElement = screen.getByText(product.name)
    const priceElement = screen.getByText('₺1.000')

    expect(imageElement).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
    expect(priceElement).toBeInTheDocument()
  })

  it('dispatches addBasket action when Add to Cart button is clicked', () => {
    const product = {
      image: 'https://example.com/image.jpg',
      name: 'Test Product',
      id: '1',
      price: '1000'
    }

    render(
      <Provider store={store}>
        <Router>
          <ProductCard {...product} />
        </Router>
      </Provider>
    )

    const buttonElement = screen.getByRole('button', { name: /Add to Cart/i })
    fireEvent.click(buttonElement)

    const actions = store.getActions()
    expect(actions).toEqual([addBasket({ id: product.id })])
  })

  it('navigates to the product detail page when the card is clicked', () => {
    const product = {
      image: 'https://example.com/image.jpg',
      name: 'Test Product',
      id: '1',
      price: '1000'
    }

    render(
      <Provider store={store}>
        <Router>
          <ProductCard {...product} />
        </Router>
      </Provider>
    )

    const cardElement = screen.getByAltText(product.name).closest('div')
    fireEvent.click(cardElement!)

    expect(window.location.pathname).toBe(`/product/${product.id}`)
  })

  it('renders PriceFormat with default value when price is undefined', () => {
    const product = {
      image: 'https://example.com/image.jpg',
      name: 'Test Product',
      id: '1',
      price: undefined
    }

    render(
      <Provider store={store}>
        <Router>
          <ProductCard {...product} />
        </Router>
      </Provider>
    )

    const priceElement = screen.getByText('₺0')
    expect(priceElement).toBeInTheDocument()
  })
})
