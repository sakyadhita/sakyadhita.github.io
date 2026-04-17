/**
 * Navigation panel for main site pages. Slides in and out from the right side
 * of the screen on toggle.
 *
 * @summary     Navigation panel for main site pages.
 * @author      Aaron Kirk
 */

import React from 'react'
import { SITE_PAGES } from '../../../constants/links'
import Cross from '../../../media/cross.svg'
import { cn } from '../../../lib/utils'

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
    const path = typeof window !== 'undefined' ? window.location.pathname : ''
    const normalizedPath = path.replace(/\/$/, '') || '/'
    const normalizedCheck = pageToCheck.replace(/\/$/, '') || '/'
    return normalizedPath === normalizedCheck ? 'bg-brand-dark-orange' : ''
  }

  const navOptionClasses =
    'w-full h-[60px] md:h-[calc((100vh-120px)/5)] flex justify-start items-center pl-[25vw] md:pl-[calc(1.9vw+2px)] md:pr-0 hover:bg-brand-dark-orange hover:no-underline transition-colors group'
  const navTextClasses = 'font-heading text-lg md:text-[min(1.25em,2.5vw)] text-white lowercase'

  return (
    <div
      className={cn(
        'fixed top-0 md:top-[120px] h-full md:h-[calc(100vh-120px)] w-full md:w-[min(350px,22vw)] bg-brand-orange flex flex-col justify-start md:justify-between z-[1001] pt-[60px] md:pt-0',
        transition && 'transition-[right] duration-500 ease-in-out',
        visible === 'visible' ? 'right-0' : 'right-[-100vw] md:right-[max(-350px,-22vw)]'
      )}
    >
      {/* Cross icon to close panel on mobile */}
      <button
        type="button"
        className="absolute top-[25px] right-[25px] w-[25px] h-[25px] md:hidden cursor-pointer bg-transparent border-none"
        onClick={toggle}
        onKeyDown={toggle}
      >
        <img src={Cross.src} alt="Close Navigation" className="w-full" />
      </button>

      {/* Nav Links */}
      <div className="flex flex-col w-full h-full md:h-auto">
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
