/**
 * Additional Navbar rendered only for the Resources page.
 *
 * @summary     Additional Navbar rendered only for the Resources page.
 * @author      Aaron Kirk
 */

import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SITE_PAGES } from '../../constants/links'

import '../../css/ResourcesNavBar.css'
import LeftArrow from '../../media/left-arrow.svg'
import Cross from '../../media/cross.svg'

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
  const [divStyle, setDivStyle] = useState({ zIndex: '999' })

  /**
   * Handles toggling the navToggled state. Because the slide animation
   * takes 500ms, the divStyle is returned back to normal 500ms after
   * actually closing the Nav.
   */
  function toggleNav() {
    setNavToggled(!navToggled)

    if (!navToggled) setDivStyle({ zIndex: '1001' })
    else
      setTimeout(() => {
        setDivStyle({ zIndex: '999' })
      }, 500)
  }

  /**
   * Checks page path from props to change color of the active nav link.
   *
   * @param {String} pageToCheck - URL of site to check
   * @returns {boolean} - True if currently on the desired page
   */
  function isPageActive(pageToCheck) {
    return pageToCheck === window.location.pathname ? 'current' : ''
  }

  return (
    <>
      {/* Button to toggle menu on mobile */}
      <button id="left-arrow" onClick={toggleNav} onKeyDown={toggleNav} type="button">
        <img src={LeftArrow.src} alt="Toggle Resources Navigation" />
      </button>

      <div className={`resources-nav ${navToggled ? 'toggled' : ''}`} style={divStyle}>
        {/* Button to close menu on mobile */}
        <button id="cross" onClick={toggleNav} onKeyDown={toggleNav} type="button">
          <img src={Cross.src} alt="Close Resources Navigation" />
        </button>

        {/* Nav Links */}
        <a className={`resources-link ${isPageActive(newsletters)}`} href={newsletters}>
          <span>Newsletters</span>
        </a>
        <a className={`resources-link ${isPageActive(epub)}`} href={epub}>
          <span>Publications</span>
        </a>
        <a className={`resources-link ${isPageActive(culture)}`} href={culture}>
          <span>Buddhist Culture</span>
        </a>
        <a className={`resources-link ${isPageActive(ordination)}`} href={ordination}>
          <span>Ordination Issue</span>
        </a>
      </div>

      {/* Allows for remanining page content to be rendered */}
      {props.children}
    </>
  )
}
