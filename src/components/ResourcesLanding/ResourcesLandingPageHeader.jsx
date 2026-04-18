/**
 * This file creates a component for the image header for Resources Landing Page.
 *
 * @summary Creates a component for resources header
 * @author Amrit Kaur Singh, Dhanush
 */
import React from 'react'

export default function ResourcesLandingPageHeader({ image, height, width, title, text }) {
  return (
    <div
      className="relative bg-[length:cover,contain] bg-[position:center,top] bg-[repeat:no-repeat,no-repeat]"
      style={{
        backgroundImage: `url("${image}")`,
        height,
        width
      }}
    >
      {/* Purple box with a title and description */}
      <div className="absolute left-[10%] md:left-[15%] top-1/3 md:top-[40%] -translate-y-1/2 bg-brand-dark-purple/90 w-2/3 md:w-auto h-auto p-8 md:p-10 text-white">
        {title ? (
          <h1 className="font-heading font-bold text-3xl md:text-4xl leading-tight">{title}</h1>
        ) : null}
        {text ? (
          <p className="font-body font-normal text-lg md:text-xl leading-relaxed mt-4">{text}</p>
        ) : null}
      </div>
    </div>
  )
}
