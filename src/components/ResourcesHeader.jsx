/**
 * This file creates a component for the resources header with an image, title, and description text.
 *
 * @summary Creates a component for resources header
 * @author Dhanush Nanjunda Reddy, Amrit Kaur Singh
 */
import React from 'react'
import { FiArrowDownCircle } from 'react-icons/fi'
import '../css/ResourcesHeader.css'

/**
 *
 * Required Params
 * @param {string} image - Url to background image
 * @param {int} height - height of background image
 * @param {int} width - width of background image
 *
 * Optional Params
 * @param {string} title - Title for resource header
 * @param {string} text - Subtext for resource header (displayed below title)
 * @param {bool} showArrow - Default true. Indicates whether to show white arrow on bottom right
 * @param {function} arrowClickCallback - Only applicable if showArrow is also set to true. Callback used when arrow is clicked by user.
 */
export default function ResourcesHeader({
  image,
  height,
  width,
  title,
  text,
  showArrow = true,
  arrowClickCallback = null
}) {
  return (
    <div
      className="header-div"
      style={{
        backgroundImage: `url("${image}")`,
        height,
        width
      }}
    >
      {/* Purple box with a title and description */}
      <div className="header-info-div">
        {title ? <h1 className="header-text">{title}</h1> : null}
        {text ? <p className="header-info">{text}</p> : null}
      </div>
      {/* Displays white arrow on bottom left of slide */}
      {showArrow ? (
        <div className="circle-arrow">
          <FiArrowDownCircle onClick={arrowClickCallback} />
        </div>
      ) : null}
    </div>
  )
}
