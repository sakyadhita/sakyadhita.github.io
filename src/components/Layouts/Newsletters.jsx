/**
 *  This file renders the Newsletters section of the Resources page. It utilizes
 *  the NewsletterCard component, as well as the Shadcn Pagination component.
 *
 *  @author PatrickBrown1
 */
import React, { useState, useEffect, useMemo } from 'react'

import ResourcesHeader from '../ResourcesHeader'
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
const PublicationGrid = ({ displayedNewsletters, isMobile }) => {
  if (displayedNewsletters.length === 0) {
    return (
      <div className="w-full flex justify-center py-20 italic text-gray-500 font-body">
        We have no newsletters to show you at this time
      </div>
    )
  }
  return (
    <div className="flex flex-row justify-center flex-wrap mx-[16px] md:mx-[75px] mb-[70px] max-w-[1100px]">
      {displayedNewsletters.map((newsletter) => (
        <NewsletterCard
          key={newsletter.id}
          title={`Volume ${newsletter.data.volume}, Number ${newsletter.data.number}`}
          year={newsletter.data.year}
          image_url={newsletter.data.imageLink}
          optimized_url={newsletter.data.optimizedImage}
          redirect_link={newsletter.data.pdfLink}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}

export default function Newsletters({ frontmatter, newsletters }) {
  const [maxPages, setMaxPages] = useState(1)
  const [numPerPage, setNumPerPage] = useState(9)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const displayedNewsletters = useMemo(
    () => newsletters.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage),
    [numPerPage, currentPage, newsletters]
  )
  const arrowScrollToRef = React.createRef()

  // track window resizes to determine rerender
  useEffect(() => {
    function handleResize() {
      // handle max newsletters per page
      if (window.innerWidth <= 746) {
        setNumPerPage(4)
      } else if (window.innerWidth <= 1167) {
        setNumPerPage(6)
      } else {
        setNumPerPage(9)
      }

      if (window.innerWidth <= 600) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    // Remove event listener on cleanup
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

  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
    scrollToRef()
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
      } else if (items[items.length - 1]?.type !== PaginationEllipsis) {
        items.push(<PaginationEllipsis key={`ellipsis-${i}`} />)
      }
    }
    return items
  }

  return (
    <>
      {isMobile || (typeof window !== 'undefined' && window.innerHeight <= 500) ? (
        <ResourcesHeader
          title={frontmatter.title}
          image={frontmatter.image}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ResourcesHeader
          title={frontmatter.title}
          text={frontmatter.description}
          image={frontmatter.image}
          height="max(75vh, 400px)"
          width="100%"
          arrowClickCallback={scrollToRef}
        />
      )}

      <div className="flex flex-col items-center w-full">
        <h1
          ref={arrowScrollToRef}
          className="font-heading font-bold text-[26px] md:text-[36px] leading-[45px] text-black mt-[24px] md:mt-[86px] mb-[12px] md:mb-[30px]"
        >
          Latest
        </h1>
        <PublicationGrid displayedNewsletters={displayedNewsletters} isMobile={isMobile} />

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
                  className={
                    currentPage === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  }
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
                    currentPage === maxPages - 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  )
}
