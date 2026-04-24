/**
 * Sticky Navbar for all pages. Contains the Sakyadhita logo, branding, and a
 * hamburger icon to expand the navigation panel. Darkens other page content
 * when navigation is toggled.
 *
 * @summary     Navbar containing hamburger button to toggle navigation.
 * @author      Aaron Kirk
 */

import { useState } from 'react'

import Nav from './Nav'
import { cn } from '../../../lib/utils'
import Hamburger from '../../../media/hamburger.svg'
import Brand from '../Brand'

export default function NavBar() {
  // Tells the navigation panel whether or not to render
  // toggles when the hamburger icon is clicked
  const [navToggled, setNavToggled] = useState(false)

  // Removes transition time on the nav panel when not necessary
  const [navTransition, setNavTransition] = useState('')

  /**
   * Handles toggling the navToggled state
   */
  function toggleNav() {
    setNavToggled(!navToggled)

    // Removes transition time when not necessary so that changing
    // view width does not cause the nav to glitch
    if (navTransition) {
      setTimeout(() => {
        setNavTransition('')
      }, 500)
    }
    // If closing navbar, wait for animation to finish
    else {
      setNavTransition('transition')
    }
  }

  return (
    <div className="sticky top-0 z-1000 w-full">
      {/* The actual Navigation Bar */}
      <div
        className="
          flex h-12 w-full items-center justify-between bg-brand-light-purple
          px-6 py-2 text-white shadow-none
          md:h-32 md:px-14 md:py-4 md:shadow-[0px_3px_6px_rgba(0,0,0,0.16)]
        "
      >
        {/* Logo and Branding */}
        <Brand />

        {/* Hamburger Button to Toggle Navigation */}
        <button
          type="button"
          className="
            relative size-5 cursor-pointer border-none bg-transparent
            md:size-12
          "
          onClick={toggleNav}
          onKeyDown={toggleNav}
        >
          <img src={Hamburger.src} alt="Toggle Navigation" className="size-full" />
        </button>
      </div>

      {/* Conditionally Rendered Navigation Panel */}
      <Nav visible={navToggled ? 'visible' : ''} toggle={toggleNav} transition={navTransition} />

      {/* Overlay to darken website content when toggled */}
      <div
        role="button"
        tabIndex={0}
        className={cn(
          `
            pointer-events-none fixed inset-0 z-999 hidden bg-black/30 opacity-0
            backdrop-blur-[2px] transition-opacity duration-500
            md:block
          `,
          navToggled && 'pointer-events-auto opacity-100'
        )}
        onClick={toggleNav}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleNav()
          }
        }}
        aria-label="Close navigation overlay"
      />
    </div>
  )
}
