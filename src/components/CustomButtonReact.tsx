import { cn } from '../lib/utils'

interface CustomButtonProps {
  text: string
  redirect_link?: string
  openInSameTab?: boolean
  onClickCallback?: () => void
  className?: string
}

/**
 * Component that renders a button that redirects to a new page
 *
 * @param {string} text  - The display text for the button
 * @param {string} redirect_link  - The redirect url once the button is clicked
 * @param {boolean} openInSameTab  - True if redirect_link is open in same tab, false if it is opened in new tab
 *
 * @returns One Custom Button
 */
export default function CustomButton({
  text,
  redirect_link,
  openInSameTab = false,
  onClickCallback,
  className = ''
}: CustomButtonProps) {
  const classes = cn(
    'w-44 bg-brand-orange hover:bg-brand-dark-orange rounded-full shadow-[2px_2px_2px_rgb(63,62,62)] text-white uppercase font-bold h-auto py-2 text-sm font-body transition-transform active:scale-95 border-none inline-flex items-center justify-center no-underline hover:no-underline',
    className
  )

  if (redirect_link) {
    return (
      <a href={redirect_link} target={openInSameTab ? '_self' : '_blank'} className={classes}>
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
