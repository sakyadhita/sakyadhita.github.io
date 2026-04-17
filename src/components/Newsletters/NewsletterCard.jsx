/**
 * renders a newsletter Card given information about that newsletter.
 * This information includes the title of the newsletter, the year it was published,
 * the image url, and the redirect link, as well as if the screen is mobile size
 *
 * @author PatrickBrown1
 */
import React from 'react'

export default function NewsletterCard({ title, year, image_url, redirect_link, isMobile }) {
  // props title, year, image_url, redirect link
  if (!isMobile) {
    // desktop styles
    return (
      <div className="group w-[300px] h-[300px] m-[26px_20px]">
        <a
          href={redirect_link}
          target="_blank"
          rel="noreferrer noopener"
          className="text-black no-underline hover:no-underline"
        >
          <img
            alt={title}
            src={image_url}
            className="w-full h-[250px] object-cover mb-[10px] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] transition-all group-hover:scale-105 group-hover:shadow-[0px_0px_6px_2px_var(--color-brand-dark-orange)]"
          />
          <span className="h-5 block font-body text-[16px] leading-5 text-left text-black">
            {year}
          </span>
          <span className="h-7 mt-[5px] block font-body text-[20px] leading-7 text-left text-black overflow-hidden">
            {title}
          </span>
        </a>
      </div>
    )
  }
  // mobile styles
  return (
    <div className="relative inline-block w-[242px] min-[301px]:w-[270px] m-[16px] min-[301px]:m-[20px_16px]">
      <a
        href={redirect_link}
        target="_blank"
        rel="noreferrer noopener"
        className="text-black no-underline hover:no-underline"
      >
        <img
          alt={title}
          src={image_url}
          className="w-full h-[190px] min-[301px]:h-[212px] object-cover shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)] mb-[12px] min-[301px]:mb-[16px]"
        />
        <span className="h-[18px] min-[301px]:h-[21px] block font-body text-[14px] min-[301px]:text-[16px] leading-[16px] min-[301px]:leading-[20px] text-left overflow-hidden text-ellipsis text-black">
          {year}
        </span>
        <span className="block font-body text-[16px] min-[301px]:text-[20px] leading-[20px] min-[301px]:leading-[24px] text-left text-wrap overflow-hidden text-black">
          {title}
        </span>
      </a>
    </div>
  )
}
