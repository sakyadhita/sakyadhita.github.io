/**
 * Additional Navbar rendered only for the Resources page.
 *
 * @summary     Additional Navbar rendered only for the Resources page.
 * @author      Aaron Kirk
 */

import React, { useState } from 'react'
import { SITE_PAGES } from '../../constants/links'
import LeftArrow from '../../media/left-arrow.svg'
import Cross from '../../media/cross.svg'
import { cn } from '../../lib/utils'

export default function ResourcesNavBar(props) {
  const newsletters = SITE_PAGES.RESOURCES_NEWSLETTERS
  const epub = SITE_PAGES.RESOURCES_EPUBS
  const culture = SITE_PAGES.RESOURCES_BUDDHIST_CULTURE
  const ordination = SITE_PAGES.RESOURCES_ORDINATION_ISSUE

  // On mobile, tells the navigation panel whether or not to render
  // Toggles when the slider icon is clicked
  const [navToggled, setNavToggled] = useState(false)

  // Controls the z-index of the entire component so that the navigation panel
  // renders on top of the normal navbar
  const [divStyle, setDivStyle] = useState({ zIndex: '998' })

  /**
   * Handles toggling the navToggled state. Because the slide animation
   * takes 500ms, the divStyle is returned back to normal 500ms after
   * actually closing the Nav.
   */
  function toggleNav() {
    setNavToggled(!navToggled)

    if (!navToggled) setDivStyle({ zIndex: '1002' })
    else
      setTimeout(() => {
        setDivStyle({ zIndex: '998' })
      }, 500)
  }

  /**
   * Checks page path from props to change color of the active nav link.
   *
   * @param {String} pageToCheck - URL of site to check
   * @returns {string} - class name for current page
   */
  function isPageActive(pageToCheck) {
    const path = typeof window !== 'undefined' ? window.location.pathname : ''
    return path === pageToCheck ? 'bg-brand-dark-orange' : ''
  }

  const linkClasses =
    'w-full h-12 flex justify-start items-center px-8 hover:bg-brand-dark-orange transition-colors group no-underline hover:no-underline'
  const textClasses = 'font-heading text-white text-lg lowercase'

  return (
    <>
      {/* Button to toggle menu on mobile */}
      <button
        id="left-arrow"
        onClick={toggleNav}
        onKeyDown={toggleNav}
        type="button"
        className="fixed bottom-8 right-8 z-[1001] md:hidden w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-none cursor-pointer"
      >
        <img src={LeftArrow.src} alt="Toggle Resources Navigation" className="w-6 rotate-180" />
      </button>

      <div
        className={cn(
          'fixed inset-0 z-[1002] bg-brand-orange transition-transform duration-500 md:hidden flex flex-col pt-20',
          navToggled ? 'translate-x-0' : 'translate-x-full'
        )}
        style={divStyle}
      >
        {/* Button to close menu on mobile */}
        <button
          id="cross"
          onClick={toggleNav}
          onKeyDown={toggleNav}
          type="button"
          className="absolute top-6 right-6 p-2 bg-transparent border-none cursor-pointer"
        >
          <img src={Cross.src} alt="Close Resources Navigation" className="w-8" />
        </button>

        {/* Nav Links */}
        <div className="flex flex-col space-y-2">
          {[
            { label: 'Newsletters', link: newsletters },
            { label: 'Publications', link: epub },
            { label: 'Buddhist Culture', link: culture },
            { label: 'Ordination Issue', link: ordination }
          ].map((item) => (
            <a
              key={item.label}
              className={cn(linkClasses, isPageActive(item.link))}
              href={item.link}
            >
              <span className={textClasses}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Horizontal Navbar */}
      <div className="hidden md:flex sticky top-[120px] z-[998] w-full bg-brand-orange h-14 items-center justify-center shadow-md">
        {[
          { label: 'Newsletters', link: newsletters },
          { label: 'Publications', link: epub },
          { label: 'Buddhist Culture', link: culture },
          { label: 'Ordination Issue', link: ordination }
        ].map((item) => (
          <a
            key={item.label}
            href={item.link}
            className={cn(
              'px-8 h-full flex items-center text-white font-heading font-bold hover:bg-brand-dark-orange transition-colors no-underline hover:no-underline lowercase text-lg',
              isPageActive(item.link)
            )}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Allows for remanining page content to be rendered */}
      {props.children}
    </>
  )
}
