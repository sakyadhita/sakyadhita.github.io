/**
 *  This file renders the Newsletters section of the Resources page. It utilizes
 *  the NewsletterCard component, as well as the Shadcn Pagination component.
 *
 *  @author PatrickBrown1
 */
import React, { useState, useEffect, useMemo } from 'react'

import NewsletterCard from '../Newsletters/NewsletterCard'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'

// renders the current newsletters from props in a grid
const PublicationGrid = ({ displayedNewsletters }) => {
  if (displayedNewsletters.length === 0) {
    return (
      <div
        className="
          flex w-full justify-center py-20 font-body text-gray-500 italic
        "
      >
        We have no newsletters to show you at this time
      </div>
    )
  }
  return (
    <div
      className="
        mx-4 mb-16 flex max-w-5xl flex-row flex-wrap justify-center
        md:mx-20
      "
    >
      {displayedNewsletters.map((newsletter) => (
        <NewsletterCard
          key={newsletter.id}
          title={`Volume ${newsletter.data.volume}, Number ${newsletter.data.number}`}
          year={newsletter.data.year}
          image_url={newsletter.data.imageLink}
          optimized_url={newsletter.data.optimizedImage}
          redirect_link={newsletter.data.pdfLink}
        />
      ))}
    </div>
  )
}

interface NewsletterData {
  id: string
  data: {
    volume: number
    number: number
    year: number | string
    imageLink?: string
    optimizedImage?: string
    pdfLink: string
  }
}

interface NewslettersProps {
  newsletters: NewsletterData[]
}

export default function Newsletters({ newsletters }: NewslettersProps) {
  const [maxPages, setMaxPages] = useState(1)
  const [numPerPage, setNumPerPage] = useState(9)
  const [currentPage, setCurrentPage] = useState(0)
  const displayedNewsletters = useMemo(
    () => newsletters.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage),
    [numPerPage, currentPage, newsletters]
  )
  const latestRef = React.createRef()

  // track window resizes to determine numPerPage
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 746) {
        setNumPerPage(4)
      } else if (window.innerWidth <= 1167) {
        setNumPerPage(6)
      } else {
        setNumPerPage(9)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // update maxPages when newsletters or numPerPage changes
  useEffect(() => {
    setMaxPages(Math.ceil(newsletters.length / numPerPage))
  }, [newsletters.length, numPerPage])

  // make sure current page never exceeds maxPages
  useEffect(() => {
    if (currentPage >= maxPages && maxPages > 0) {
      setCurrentPage(maxPages - 1)
    }
  }, [currentPage, maxPages])

  const scrollToLatest = () => {
    if (latestRef.current) {
      latestRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
    scrollToLatest()
  }

  // Generate pagination items logic (replicating react-paginate behavior)
  const getPaginationItems = () => {
    const items = []
    const range = 2 // Number of pages to show around current page
    const margin = 1 // Number of pages to show at the start and end

    for (let i = 0; i < maxPages; i++) {
      if (
        i < margin || // Start pages
        i >= maxPages - margin || // End pages
        (i >= currentPage - range && i <= currentPage + range) // Pages around current
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(i)
              }}
              href="#"
              className="cursor-pointer font-body"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (items.at(-1)?.type !== PaginationEllipsis) {
        items.push(<PaginationEllipsis key={`ellipsis-${i}`} />)
      }
    }
    return items
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1
        ref={latestRef}
        className="
          mt-6 mb-3 font-heading text-2xl font-bold text-black
          md:mt-20 md:mb-8 md:text-4xl
        "
      >
        Latest
      </h1>
      <PublicationGrid displayedNewsletters={displayedNewsletters} />

      <div className="mt-8 mb-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 0) handlePageChange(currentPage - 1)
                }}
                href="#"
                className={currentPage === 0 ? 'pointer-events-none opacity-50' : `
                  cursor-pointer
                `}
              />
            </PaginationItem>

            {getPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < maxPages - 1) handlePageChange(currentPage + 1)
                }}
                href="#"
                className={
                  currentPage === maxPages - 1 ? `
                    pointer-events-none opacity-50
                  ` : `cursor-pointer`
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
