/**
 * Navigation panel for main site pages. Slides in and out from the right side
 * of the screen on toggle.
 *
 * @summary     Navigation panel for main site pages.
 * @author      Aaron Kirk
 */

import { SITE_PAGES } from '../../../constants/links'
import { cn } from '../../../lib/utils'
import Cross from '../../../media/cross.svg'

export default function Nav({ visible, transition, toggle }) {
  const home = SITE_PAGES.HOME
  const conferences = SITE_PAGES.CONFERENCES
  const resources = SITE_PAGES.RESOURCES_LANDING
  const about = SITE_PAGES.ABOUT_US
  const contact = SITE_PAGES.CONTACT_US

  /**
   * Checks page path from props to change color of the active nav link.
   *
   * @param {String} pageToCheck - URL of site to check
   * @returns {string} - class name for current page
   */
  function isPageActive(pageToCheck) {
    const path = globalThis.window === undefined ? '' : globalThis.location.pathname
    const normalizedPath = path.replace(/\/$/, '') || '/'
    const normalizedCheck = pageToCheck.replace(/\/$/, '') || '/'
    return normalizedPath === normalizedCheck ? 'bg-brand-dark-orange' : ''
  }

  const navOptionClasses =
    'w-full h-16 md:h-24 flex justify-start items-center pl-10 md:pl-8 hover:bg-brand-dark-orange hover:no-underline transition-colors group'
  const navTextClasses = 'font-heading text-lg md:text-xl text-white lowercase'

  return (
    <div
      className={cn(
        `
          fixed top-0 z-1001 flex size-full flex-col justify-start
          overflow-y-auto bg-brand-orange pt-16
          md:top-32 md:h-[calc(100vh-128px)] md:w-80 md:justify-between md:pt-0
        `,
        transition && 'transition-[right] duration-500 ease-in-out',
        visible === 'visible'
          ? 'right-0'
          : `
            right-[-100vw]
            md:right-[-320px]
          `
      )}
    >
      {/* Cross icon to close panel on mobile */}
      <button
        type="button"
        className="
          absolute top-6 right-6 size-6 cursor-pointer border-none
          bg-transparent
          md:hidden
        "
        onClick={toggle}
        onKeyDown={toggle}
      >
        <img src={Cross.src} alt="Close Navigation" className="w-full" />
      </button>

      {/* Nav Links */}
      <div
        className="
          flex size-full flex-col
          md:h-auto
        "
      >
        {[
          { label: 'Home', link: home },
          { label: 'Conferences', link: conferences },
          { label: 'Resources', link: resources },
          { label: 'About Us', link: about },
          { label: 'Contact Us', link: contact }
        ].map((item) => (
          <a
            key={item.label}
            className={cn(navOptionClasses, isPageActive(item.link))}
            href={item.link}
          >
            <span className={navTextClasses}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
