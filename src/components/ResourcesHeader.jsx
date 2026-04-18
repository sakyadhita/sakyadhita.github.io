/**
 * This file creates a component for the resources header with an image, title, and description text.
 * React version for compatibility with legacy React layouts.
 *
 * @summary Creates a component for resources header
 * @author Dhanush Nanjunda Reddy, Amrit Kaur Singh
 */

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
export default function ResourcesHeader({ image, height, width, title, text }) {
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
      <div className="absolute ml-[7vw] sm:ml-[10%] mt-[10%] top-8 sm:top-0 bg-brand-dark-purple/90 w-2/3 sm:w-128 h-fit p-8 text-white">
        {title ? (
          <h1 className="font-heading font-bold text-2xl sm:text-4xl leading-relaxed w-full ml-6 sm:ml-0 mt-4 sm:mt-0">
            {title}
          </h1>
        ) : null}
        {text ? <p className="font-body font-normal text-lg leading-relaxed mt-4">{text}</p> : null}
      </div>
    </div>
  )
}
