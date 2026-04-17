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
      className="flex-1 w-full h-[450px] bg-[length:cover,contain] bg-[position:center,top] bg-[repeat:no-repeat,no-repeat] font-body text-white text-2xl shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 group"
      style={{ backgroundImage: `url(${image_url})` }}
    >
      <div className="w-full h-full bg-black/40 group-hover:bg-transparent flex flex-col justify-end items-center p-[10vw_20vw] md:p-[4vw_6vw] lg:p-[4vw_7vw] transition-colors">
        <p className="text-center mb-6"> {description} </p>
        <CustomButton
          openInSameTab={openInSameTab}
          redirect_link={redirect_link}
          text={button_title}
        />
      </div>
    </div>
  )
}
