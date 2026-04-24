/**
 * renders an EPub Card given information about the publication.
 * Props include title, author, image_url, redirect_link, isMobile.
 *
 * @Author PatrickBrown1, Navid Boloorian
 */
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip'

export default function EPubCard({
  title,
  author,
  image_url,
  optimized_url,
  redirect_link,
  isMobile
}) {
  const displayImage = optimized_url || image_url
  // props title, author name, image_url, redirect link, isMobile
  return (
    <TooltipProvider>
      {isMobile ? (
        <div className="relative m-6 inline-block w-40">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img
                  alt={title}
                  src={displayImage}
                  className="
                    mb-4 h-56 w-40 object-cover
                    shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)]
                  "
                />
              </a>
            </>
          )}
          <div
            className="
              block max-h-12 overflow-hidden text-center font-heading text-lg/6
              font-bold text-wrap
            "
          >
            {title}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="
                  block max-h-5 cursor-default truncate pt-1.5 text-center
                  font-body text-sm/tight
                "
              >
                By {author}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="
              border-black bg-black font-body text-white
            ">
              {author}
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="m-6 inline-block w-48">
          {redirect_link === null ? (
            ''
          ) : (
            <>
              <a href={redirect_link} target="_blank" rel="noreferrer noopener">
                <img
                  alt={title}
                  src={displayImage}
                  className="
                    mb-5 h-64 w-48 object-cover
                    shadow-[0px_0px_12px_3px_rgba(0,0,0,0.25)] transition-all
                    hover:scale-105
                    hover:shadow-[0px_0px_12px_3px_var(--color-brand-dark-orange)]
                  "
                />
              </a>
            </>
          )}
          <div
            className="
              block text-left font-heading text-lg/relaxed font-bold text-wrap
            "
          >
            {title}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="
                  block cursor-default truncate pt-1.5 text-left font-body
                  text-lg/relaxed font-normal
                "
              >
                {author}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="
              border-black bg-black font-body text-white
            ">
              {author}
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </TooltipProvider>
  )
}
