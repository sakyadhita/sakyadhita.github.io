/**
 * Sticky Navbar for all pages. Contains the Sakyadhita logo, branding, and a
 * hamburger icon to expand the navigation panel. Darkens other page content
 * when navigation is toggled.
 *
 * @summary     Navbar containing hamburger button to toggle navigation.
 * @author      Aaron Kirk
 */

import React, { useState } from 'react'
import Hamburger from '../../../media/hamburger.svg'
import Nav from './Nav'
import Brand from '../Brand'
import { cn } from '../../../lib/utils'

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
    if (!navTransition) setNavTransition('transition')
    // If closing navbar, wait for animation to finish
    else
      setTimeout(() => {
        setNavTransition('')
      }, 500)
  }

  return (
    <div className="sticky top-0 w-full z-[1000]">
      {/* The actual Navigation Bar */}
      <div className="h-[50px] md:h-[120px] w-full px-6 md:px-[55px] flex justify-between items-center bg-brand-light-purple text-white shadow-none md:shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
        {/* Logo and Branding */}
        <Brand />

        {/* Hamburger Button to Toggle Navigation */}
        <button
          type="button"
          className="relative w-8 h-8 md:w-[50px] md:h-[50px] cursor-pointer border-none bg-transparent"
          onClick={toggleNav}
          onKeyDown={toggleNav}
        >
          <img src={Hamburger.src} alt="Toggle Navigation" className="w-full h-full" />
        </button>
      </div>

      {/* Conditionally Rendered Navigation Panel */}
      <Nav visible={navToggled ? 'visible' : ''} toggle={toggleNav} transition={navTransition} />

      {/* Overlay to darken website content when toggled */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 z-[999] pointer-events-none opacity-0 md:block hidden',
          navToggled && 'opacity-100 pointer-events-auto'
        )}
        onClick={toggleNav}
      />
    </div>
  )
}
