import { calculateTotalPrice } from '@/features/navbar/utils'
import { store } from '@/store'

const mockStore = {
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn()
}

describe('calculateTotalPrice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calculates total price correctly when basket has items', () => {
    mockStore.getState.mockReturnValue({
      product: {
        basket: [
          { id: '1', quantity: 2 },
          { id: '2', quantity: 3 }
        ],
        list: [
          { id: '1', price: '10' },
          { id: '2', price: '20' }
        ]
      }
    })

    jest.spyOn(store, 'getState').mockImplementation(mockStore.getState)

    const totalPrice = calculateTotalPrice()

    expect(totalPrice).toBe(80)
  })

  it('returns 0 when basket is empty', () => {
    mockStore.getState.mockReturnValue({
      product: {
        basket: [],
        list: [
          { id: '1', price: '10' },
          { id: '2', price: '20' }
        ]
      }
    })

    jest.spyOn(store, 'getState').mockImplementation(mockStore.getState)

    const totalPrice = calculateTotalPrice()

    expect(totalPrice).toBe(0)
  })

  it('returns 0 when products in the basket are not found in the list', () => {
    mockStore.getState.mockReturnValue({
      product: {
        basket: [{ id: '3', quantity: 1 }],
        list: [
          { id: '1', price: '10' },
          { id: '2', price: '20' }
        ]
      }
    })

    jest.spyOn(store, 'getState').mockImplementation(mockStore.getState)

    const totalPrice = calculateTotalPrice()

    expect(totalPrice).toBe(0)
  })
})
