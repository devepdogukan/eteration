import Basket from '@/features/navbar/basket'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('Basket component', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      product: {
        basket: [],
        list: []
      },
      filter: {
        search: ''
      }
    })
  })

  it('renders EmptyBasket when basket is empty', () => {
    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Basket is empty')
  })

  it('renders basket items and Checkout when basket has items', () => {
    const store = mockStore({
      product: {
        basket: [{ id: 1, quantity: 2 }],
        list: [{ id: 1, name: 'Test Product', price: 100 }]
      }
    })

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Checkout')).toBeInTheDocument()
  })

  it('dispatches decreaseBasket action when minus button is clicked', () => {
    const decreaseBasketMock = jest.fn()
    const store = mockStore({
      product: {
        basket: [{ id: 1, quantity: 2 }],
        list: [{ id: 1, name: 'Test Product', price: 100 }]
      }
    })

    store.dispatch = decreaseBasketMock

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    )

    const minusButton = screen.getByTestId('decrease-basket-button')
    fireEvent.click(minusButton)

    expect(decreaseBasketMock).toHaveBeenCalledWith({ payload: 1, type: 'product/decreaseBasket' })
  })

  it('dispatches addBasket action when plus button is clicked', () => {
    const decreaseBasketMock = jest.fn()
    const store = mockStore({
      product: {
        basket: [{ id: 1, quantity: 2 }],
        list: [{ id: 1, name: 'Test Product', price: 100 }]
      }
    })

    store.dispatch = decreaseBasketMock

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    )

    const minusButton = screen.getByTestId('increase-basket-button')
    fireEvent.click(minusButton)

    expect(decreaseBasketMock).toHaveBeenCalledWith({
      payload: { id: 1 },
      type: 'product/addBasket'
    })
  })

  it('renders correctly when basketProduct is not found', () => {
    const store = mockStore({
      product: {
        basket: [{ id: 1, quantity: 2 }],
        list: []
      }
    })

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    )
  })
})
