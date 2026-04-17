/**
 * Slideshow component built with Embla Carousel.
 * Replaces react-slideshow-image to better align with current tech stack (shadcn/ui style).
 */

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import LeftArrow from '../media/leftarrow.svg'
import RightArrow from '../media/rightarrow.svg'
import { cn } from '../lib/utils'

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
    <div className="Slideshow group relative overflow-hidden block" style={{ width }}>
      <div className="h-full" ref={emblaRef} style={{ height }}>
        <div className="flex h-full">
          {React.Children.map(children, (child) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full backface-hidden">{child}</div>
          ))}
        </div>
      </div>

      {/* Custom Arrows - Only on desktop as per original implementation */}
      {!isMobile && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <img className="w-[50px] z-20" src={LeftArrow.src} alt="left arrow" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <img className="w-[50px] z-20" src={RightArrow.src} alt="right arrow" />
          </button>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'w-5 h-5 rounded-full transition-all border-[10px] cursor-pointer',
              index === selectedIndex
                ? 'bg-white border-white scale-110'
                : 'bg-[#c4c4c4] border-[#c4c4c4] hover:bg-white/50 hover:border-white/50'
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow
