import React, { useState, useEffect } from 'react'
import '../../css/OrdinationIssue.css'
import ResourcesHeader from '../ResourcesHeader'

import Loader from '../Main/Loader'

import Header from '../../media/Lotus_Header.png'

export default function OrdinationIssue({ frontmatter, image, ordinationIssues, children }) {
  const [isMobile, setIsMobile] = useState(false)
  const arrowScrollToRef = React.createRef()
  const [isLoading, setIsLoading] = useState(true)

  // modifies isMobile state when window resizes
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600)
    }

    // event listener for resize
    window.addEventListener('resize', handleResize)
    handleResize()

    setIsLoading(false)

    // Removes event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <div>
      {/* Renders mobile or desktop layout based on screen size */}
      {isMobile || window.innerHeight <= 500 ? (
        <div>
          <ResourcesHeader
            image={image}
            title={frontmatter.title}
            height="max(40vh, 300px)"
            width="100%"
            arrowClickCallback={scrollToRef}
            showArrow={false}
          />

          <div className="page-content">
            {children}
          </div>
        </div>
      ) : (
        <div>
          <ResourcesHeader
            image={Header.src}
            title={frontmatter.title}
            text={frontmatter.description}
            height="max(75vh, 400px)"
            width="100%"
            arrowClickCallback={scrollToRef}
          />
          {ordinationIssues.length === 0 ? (
            <div
              className="coming-soon"
              style={{ height: '250px', display: 'grid', alignItems: 'center' }}
            >
              <h1
                className="page-content"
                style={{ marginLeft: '0px', width: '100vw', textAlign: 'center' }}
              >
                Coming soon
              </h1>
            </div>
          ) : (
            <div className="page-content">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
