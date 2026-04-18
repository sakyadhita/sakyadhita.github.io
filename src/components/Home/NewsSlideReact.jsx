/**
 * News & Events slide screen is for usage in Home page's slideshow component. This formats exactly
 * one slide, with display information passed as props. All props are required aside from title and description,
 * which are optional. To make note, the showButton if set to true will require redirect_link and openInSameTab,
 * though if set to false will simply not display the button.
 *
 * Props that are thereby optional will be automatically be readjusted in render, so the display
 * information still looks compact and clean.
 *
 * @summary Displays one slide for Home Page using props.
 *
 * @author Amrit Kaur Singh
 */

import React from 'react'
import CustomButton from '../CustomButtonReact'

/**
 *
 * @param {string} title  - Heading of slide in large bold letters
 * @param {string} description  - Additional information on slide in smaller font-size
 * @param {string} image_url  - Image URL of the slide's background picture (will be auto-cropped to center)
 * @param {boolean} showButton  - True if button is displayed, false otherwise
 * @param {string} redirect_url  - The redirect url once the button is clicked, only used if showButton is true
 * @param {boolean} openInSameTab  - True if redirect_url is open in same tab, false if it is opened in new tab. Only used if showButton is true
 * @param {string} height  - Height of the slide (recomennded: should be same value as height of slideshow component)
 *
 * @returns One Formatted Slideshow
 */
export default function NewsEventsSlide({
  title,
  description,
  image_url,
  redirect_link,
  showButton,
  openInSameTab,
  height
}) {
  return (
    <div
      className="w-full bg-[length:cover,contain] bg-[position:center,top] bg-[repeat:no-repeat,no-repeat]"
      style={{ backgroundImage: `url("${image_url}")`, height }}
    >
      {/* Displays all slide information in rectangular box */}
      <div className="absolute top-[7%] left-[15%] md:left-1/2 md:-translate-x-1/2 lg:left-[15%] lg:translate-x-0 bg-brand-dark-purple/20 w-[75%] min-[350px]:w-[70.5vw] md:w-128 h-fit p-5 min-[350px]:p-8 lg:p-12 text-white">
        {/* Title */}
        {title ? (
          <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-5"> {title} </h1>
        ) : null}
        {/* Description */}
        {description ? <p className="mb-5 text-sm lg:text-base"> {description}</p> : null}
        {/* Button */}
        {showButton ? (
          <CustomButton
            openInSameTab={openInSameTab}
            redirect_link={redirect_link}
            text="Learn More"
          />
        ) : null}
      </div>
    </div>
  )
}
