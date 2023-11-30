/**
 * This file creates a component for the image header with an image and title.
 *
 * @summary Creates a component for Contact Page Image Header.
 * @author Amrit Kaur Singh
 */
import React from 'react'
import '../../css/ImageHeader.css'

export default function ImageHeader(props) {
  return (
    // main background image
    <div
      className="contact-image-header"
      style={{
        backgroundImage: `url("${props.image}")`,
        height: props.height,
        width: props.width
      }}
    >
      {/* title in purple background */}
      {props.title ? (
        <div className="info-wrapper">
          <h1 className="info-title">{props.title}</h1>
        </div>
      ) : null}
    </div>
  )
}
