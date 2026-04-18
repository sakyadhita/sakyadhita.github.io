/**
 * Contains the Sakyadhita logo, name, and subtitle for navbar and footer.
 * React version for compatibility with legacy React layouts.
 *
 * @summary     Brand component
 */
import Logo from '../../media/logo.svg'
import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'

export default function Brand({ location }) {
  const isFooter = location === 'footer'

  return (
    <a
      href={SITE_PAGES.HOME}
      className={cn(
        'inline-flex items-center text-inherit hover:no-underline hover:text-inherit',
        isFooter
          ? 'flex-row-reverse text-right justify-end text-white hover:text-white'
          : 'text-left justify-start h-full max-h-full overflow-hidden'
      )}
    >
      <img
        src={Logo.src}
        alt="Logo"
        className={cn(isFooter ? 'h-12 md:h-20' : 'h-9 md:h-full max-h-full w-auto object-contain')}
      />
      <div className={cn('branding flex flex-col', isFooter ? 'mr-2 md:mr-2.5' : 'ml-1 md:ml-2.5')}>
        <h3
          className={cn(
            'font-heading mb-0 lowercase',
            isFooter ? 'text-xl md:text-4xl' : 'text-lg md:text-3xl'
          )}
        >
          sakyadhita
        </h3>
        <span
          className={cn(
            'font-body text-lg lowercase opacity-90',
            isFooter ? 'hidden sm:block' : 'hidden md:block'
          )}
        >
          international association of buddhist women
        </span>
      </div>
    </a>
  )
}
