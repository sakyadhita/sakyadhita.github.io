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
import '../../css/Buddhist.css'
import '../../css/animations.css'

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
      if (window.innerWidth <= 600) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    document.querySelector('#page-layout').addEventListener('scroll', () => {
      // create an object to keep track of dynamically added divs
      const documentObjects = {}
      sections.forEach((item) => {
        // generate an id which is the title of the paragraph, no spaces
        const id = item.data.title.replaceAll(' ', '')
        // add the location reference to the object
        documentObjects[id] = document.getElementById(id).getBoundingClientRect().top
      })

      // go through the documentObjects object
      Object.entries(documentObjects).forEach(([key, item]) => {
        // if the top of the div is less than one,
        // then set the scroll location
        if (item < 101) {
          setScrollLocation(key)
        }
      })
    })

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsLoading(true)

    if (sections.length > 0) setScrollLocation(sections[0].data.title.replaceAll(' ', ''))
    setIsLoading(false)
  }, [sections])

  /**
   * Compares the desired location to the current scrollLocation to change
   * selected location on sticky nav
   *
   * @param {String} location - desired location to compare against
   * @returns {String} - underline class if desired location matches current
   */
  function computeNavUnderline(location) {
    if (location === scrollLocation) return 'orange-underline'
    return ''
  }

  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  if (isLoading || !sections) {
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
    <div className="buddhist-container">
      {/* Page header with image and title */}
      {isMobile || window.innerHeight <= 500 ? (
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

      {/* Sticky Nav */}
      {sections.length > 0 && (
        <div className="buddhist-slider-wrapper">
          <div className="buddhist-slider">
            {/* generate the nav item links dynamically */}
            <ul className="buddhist-slider-nav">
              {sections.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.data.title.replaceAll(' ', '')}`}>
                    {' '}
                    <p
                      className={`hover-underline-animation ${computeNavUnderline(
                        item.data.title.replaceAll(' ', '')
                      )}`}
                    >
                      {' '}
                      {item.data.title}{' '}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="buddhist-vbar" />
          </div>
        </div>
      )}

      {/* The contents for buddhist culture */}
      <div className={sections.length > 0 && 'buddhist-contents'}>
        {/* Generate the seperate divs dynamically */}
        {sections.length === 0 ? (
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
          children
        )}
      </div>
    </div>
  )
}
