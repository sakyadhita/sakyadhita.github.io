/**
 * Additional Navbar rendered only for the Resources page.
 *
 * @summary     Additional Navbar rendered only for the Resources page.
 * @author      Aaron Kirk
 */

import { useState, useEffect } from 'react'
import { SITE_PAGES } from '../../constants/links'
import Cross from '../../media/cross.svg'
import { cn } from '../../lib/utils'

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
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : ''
  )

  // Auto-close navigation and update path when it changes
  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(normalizePath(window.location.pathname))
      setNavToggled(false)
    }

    // This handles cases where the path changes without a full page reload (if any)
    window.addEventListener('popstate', handlePathChange)

    // Initial sync
    handlePathChange()

    return () => window.removeEventListener('popstate', handlePathChange)
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

    if (typeof window !== 'undefined') {
      if (normalizePath(window.location.pathname) === normalizedLink) {
        setNavToggled(false)
        return
      }
      window.location.assign(normalizedLink)
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
    'w-full h-[60px] flex justify-start items-center px-8 sm:px-[15vw] md:px-[25vw] hover:bg-brand-dark-orange transition-colors group no-underline hover:no-underline'
  const textClasses = 'font-heading text-white text-lg lowercase'

  return (
    <>
      {/* Button to toggle menu on mobile - moved to top left to avoid logo overlap */}
      <button
        id="resources-menu-toggle"
        onClick={toggleNav}
        type="button"
        className="fixed top-[70px] left-[20px] z-[1001] md:hidden w-[40px] h-[40px] bg-brand-orange rounded-full flex items-center justify-center shadow-lg cursor-pointer border-none"
        aria-label="Toggle Resources Menu"
      >
        <span className="text-white text-xs font-bold uppercase">Menu</span>
      </button>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 w-full h-full z-[1002] bg-brand-orange transition-transform duration-500 md:hidden flex flex-col pt-20',
          navToggled ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Button to close menu on mobile */}
        <button
          id="cross"
          onClick={toggleNav}
          type="button"
          className="absolute top-[25px] right-[25px] w-[25px] h-[25px] bg-transparent border-none cursor-pointer"
        >
          <img
            src={typeof Cross === 'string' ? Cross : Cross.src}
            alt="Close Resources Navigation"
            className="w-full h-full"
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
      <nav className="hidden md:flex sticky top-[120px] z-[999] w-full bg-brand-orange h-[70px] items-center justify-center shadow-md">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.link}
            onClick={(event) => handleNavClick(event, item.link)}
            className={cn(
              'w-[200px] h-full flex items-center justify-center text-white font-body text-[1.125em] hover:bg-brand-dark-orange transition-colors no-underline hover:no-underline lowercase',
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
