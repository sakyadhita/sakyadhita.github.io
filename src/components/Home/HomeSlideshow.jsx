import React from 'react'
import Slideshow from '../Slideshow'
import NewsSlideReact from './NewsSlideReact'

export default function HomeSlideshow({ newsAndEvents }) {
  if (!newsAndEvents || newsAndEvents.length === 0) return null

  return (
    <Slideshow height="85vh" width="100%" isMobile={false}>
      {newsAndEvents.map((slideInfo) => (
        <NewsSlideReact
          key={slideInfo.title}
          height="85vh"
          showButton={!!slideInfo.redirectLink}
          openInSameTab={false}
          redirect_link={slideInfo.redirectLink}
          title={slideInfo.title}
          description={slideInfo.description}
          image_url={slideInfo.optimizedImage || slideInfo.imageLink}
        />
      ))}
    </Slideshow>
  )
}
