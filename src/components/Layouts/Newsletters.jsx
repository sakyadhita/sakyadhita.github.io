/**
 *  This file renders the Newsletters section of the Resources page. It utilizes
 *  the NewsletterCard component, as well as the react-paginate package.
 *
 *  @author PatrickBrown1
 */
import React, { useState, useEffect, useMemo } from 'react'
import ReactPaginate from 'react-paginate'

import ResourcesHeader from '../ResourcesHeader'
import NewsletterCard from '../Newsletters/NewsletterCard'
import '../../css/Newsletters.css'

// renders the current newsletters from props in a grid
const PublicationGrid = ({ displayedNewsletters, isMobile }) => {
  if (displayedNewsletters.length === 0) {
    return (
      <div className="NewsletterContainer">We have no newsletters to show you at this time</div>
    )
  }
  return (
    <div className="NewsletterContainer">
      {displayedNewsletters.map((newsletter) => (
        <NewsletterCard
          key={newsletter.id}
          title={`Volume ${newsletter.data.volume}, Number ${newsletter.data.number}`}
          year={newsletter.data.year}
          image_url={newsletter.data.imageLink}
          redirect_link={newsletter.data.pdfLink}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}

export default function Newsletters({ frontmatter, image, newsletters }) {
  const [maxPages, setMaxPages] = useState(9)
  const [numPerPage, setNumPerPage] = useState(9)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const displayedNewsletters = useMemo(
    () => newsletters.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage),
    [maxPages, numPerPage, currentPage, newsletters]
  )
  const arrowScrollToRef = React.createRef()

  // track window resizes to determine rerender
  useEffect(() => {
    function handleResize() {
      // handle max newsletters per page
      // want 6 at 1052,
      // 4 at 746
      if (window.innerWidth <= 746) {
        setNumPerPage(4)
        setMaxPages(Math.ceil(newsletters.length / 4))
      } else if (window.innerWidth <= 1167) {
        setNumPerPage(6)
        setMaxPages(Math.ceil(newsletters.length / 6))
      } else {
        setNumPerPage(9)
        setMaxPages(Math.ceil(newsletters.length / 9))
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
  }, []) // Empty array ensures that effect is only run on mount

  // make sure current page never exceeds maxPages
  useEffect(() => {
    if (currentPage >= maxPages && currentPage > 0) {
      setCurrentPage(maxPages - 1)
    }
    if (window.innerWidth <= 746) {
      setNumPerPage(4)
      setMaxPages(Math.ceil(newsletters.length / 4))
    } else if (window.innerWidth <= 1167) {
      setNumPerPage(6)
      setMaxPages(Math.ceil(newsletters.length / 6))
    } else {
      setNumPerPage(9)
      setMaxPages(Math.ceil(newsletters.length / 9))
    }
  }, [currentPage, maxPages, newsletters])

  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <>
      {isMobile || window.innerHeight <= 500 ? (
        <ResourcesHeader
          title={frontmatter.title}
          image={image}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ResourcesHeader
          title={frontmatter.title}
          text={frontmatter.description}
          image={image}
          height="max(75vh, 400px)"
          width="100%"
          arrowClickCallback={scrollToRef}
        />
      )}

      <div className="NewsletterPage">
        <h1
          ref={arrowScrollToRef}
          className={!isMobile ? 'NewsletterPage__title' : 'NewsletterPage__title--mobile'}
        >
          Latest
        </h1>
        <PublicationGrid displayedNewsletters={displayedNewsletters} isMobile={isMobile} />
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={maxPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          forcePage={currentPage}
          onPageChange={(e) => setCurrentPage(e.selected)}
          containerClassName="newsletter__pagination"
          activeClassName="newsletter__pagination--active"
        />
      </div>
    </>
  )
}
