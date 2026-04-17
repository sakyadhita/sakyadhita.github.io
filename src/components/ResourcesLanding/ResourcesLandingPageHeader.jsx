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
      <div className="absolute left-[10%] md:left-[15%] top-[30%] md:top-[40%] -translate-x-[50%] -translate-y-[50%] bg-brand-dark-purple/85 w-[min(fit-content,56%)] md:w-[min(fit-content,66%)] h-fit p-[4vw] md:p-[2.67vw_2.34vw_1.67vw_2.34vw] text-white">
        {title ? (
          <h1 className="font-heading font-bold text-[6.63vw] md:text-[36px] leading-[170%] md:leading-[45px]">
            {title}
          </h1>
        ) : null}
        {text ? (
          <p className="font-body font-normal text-[5vw] min-[450px]:text-[3vw] md:text-[18px] leading-[6.88vw] min-[450px]:leading-[5vw] md:leading-[25px]">
            {text}
          </p>
        ) : null}
      </div>
    </div>
  )
}
