/**
 * Sticky Navbar for all pages. Contains the Sakyadhita logo, branding, and a
 * hamburger icon to expand the navigation panel. Darkens other page content
 * when navigation is toggled.
 *
 * @summary     Navbar containing hamburger button to toggle navigation.
 * @author      Aaron Kirk
 */

import React, { useState } from 'react'

import '../../../css/NavBar.css'
import Hamburger from '../../../media/hamburger.svg'

import Nav from './Nav'
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
    if (!navTransition) setNavTransition('transition')
    // If closing navbar, wait for animation to finish
    else
      setTimeout(() => {
        setNavTransition('')
      }, 500)
  }

  return (
    <div className="NavBar">
      {/* The actual Navigation Bar */}
      {/* Overlay and Nav Panel are outside to allow sticky positioning */}
      <div className="navBar">
        {/* Logo and Branding */}
        <Brand />

        {/* Hamburger Button to Toggle Navigation */}
        <button type="button" id="nav-toggle" onClick={toggleNav} onKeyDown={toggleNav}>
          <img src={Hamburger.src} alt="Toggle Navigation" />
        </button>
      </div>

      {/* Conditionally Rendered Navigation Panel */}
      {navToggled ? (
        <Nav visible="visible" toggle={toggleNav} transition={navTransition} />
      ) : (
        <Nav toggle={toggleNav} transition={navTransition} />
      )}

      {/* Overlay to darken website content when toggled */}
      {navToggled ? (
        <button
          className="nav-overlay visible"
          type="button"
          onClick={toggleNav}
          aria-label="Disable Navigation"
        />
      ) : (
        <button type="button" className="nav-overlay" aria-label="Disable Navigation" />
      )}
    </div>
  )
}
