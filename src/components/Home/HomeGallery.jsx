import React from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

export default function HomeGallery({ images }) {
  return (
    <Gallery>
      <section
        className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        aria-label="Gallery"
      >
        {images.map((image, index) => (
          <Item
            key={`${image.original}-${index}`}
            original={image.original}
            thumbnail={image.thumbnail}
            width={image.width}
            height={image.height}
          >
            {({ ref, open }) => (
              <button
                type="button"
                className="w-full h-56 md:h-64 rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-none p-0"
                onClick={open}
              >
                <img
                  ref={ref}
                  src={image.thumbnail}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  alt="Home gallery"
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </Item>
        ))}
      </section>
    </Gallery>
  )
}
