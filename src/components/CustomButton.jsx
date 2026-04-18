import React from 'react'
import { cn } from '../lib/utils'
import { buttonVariants } from './ui/button'

/**
 * Component that renders a button that redirects to a new page
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
  const classes = cn(
    'w-44 bg-brand-orange hover:bg-brand-dark-orange rounded-full shadow-[2px_2px_2px_rgb(63,62,62)] text-white uppercase font-bold h-auto py-2 text-sm font-body transition-transform active:scale-95 border-none inline-flex items-center justify-center no-underline hover:no-underline',
    className
  )

  if (redirect_link) {
    return (
      <a
        href={redirect_link}
        target={openInSameTab ? null : '_blank'}
        rel="noreferrer"
        className={classes}
        onClick={onClickCallback}
      >
        {text}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClickCallback} className={classes}>
      {text}
    </button>
  )
}
