import React from 'react'
import ResourcesHeader from '../ResourcesHeader'

import Header from '../../media/Lotus_Header.png'

export default function Custom404() {
  const [isMobile, setIsMobile] = React.useState(false)

  // Effect to update the sticky nav on scroll
  React.useEffect(() => {
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

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      {isMobile || window.innerHeight <= 500 ? (
        <ResourcesHeader
          title="404 - Invalid Page"
          image={Header.src}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ResourcesHeader
          title="404"
          text="Page Not Found"
          image={Header.src}
          height="max(75vh, 400px)"
          width="100%"
          showArrow={false}
        />
      )}
    </div>
  )
}
