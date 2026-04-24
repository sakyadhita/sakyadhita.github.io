/**
 * Slideshow component built with Embla Carousel.
 * Replaces react-slideshow-image to better align with current tech stack (shadcn/ui style).
 */

import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useState, useEffect, useCallback } from 'react'

import { cn } from '../lib/utils'
import LeftArrow from '../media/leftarrow.svg'
import RightArrow from '../media/rightarrow.svg'

const Slideshow = ({ children, height, width, isMobile }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
    Fade()
  ])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnapList] = useState([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnapList(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnapList, onSelect])

  return (
    <div className="Slideshow group relative block overflow-hidden" style={{ width }}>
      <div className="h-full" ref={emblaRef} style={{ height }}>
        <div className="flex h-full">
          {React.Children.map(children, (child) => (
            <div
              className="
                relative h-full min-w-0 flex-[0_0_100%] backface-hidden
              "
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Arrows - Only on desktop as per original implementation */}
      {!isMobile && (
        <>
          <button
            type="button"
            className="
              absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer
              border-none bg-transparent opacity-0 transition-opacity
              group-hover:opacity-100
            "
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <img className="z-20 w-12" src={LeftArrow.src} alt="left arrow" />
          </button>
          <button
            type="button"
            className="
              absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer
              border-none bg-transparent opacity-0 transition-opacity
              group-hover:opacity-100
            "
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <img className="z-20 w-12" src={RightArrow.src} alt="right arrow" />
          </button>
        </>
      )}

      {/* Indicators */}
      <div
        className="absolute inset-x-0 bottom-16 z-20 flex justify-center gap-4"
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'size-5 cursor-pointer rounded-full border-10 transition-all',
              index === selectedIndex
                ? 'scale-110 border-white bg-white'
                : `
                  border-gray-400 bg-gray-400
                  hover:border-white/50 hover:bg-white/50
                `
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Slideshow)
