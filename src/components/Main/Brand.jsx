/**
 * Contains the Sakyadhita logo, name, and subtitle for navbar and footer.
 * React version for compatibility with legacy React layouts.
 *
 * @summary     Brand component
 */
import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'
import Logo from '../../media/logo.svg'

export default function Brand({ location }) {
  const isFooter = location === 'footer'

  return (
    <a
      href={SITE_PAGES.HOME}
      className={cn(
        `
          inline-flex items-center text-inherit
          hover:text-inherit hover:no-underline
        `,
        isFooter
          ? `
            flex-row-reverse justify-end text-right text-white
            hover:text-white
          `
          : 'h-full max-h-full justify-start overflow-hidden text-left'
      )}
    >
      <img
        src={Logo.src}
        alt="Logo"
        className={cn(
          isFooter
            ? `
              h-12
              md:h-20
            `
            : `
              h-9 max-h-full w-auto object-contain
              md:h-full
            `
        )}
      />
      <div
        className={cn(
          'branding flex flex-col',
          isFooter
            ? `
              mr-2
              md:mr-2.5
            `
            : `
              ml-1
              md:ml-2.5
            `
        )}
      >
        <h3
          className={cn(
            'mb-0 font-heading lowercase',
            isFooter
              ? `
                text-xl
                md:text-4xl
              `
              : `
                text-lg
                md:text-3xl
              `
          )}
        >
          sakyadhita
        </h3>
        <span
          className={cn(
            'font-body text-lg lowercase opacity-90',
            isFooter
              ? `
                hidden
                sm:block
              `
              : `
                hidden
                md:block
              `
          )}
        >
          international association of buddhist women
        </span>
      </div>
    </a>
  )
}
