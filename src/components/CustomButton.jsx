/**
 * Renders a custom button for the site, with display and linking information passed as props.
 *
 * @summary Displays one custom button.
 *
 * @author Amrit Kaur Singh
 */

import React from 'react'
// import Button from "@material-ui/core/Button";
import '../css/CustomButton.css'

/**
 *
 * @param {string} text  - The display name given to the button
 * @param {string} redirect_url  - The redirect url once the button is clicked
 * @param {boolean} openInSameTab  - True if redirect_url is open in same tab, false if it is opened in new tab
 *
 * @returns One Custom Button
 */
export default function CustomButton({
  text,
  redirect_link,
  openInSameTab = false,
  onClickCallback,
  style = null
}) {
  return (
    // <Button
    //     style={style}
    //     onClick={onClickCallback}
    //     href={redirect_link}
    //     target={openInSameTab ? null : "_blank"}
    //     rel="noreferrer noopener"
    //     variant="contained"
    //     size="large"
    //     className="Custom-Button"
    // >
    //     {text}
    // </Button>
    <a
      style={style}
      onClick={onClickCallback}
      href={redirect_link}
      target={openInSameTab ? null : '_blank'}
      className="Custom-Button"
    >
      {text}
    </a>
  )
}
