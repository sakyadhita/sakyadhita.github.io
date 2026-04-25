/**
 * renders an EPub Card given information about the publication.
 * Props include title, author, image_url, redirect_link.
 *
 * @Author PatrickBrown1, Navid Boloorian
 */
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip'

interface EPubCardProps {
  title: string
  author: string
  image_url?: string
  optimized_url?: string
  redirect_link: string | null
}

export default function EPubCard({
  title,
  author,
  image_url,
  optimized_url,
  redirect_link
}: EPubCardProps) {
  const displayImage = optimized_url || image_url

  return (
    <TooltipProvider>
      <div
        className="
          group m-6 inline-block w-40
          md:w-48
        "
      >
        {redirect_link !== null && (
          <a href={redirect_link} target="_blank" rel="noreferrer noopener">
            <img
              alt={title}
              src={displayImage}
              className="
                mb-4 h-56 w-40 object-cover
                shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)] transition-all
                group-hover:scale-105
                group-hover:shadow-[0px_0px_12px_3px_var(--color-brand-dark-orange)]
                md:mb-5 md:h-64 md:w-48
                md:shadow-[0px_0px_12px_3px_rgba(0,0,0,0.25)]
              "
            />
          </a>
        )}
        <div
          className="
            block max-h-12 overflow-hidden text-center font-heading text-lg/6
            font-bold text-wrap
            md:max-h-none md:text-left md:text-lg/relaxed
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
                md:max-h-none md:text-left md:text-lg/relaxed md:font-normal
              "
            >
              {author}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="border-black bg-black font-body text-white">
            {author}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
