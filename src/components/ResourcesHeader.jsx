/**
 * This file creates a component for the resources header with an image, title, and description text.
 *
 * @summary Creates a component for resources header
 * @author Dhanush Nanjunda Reddy, Amrit Kaur Singh
 */
import React from 'react'

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
      className="relative bg-[length:cover,contain] bg-[position:center,top] bg-[repeat:no-repeat,no-repeat]"
      style={{
        backgroundImage: `url("${image}")`,
        height,
        width
      }}
    >
      {/* Purple box with a title and description */}
      <div className="absolute ml-[7.19vw] min-[601px]:ml-[10%] mt-[10%] top-[7.78vw] min-[601px]:top-0 bg-brand-dark-purple/85 w-[66%] min-[601px]:w-[489px] h-fit p-[0vw_2.34vw_1vw_0vw] min-[601px]:p-[2.97vw_3vw_2.97vw_3vw] text-white">
        {title ? (
          <h1 className="font-heading font-bold text-[5.63vw] min-[601px]:text-[36px] leading-[170%] min-[601px]:leading-[45px] w-full ml-[6.25vw] min-[601px]:ml-0 mt-[4.19vw] min-[601px]:mt-0">
            {title}
          </h1>
        ) : null}
        {text ? (
          <p className="font-body font-normal text-[5vw] min-[450px]:text-[3vw] min-[601px]:text-[18px] leading-[6.88vw] min-[450px]:leading-[5vw] min-[601px]:leading-[25px] m-[4.8vh_6.25vw_9vh_6.25vw] min-[601px]:m-[1.09vw_0_0_0]">
            {text}
          </p>
        ) : null}
      </div>
    </div>
  )
}
