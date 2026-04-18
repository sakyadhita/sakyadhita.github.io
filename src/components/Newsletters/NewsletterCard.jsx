/**
 * renders a newsletter Card given information about that newsletter.
 * This information includes the title of the newsletter, the year it was published,
 * the image url, and the redirect link, as well as if the screen is mobile size
 *
 * @author PatrickBrown1
 */
import React from 'react'

export default function NewsletterCard({ title, year, image_url, optimized_url, redirect_link, isMobile }) {
  const displayImage = optimized_url || image_url
  // props title, year, image_url, redirect link
  if (!isMobile) {
    // desktop styles
    return (
      <div className="group w-72 h-72 m-6">
        <a
          href={redirect_link}
          target="_blank"
          rel="noreferrer noopener"
          className="text-black no-underline hover:no-underline"
        >
          <img
            alt={title}
            src={image_url}
            className="w-full h-60 object-cover mb-2.5 shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] transition-all group-hover:scale-105 group-hover:shadow-[0px_0px_6px_2px_var(--color-brand-dark-orange)]"
          />
          <span className="h-5 block font-body text-base leading-5 text-left text-black">
            {year}
          </span>
          <span className="h-7 mt-1 block font-body text-xl leading-7 text-left text-black overflow-hidden">
            {title}
          </span>
        </a>
      </div>
    )
  }
  // mobile styles
  return (
    <div className="relative inline-block w-60 sm:w-64 m-4 sm:m-5">
      <a
        href={redirect_link}
        target="_blank"
        rel="noreferrer noopener"
        className="text-black no-underline hover:no-underline"
      >
        <img
          alt={title}
          src={image_url}
          className="w-full h-48 sm:h-52 object-cover shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)] mb-3 sm:mb-4"
        />
        <span className="h-5 sm:h-6 block font-body text-sm sm:text-base leading-5 sm:leading-6 text-left overflow-hidden text-ellipsis text-black">
          {year}
        </span>
        <span className="block font-body text-base sm:text-xl leading-6 sm:leading-7 text-left text-wrap overflow-hidden text-black">
          {title}
        </span>
      </a>
    </div>
  )
}
