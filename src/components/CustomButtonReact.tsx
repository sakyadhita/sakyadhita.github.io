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
    `
      inline-flex h-auto w-44 items-center justify-center rounded-full
      border-none bg-brand-orange py-2 font-body text-sm font-bold text-white
      uppercase no-underline shadow-[2px_2px_2px_rgb(63,62,62)]
      transition-transform
      hover:bg-brand-dark-orange hover:no-underline
      active:scale-95
    `,
    className
  )

  if (redirect_link) {
    return (
      <a
        href={redirect_link}
        target={openInSameTab ? '_self' : '_blank'}
        className={classes}
        rel="noreferrer"
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
