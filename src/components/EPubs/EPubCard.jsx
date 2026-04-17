/**
 * renders an EPub Card given information about the publication.
 * Props include title, author, image_url, redirect_link, isMobile.
 *
 * @Author PatrickBrown1, Navid Boloorian
 */
import React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip'

export default function EPubCard({ title, author, image_url, redirect_link, isMobile }) {
  // props title, author name, image_url, redirect link, isMobile
  return (
    <TooltipProvider>
      {!isMobile ? (
        <div className="inline-block w-[184px] m-[25px]">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img
                  alt={title}
                  src={image_url}
                  className="w-[184px] h-[271px] object-cover shadow-[0px_0px_12px_3px_rgba(0,0,0,0.25)] mb-[20px] transition-all hover:scale-105 hover:shadow-[0px_0px_12px_3px_var(--color-brand-dark-orange)]"
                />
              </a>
            </>
          )}
          <div className="block font-heading text-[18px] font-bold leading-[31px] text-left text-wrap">
            {title}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="block font-body text-[18px] font-normal leading-[25px] text-left pt-[5px] overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
                {author}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black text-white border-black font-body">
              {author}
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="relative inline-block w-[152px] m-[25px]">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img
                  alt={title}
                  src={image_url}
                  className="w-[152px] h-[221px] object-cover shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)] mb-[17px]"
                />
              </a>
            </>
          )}
          <div className="max-h-[48px] block font-heading text-[18px] font-bold leading-[24px] text-center text-wrap overflow-hidden">
            {title}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-h-[21px] block font-body text-[14px] leading-[16px] text-center pt-[5px] overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
                By {author}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black text-white border-black font-body">
              {author}
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </TooltipProvider>
  )
}
