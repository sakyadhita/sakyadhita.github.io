/**
 * Contains the Sakyadhita logo, name, and subtitle for navbar and footer.
 * By default renders starting from the left for the navbar. If "footer" is
 * passed in for props.location, renders from the right for the footer.
 *
 * @summary     Contains the Sakyadhita logo, name, and subtitle.
 * @author      Aaron Kirk
 */

import React from 'react'
import { SITE_PAGES } from '../../constants/links'
import '../../css/Brand.css'
// import Logo from "../../media/logo.svg";

export default function Brand(props) {
  return (
    <a href={SITE_PAGES.HOME} className={props.location === 'footer' ? 'footer-brand' : 'nav-left'}>
      <img src="/logo.svg" alt="Logo" id="logo" />
      <div className="branding">
        <h3 id="title">sakyadhita</h3>
        <span id="subtitle">international association of buddhist women</span>
      </div>
    </a>
  )
}
