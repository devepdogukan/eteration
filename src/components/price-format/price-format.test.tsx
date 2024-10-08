import PriceFormat from '@/components/price-format'
import { render, screen } from '@testing-library/react'

describe('PriceFormat component', () => {
  it('renders with default currency (TRY)', () => {
    render(<PriceFormat amount={1000} />)
    const priceElement = screen.getByText('₺1.000')
    expect(priceElement).toBeInTheDocument()
  })

  it('formats amount with specified currency (USD)', () => {
    render(<PriceFormat amount={1000} currency="USD" />)
    const priceElement = screen.getByText('$1.000')
    expect(priceElement).toBeInTheDocument()
  })

  it('formats amount with maximumFractionDigits as 2', () => {
    render(<PriceFormat amount={1000.75} options={{ maximumFractionDigits: 2 }} />)
    const priceElement = screen.getByText('₺1.000,75')
    expect(priceElement).toBeInTheDocument()
  })

  it('formats amount with specified locale and currency', () => {
    render(<PriceFormat amount={500} currency="EUR" />)
    const priceElement = screen.getByText('€500')
    expect(priceElement).toBeInTheDocument()
  })
})
