/**
 * Contains the Sakyadhita logo, name, and subtitle for navbar and footer.
 * By default renders starting from the left for the navbar. If "footer" is
 * passed in for props.location, renders from the right for the footer.
 *
 * @summary     Contains the Sakyadhita logo, name, and subtitle.
 * @author      Aaron Kirk
 */

import React from 'react'
import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'

export default function Brand({ location }) {
  const isFooter = location === 'footer'

  return (
    <a
      href={SITE_PAGES.HOME}
      className={cn(
        'flex items-center text-inherit hover:no-underline hover:text-inherit',
        isFooter
          ? 'flex-row-reverse text-right justify-end text-white hover:text-white'
          : 'text-left justify-start'
      )}
    >
      <img
        src="/logo.svg"
        alt="Logo"
        className={cn(
          isFooter ? 'h-[80px] md:h-[max(150px,18.5vw)]' : 'h-9 md:h-[max(90px,13.5vw)]'
        )}
      />
      <div
        className={cn(
          'branding flex flex-col',
          isFooter ? 'mr-2 md:mr-[10px]' : 'ml-[5px] md:ml-[10px]'
        )}
      >
        <h3
          className={cn(
            'font-heading mb-0 lowercase',
            isFooter ? 'text-[1.35em] md:text-[2.2em]' : 'text-[1.125em] md:text-[1.8em]'
          )}
        >
          sakyadhita
        </h3>
        <span
          className={cn(
            'font-body text-[1.125em] lowercase opacity-90',
            isFooter ? 'hidden sm:block' : 'hidden md:block'
          )}
        >
          international association of buddhist women
        </span>
      </div>
    </a>
  )
}
