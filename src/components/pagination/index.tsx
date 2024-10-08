import { PRODUCT_PAGINATION_COUNT } from '@/config/constants'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PaginationButton from './button'
import { PaginationProps } from './type'

const Pagination = ({
  totalItems,
  itemsPerPage = PRODUCT_PAGINATION_COUNT,
  onPageChange
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  let [searchParams, setSearchParams] = useSearchParams()

  const currentQueryPage = searchParams.get('page')

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    searchParams.set('page', pageNumber.toString())
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const convertToNumber = Number(currentQueryPage)
    if (!currentQueryPage || isNaN(convertToNumber) || totalPages === 0) return

    if (convertToNumber === 0) {
      handlePageClick(1)
      return
    }

    if (convertToNumber > totalPages) {
      handlePageClick(totalPages)
      return
    }

    onPageChange(convertToNumber)
    setCurrentPage(convertToNumber)
  }, [currentQueryPage, totalPages])

  const renderPageNumbers = () => {
    const pages = []
    const pageNeighbors = 1

    let startPage = Math.max(1, currentPage - pageNeighbors)
    let endPage = Math.min(totalPages, currentPage + pageNeighbors)

    if (startPage > 1) {
      pages.push(
        <PaginationButton
          key={1}
          onClick={() => handlePageClick(1)}
          page={1}
          active={currentPage === 1}
        />
      )
      if (startPage > 2) {
        pages.push(<span key="ellipsis1">...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageClick(i)}
          page={i}
          active={i === currentPage}
        />
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2">...</span>)
      }
      pages.push(
        <PaginationButton
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          page={totalPages}
          active={currentPage === totalPages}
        />
      )
    }

    return pages
  }

  return (
    <div className="flex w-full items-center gap-3 justify-center">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}>
        <ArrowLeft data-testid="prev-pagination" />
      </PaginationButton>

      {renderPageNumbers()}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}>
        <ArrowRight data-testid="next-pagination" />
      </PaginationButton>
    </div>
  )
}

export default Pagination
