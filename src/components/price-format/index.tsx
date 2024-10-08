import { PriceFormatProps } from './type'

const PriceFormat = ({ amount, currency = 'TRY', options }: PriceFormatProps) => {
  return (
    <>
      {Number(amount).toLocaleString('tr-TR', {
        currency,
        style: 'currency',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 0,
        ...options
      })}
    </>
  )
}

export default PriceFormat
