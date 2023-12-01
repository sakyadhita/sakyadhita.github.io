/**
 * Displays landing page for Resources tab. The page is just a full scale image with a title header.
 *
 * @summary Renders Resouces Landing Page.
 * @author Amrit Kaur Singh
 */

import React, { useState, useEffect } from 'react'
import ResourcesHeader from '../ResourcesLanding/ResourcesLandingPageHeader'

const MAX_MOBILE_WIDTH = 750

export default function LandingPage({ frontmatter }) {
  // tracks layout of screen
  const [isMobile, setMobileView] = useState(false)
  const [screenDim, setScreenDim] = useState({
    width: 0,
    height: 0
  })

  // handler to call on window resize
  useEffect(() => {
    function handleResize() {
      setScreenDim({ width: window.innerWidth, height: window.innerHeight })
      if (window.innerWidth <= MAX_MOBILE_WIDTH) {
        setMobileView(true)
      } else {
        setMobileView(false)
      }
    }
    // add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    // remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <ResourcesHeader
        image={frontmatter.image}
        title={frontmatter.title}
        // height takes up rest of screen, excluding mobile navbar
        height="calc(100vh - 50px)"
        width="100%"
      />
    )
  }

  return (
    <ResourcesHeader
      image={frontmatter.image}
      title={frontmatter.title}
      text={frontmatter.description}
      // height takes up rest of screen, excluding mobile navbar
      // first conditional takes care of mobile - landscape view
      height={screenDim.height <= 700 ? 'calc(100vh - 50px)' : 'calc(100vh - 190px)'}
      width="100%"
    />
  )
}
