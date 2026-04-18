/**
 * The Buddhist culture page contains information
 * about Buddhism and relevant information that the
 * organization wants to display
 *
 * This page requires a single prop:
 *  sections - array - the data needed to render the
 *  information
 *
 * The array will contain objects of the following form:
 *  data.title - string - the title of the paragraph
 *  body - string - the text to display
 *
 * @summary     Buddhist Culture
 * @author      Amitesh Sharma
 */

import React, { useState, useEffect } from 'react'
import ResourcesHeader from '../ResourcesHeader'
import { cn } from '../../lib/utils'

import Loader from '../Main/Loader'

export default function BuddhistCulture({ frontmatter, sections, children }) {
  // Keeps track of the current location for the sticky navbar
  const [scrollLocation, setScrollLocation] = useState()
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const arrowScrollToRef = React.createRef()

  // Effect to update the sticky nav on scroll
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    const scrollHandler = () => {
      const scrollContainer = document.querySelector('#page-layout')
      if (!scrollContainer) return

      // create an object to keep track of dynamically added divs
      const documentObjects = {}
      sections.forEach((item) => {
        const id = item.data.title.replaceAll(' ', '')
        const element = document.getElementById(id)
        if (element) {
          documentObjects[id] = element.getBoundingClientRect().top
        }
      })

      Object.entries(documentObjects).forEach(([key, item]) => {
        if (item < 200) {
          setScrollLocation(key)
        }
      })
    }

    const scrollContainer = document.querySelector('#page-layout')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', scrollHandler)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [sections])

  useEffect(() => {
    setIsLoading(true)
    if (sections.length > 0) setScrollLocation(sections[0].data.title.replaceAll(' ', ''))
    setIsLoading(false)
  }, [sections])

  function computeNavUnderline(location) {
    if (location === scrollLocation) return 'text-brand-orange border-b-2 border-brand-orange'
    return 'border-b-2 border-transparent'
  }

  const scrollToRef = () => {
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  if (isLoading || !sections) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Page header with image and title */}
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

      <div className="w-full flex flex-col md:flex-row">
        {/* Sticky Nav */}
        {!isMobile && sections.length > 0 && (
          <aside className="hidden md:block w-64 shrink-0 h-fit sticky top-32 mt-24 ml-8 lg:ml-16">
            <nav className="relative flex border-r border-gray-300 pr-8">
              <ul className="flex flex-col list-none p-0 m-0 space-y-4 w-full">
                {sections.map((item) => (
                  <li key={item.id} className="py-1">
                    <a
                      href={`#${item.data.title.replaceAll(' ', '')}`}
                      className={cn(
                        'font-body text-lg transition-all hover:text-brand-orange no-underline hover:no-underline pb-1 block w-full truncate',
                        computeNavUnderline(item.data.title.replaceAll(' ', ''))
                      )}
                    >
                      {item.data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* The contents for buddhist culture */}
        <div className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 font-body">
          {sections.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center">
              <h1 className="text-center font-heading font-bold text-3xl">Coming soon</h1>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:mb-8 prose-img:mt-12 prose-img:w-full prose-img:rounded-lg prose-img:shadow-lg prose-img:object-cover">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
