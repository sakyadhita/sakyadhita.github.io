/**
 * renders an EPub Card given information about the publication.
 * Props include title, author, image_url, redirect_link, isMobile.
 *
 * @Author PatrickBrown1, Navid Boloorian
 */
import React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip'
import '../../css/EPubCard.css'

export default function EPubCard({ title, author, image_url, redirect_link, isMobile }) {
  // props title, author name, image_url, redirect link, isMobile
  return (
    <TooltipProvider>
      {!isMobile ? (
        <div className="EPubCard">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img alt={title} src={image_url} className="EPubCard_image" />
              </a>
            </>
          )}
          <div className="EPubCard_title">{title}</div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="EPubCard_author cursor-default">{author}</div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black text-white border-black font-body">
              {author}
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="EPubCard--mobile">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img alt={title} src={image_url} className="EPubCard_image" />
              </a>
            </>
          )}
          <div className="EPubCard_title--mobile">{title}</div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="EPubCard_author--mobile cursor-default">By {author}</div>
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
