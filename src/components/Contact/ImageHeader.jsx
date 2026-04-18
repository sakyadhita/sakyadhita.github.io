/**
 * This file creates a component for the image header with an image and title.
 *
 * @summary Creates a component for Contact Page Image Header.
 * @author Amrit Kaur Singh
 */
import React from 'react'

export default function ImageHeader(props) {
  return (
    // main background image
    <div
      className="relative bg-[length:cover,contain] bg-[position:center,top] bg-[repeat:no-repeat,no-repeat]"
      style={{
        backgroundImage: `url("${props.image}")`,
        height: props.height,
        width: props.width
      }}
    >
      {/* title in purple background */}
      {props.title ? (
        <div className="absolute ml-[10%] mt-[10%] bg-[#6652a0]/85 w-fit h-fit p-[max(2.5vw,20px)] text-white">
          <h1 className="font-heading font-bold text-[24px] min-[300px]:text-[34px] leading-[25px] w-full">
            {props.title}
          </h1>
        </div>
      ) : null}
    </div>
  )
}
