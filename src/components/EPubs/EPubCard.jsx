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
        <div className="inline-block w-48 m-6">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img
                  alt={title}
                  src={image_url}
                  className="w-48 h-64 object-cover shadow-[0px_0px_12px_3px_rgba(0,0,0,0.25)] mb-5 transition-all hover:scale-105 hover:shadow-[0px_0px_12px_3px_var(--color-brand-dark-orange)]"
                />
              </a>
            </>
          )}
          <div className="block font-heading text-lg font-bold leading-relaxed text-left text-wrap">
            {title}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="block font-body text-lg font-normal leading-relaxed text-left pt-1.5 overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
                {author}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black text-white border-black font-body">
              {author}
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="relative inline-block w-40 m-6">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img
                  alt={title}
                  src={image_url}
                  className="w-40 h-56 object-cover shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)] mb-4"
                />
              </a>
            </>
          )}
          <div className="max-h-12 block font-heading text-lg font-bold leading-6 text-center text-wrap overflow-hidden">
            {title}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-h-5 block font-body text-sm leading-tight text-center pt-1.5 overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
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
