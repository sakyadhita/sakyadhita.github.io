/**
 * renders an EPub Card given information about the publication.
 * Props include title, author, image_url, redirect_link, isMobile.
 *
 * @Author PatrickBrown1, Navid Boloorian
 */
import React from 'react'
import { Tooltip } from 'react-tooltip'
import '../../css/EPubCard.css'

export default function EPubCard({ title, author, image_url, redirect_link, isMobile }) {
  // props title, author name, image_url, redirect link, isMobile
  const tooltipId = `epub-tooltip-${author.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <>
      <Tooltip id={tooltipId} />
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
          <div
            data-tooltip-id={tooltipId}
            data-tooltip-content={author}
            className="EPubCard_author"
          >
            {author}
          </div>
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
          <div
            data-tooltip-id={tooltipId}
            data-tooltip-content={author}
            className="EPubCard_author--mobile"
          >
            By {author}
          </div>
        </div>
      )}
    </>
  )
}
