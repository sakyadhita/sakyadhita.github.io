/**
 * renders a newsletter Card given information about that newsletter.
 * This information includes the title of the newsletter, the year it was published,
 * the image url, and the redirect link, as well as if the screen is mobile size
 *
 * @author PatrickBrown1
 */

export default function NewsletterCard({
  title,
  year,
  image_url,
  optimized_url,
  redirect_link,
  isMobile
}) {
  const _displayImage = optimized_url || image_url
  // props title, year, image_url, redirect link
  if (!isMobile) {
    // desktop styles
    return (
      <div className="group m-6 size-72">
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
            src={image_url}
            className="
              mb-2.5 h-60 w-full object-cover
              shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] transition-all
              group-hover:scale-105
              group-hover:shadow-[0px_0px_6px_2px_var(--color-brand-dark-orange)]
            "
          />
          <span className="block h-5 text-left font-body text-base/5 text-black">{year}</span>
          <span
            className="
              mt-1 block h-7 overflow-hidden text-left font-body text-xl/7
              text-black
            "
          >
            {title}
          </span>
        </a>
      </div>
    )
  }
  // mobile styles
  return (
    <div
      className="
        relative m-4 inline-block w-60
        sm:m-5 sm:w-64
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
          src={image_url}
          className="
            mb-3 h-48 w-full object-cover
            shadow-[0px_0px_3px_0.75px_rgba(0,0,0,0.25)]
            sm:mb-4 sm:h-52
          "
        />
        <span
          className="
            block h-5 overflow-hidden text-left font-body text-sm/5
            text-ellipsis text-black
            sm:h-6 sm:text-base/6
          "
        >
          {year}
        </span>
        <span
          className="
            block overflow-hidden text-left font-body text-base/6 text-wrap
            text-black
            sm:text-xl/7
          "
        >
          {title}
        </span>
      </a>
    </div>
  )
}
