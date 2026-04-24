import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

export default function HomeGallery({ images }) {
  return (
    <Gallery>
      <section
        className="
          mt-4 grid w-full grid-cols-1 gap-4
          sm:grid-cols-2
          md:grid-cols-3
        "
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
                className="
                  h-56 w-full cursor-pointer overflow-hidden rounded-md
                  border-none p-0 transition-opacity
                  hover:opacity-90
                  md:h-64
                "
                onClick={open}
              >
                <img
                  ref={ref}
                  src={image.thumbnail}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  alt="Home gallery"
                  className="size-full object-cover"
                />
              </button>
            )}
          </Item>
        ))}
      </section>
    </Gallery>
  )
}
