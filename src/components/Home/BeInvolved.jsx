/**
 * Renders one tile for the Be Involved Section of the Home page. Tile is formatted using props, which contain
 * displayInformation. All props are required.
 *
 * @summary Displays one tile for Home Page's Be Involved sub-section.
 *
 * @author Amrit Kaur Singh
 */

import React from 'react'
import CustomButton from '../CustomButton'
import '../../css/BeInvolved.css'

/**
 *
 * @param {string} description  - Additional information of tile above button
 * @param {string} image_url  - Image URL of the tile's background picture (will be auto-cropped to center)
 * @param {string} redirect_url  - The redirect url once the button is clicked
 * @param {boolean} openInSameTab  - True if redirect_url is open in same tab, false if it is opened in new tab
 * @param {string} button_title  - The display name given to the button
 *
 * @returns One Formatted Be Involved Tile
 */
export default function BeInvolved({
  description,
  image_url,
  button_title,
  redirect_link,
  openInSameTab
}) {
  return (
    <div
      id={button_title}
      className="involve-section"
      style={{ backgroundImage: `url(${image_url})` }}
    >
      <div className="overlay">
        <p> {description} </p>
        <CustomButton
          openInSameTab={openInSameTab}
          redirect_link={redirect_link}
          text={button_title}
        />
      </div>
    </div>
  )
}
