/**
 * renders a newsletter Card given information about that newsletter.
 * This information includes the title of the newsletter, the year it was published,
 * the image url, and the redirect link.
 *
 * @author PatrickBrown1
 */

interface NewsletterCardProps {
  title: string
  year: number | string
  image_url: string
  optimized_url?: string
  redirect_link: string
}

export default function NewsletterCard({
  title,
  year,
  image_url,
  optimized_url,
  redirect_link
}: NewsletterCardProps) {
  const _displayImage = optimized_url || image_url

  return (
    <div
      className="
        group m-4 inline-block w-60
        sm:m-5 sm:w-64
        md:m-6 md:size-72
      "
    >
      <a
        href={redirect_link}
        target="_blank"
        rel="noreferrer noopener"
        className="
          text-black no-underline
          hover:no-underline
        "
      >
        <img
          alt={title}
          src={_displayImage}
          className="
            mb-3 h-48 w-full object-cover
            shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)] transition-all
            group-hover:scale-105
            group-hover:shadow-[0px_0px_6px_2px_var(--color-brand-dark-orange)]
            sm:mb-4 sm:h-52
            md:mb-2.5 md:h-60
          "
        />
        <span
          className="
            block h-5 text-left font-body text-sm/5 text-black
            sm:text-base/6
            md:text-base/5
          "
        >
          {year}
        </span>
        <span
          className="
            mt-1 block h-7 overflow-hidden text-left font-body text-base/6
            text-wrap text-black
            sm:text-xl/7
            md:text-xl/7
          "
        >
          {title}
        </span>
      </a>
    </div>
  )
}
