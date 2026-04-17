import React, { useState, useEffect } from 'react'
import ResourcesHeader from '../ResourcesHeader'
import { cn } from '../../lib/utils'

import Loader from '../Main/Loader'

export default function OrdinationIssue({ frontmatter, ordinationIssues, children }) {
  const [isMobile, setIsMobile] = useState(false)
  const arrowScrollToRef = React.createRef()
  const [isLoading, setIsLoading] = useState(true)

  // modifies isMobile state when window resizes
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800)
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
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Renders mobile or desktop layout based on screen size */}
      {isMobile || (typeof window !== 'undefined' && window.innerHeight <= 500) ? (
        <div>
          <ResourcesHeader
            image={frontmatter.image}
            title={frontmatter.title}
            height="max(40vh, 300px)"
            width="100%"
            arrowClickCallback={scrollToRef}
            showArrow={false}
          />

          <div className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 font-body">
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:mb-8 prose-img:mt-12 prose-img:w-full prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ResourcesHeader
            image={frontmatter.image}
            title={frontmatter.title}
            text={frontmatter.description}
            height="max(75vh, 400px)"
            width="100%"
            arrowClickCallback={scrollToRef}
          />
          <div className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 font-body">
            {ordinationIssues.length === 0 ? (
              <div className="h-[250px] flex items-center justify-center">
                <h1 className="text-center font-heading font-bold text-3xl">Coming soon</h1>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:mb-8 prose-img:mt-12 prose-img:w-full prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto">
                {children}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
