/**
 * Additional Navbar rendered only for the Resources page.
 *
 * @summary     Additional Navbar rendered only for the Resources page.
 * @author      Aaron Kirk
 */

import { useState, useEffect } from 'react'

import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'
import Cross from '../../media/cross.svg'

export default function ResourcesNavBar(props) {
  const landing = SITE_PAGES.RESOURCES_LANDING
  const newsletters = SITE_PAGES.RESOURCES_NEWSLETTERS
  const epub = SITE_PAGES.RESOURCES_EPUBS
  const culture = SITE_PAGES.RESOURCES_BUDDHIST_CULTURE
  const ordination = SITE_PAGES.RESOURCES_ORDINATION_ISSUE

  // On mobile, tells the navigation panel whether or not to render
  // Toggles when the slider icon is clicked
  const [navToggled, setNavToggled] = useState(false)

  // Use a helper for consistent path normalization
  const normalizePath = (p) => {
    if (typeof p !== 'string') return '/'

    const trimmed = p.trim()
    if (!trimmed) return '/'

    const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    const withoutTrailingSlashes = withLeadingSlash.replace(/\/+$/, '')

    return withoutTrailingSlashes || '/'
  }

  const [currentPath, setCurrentPath] = useState(
    globalThis.window === undefined ? '' : normalizePath(globalThis.location.pathname)
  )

  // Auto-close navigation and update path when it changes
  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(normalizePath(globalThis.location.pathname))
      setNavToggled(false)
    }

    // This handles cases where the path changes without a full page reload (if any)
    globalThis.addEventListener('popstate', handlePathChange)

    // Initial sync
    handlePathChange()

    return () => globalThis.removeEventListener('popstate', handlePathChange)
  }, [])

  /**
   * Handles toggling the navToggled state.
   */
  function toggleNav() {
    setNavToggled((prev) => !prev)
  }

  // Use explicit navigation so the clicked menu item always wins on touch devices.
  function handleNavClick(event, link) {
    event.preventDefault()
    event.stopPropagation()
    if (event.nativeEvent?.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation()
    }

    const normalizedLink = normalizePath(link)

    if (globalThis.window !== undefined) {
      if (normalizePath(globalThis.location.pathname) === normalizedLink) {
        setNavToggled(false)
        return
      }
      globalThis.location.assign(normalizedLink)
    }
  }

  /**
   * Checks page path from props to change color of the active nav link.
   *
   * @param {String} pageToCheck - URL of site to check
   * @returns {string} - class name for current page
   */
  function isPageActive(pageToCheck) {
    return currentPath === normalizePath(pageToCheck) ? 'bg-brand-dark-orange' : ''
  }

  const navItems = [
    { label: 'resources', link: landing },
    { label: 'newsletters', link: newsletters },
    { label: 'publications', link: epub },
    { label: 'buddhist culture', link: culture },
    { label: 'ordination issue', link: ordination }
  ]

  const mobileLinkClasses =
    'w-full h-16 flex justify-start items-center px-10 sm:px-20 md:px-32 hover:bg-brand-dark-orange transition-colors group no-underline hover:no-underline'
  const textClasses = 'font-heading text-white text-lg lowercase'

  return (
    <>
      {/* Button to toggle menu on mobile - moved to top left to avoid logo overlap */}
      <button
        id="resources-menu-toggle"
        onClick={toggleNav}
        type="button"
        className="
          fixed top-20 left-5 z-1001 flex size-10 cursor-pointer items-center
          justify-center rounded-full border-none bg-brand-orange shadow-lg
          md:hidden
        "
        aria-label="Toggle Resources Menu"
      >
        <span className="text-xs font-bold text-white uppercase">Menu</span>
      </button>

      {/* Mobile Drawer */}
      <div
        className={cn(
          `
            fixed top-0 right-0 z-1002 flex size-full flex-col bg-brand-orange
            pt-20 transition-transform duration-500
            md:hidden
          `,
          navToggled ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Button to close menu on mobile */}
        <button
          id="cross"
          onClick={toggleNav}
          type="button"
          className="
            absolute top-6 right-6 size-6 cursor-pointer border-none
            bg-transparent
          "
        >
          <img
            src={typeof Cross === 'string' ? Cross : Cross.src}
            alt="Close Resources Navigation"
            className="size-full"
          />
        </button>

        {/* Nav Links */}
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={cn(mobileLinkClasses, isPageActive(item.link))}
              href={item.link}
              onClick={(event) => handleNavClick(event, item.link)}
            >
              <span className={textClasses}>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Horizontal Navbar */}
      <nav
        className="
          sticky top-32 z-999 hidden h-20 w-full items-center justify-center
          bg-brand-orange shadow-md
          md:flex
        "
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.link}
            onClick={(event) => handleNavClick(event, item.link)}
            className={cn(
              `
                flex h-full w-48 items-center justify-center font-body text-lg
                text-white lowercase no-underline transition-colors
                hover:bg-brand-dark-orange hover:no-underline
              `,
              isPageActive(item.link)
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Allows for remaining page content to be rendered */}
      <main className="relative z-0">{props.children}</main>
    </>
  )
}
