/**
 * Renders a custom button for the site, with display and linking information passed as props.
 *
 * @summary Displays one custom button.
 *
 * @author Amrit Kaur Singh
 */

import React from 'react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

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
  className = ''
}) {
  return (
    <Button
      asChild
      onClick={onClickCallback}
      className={cn(
        'w-[175px] bg-brand-orange hover:bg-brand-dark-orange rounded-[30px] shadow-[2px_2px_2px_rgb(63,62,62)] text-white uppercase font-bold h-auto py-2 text-[0.9375rem] font-body transition-transform active:scale-95 border-none',
        className
      )}
    >
      <a href={redirect_link} target={openInSameTab ? null : '_blank'} rel="noreferrer">
        {text}
      </a>
    </Button>
  )
}
