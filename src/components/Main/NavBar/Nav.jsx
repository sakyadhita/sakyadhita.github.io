/**
 * Navigation panel for main site pages. Slides in and out from the right side
 * of the screen on toggle.
 *
 * @summary     Navigation panel for main site pages.
 * @author      Aaron Kirk
 */

import React from 'react'
import { SITE_PAGES } from '../../../constants/links'

import '../../../css/Nav.css'
import Cross from '../../../media/cross.svg'

export default function Nav(props) {
  const home = SITE_PAGES.HOME
  const conferences = SITE_PAGES.CONFERENCES
  const resources = SITE_PAGES.RESOURCES_LANDING
  const about = SITE_PAGES.ABOUT_US
  const contact = SITE_PAGES.CONTACT_US

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
    <div className={`navigation ${props.visible} ${props.transition}`}>
      {/* Cross icon to close panel on mobile */}
      <button type="button" id="cross" onClick={props.toggle} onKeyDown={props.toggle}>
        <img src={Cross.src} alt="Close Navigation" />
      </button>

      {/* Nav Links */}
      <a className={`nav-option ${isPageActive(home)}`} href={home}>
        <span>Home</span>
      </a>
      <a className={`nav-option ${isPageActive(conferences)}`} href={conferences}>
        <span>Conferences</span>
      </a>
      <a className={`nav-option ${isPageActive(resources)}`} href={resources}>
        <span>Resources</span>
      </a>
      <a className={`nav-option ${isPageActive(about)}`} href={about}>
        <span>About Us</span>
      </a>
      <a className={`nav-option ${isPageActive(contact)}`} href={contact}>
        <span>Contact Us</span>
      </a>
    </div>
  )
}
