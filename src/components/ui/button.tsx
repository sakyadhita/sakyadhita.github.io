import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  `
    focus-visible:ring-ring
    inline-flex items-center justify-center rounded-md text-sm font-medium
    whitespace-nowrap transition-colors
    focus-visible:ring-1 focus-visible:outline-none
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          bg-brand-dark-purple text-white shadow-sm
          hover:bg-brand-light-purple
        `,
        destructive: `
          bg-brand-red text-white shadow-sm
          hover:bg-brand-red/90
        `,
        outline: `
          border-input bg-background
          hover:bg-accent hover:text-accent-foreground
          border shadow-sm
        `,
        secondary: `
          bg-brand-orange text-white shadow-sm
          hover:bg-brand-dark-orange
        `,
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: `
          text-brand-dark-purple underline-offset-4
          hover:underline
        `,
        cta: `
          h-auto w-44 rounded-full border-none bg-brand-orange py-2 font-body
          text-sm font-bold text-white uppercase
          shadow-[2px_2px_2px_rgb(63,62,62)] transition-transform
          hover:bg-brand-dark-orange
          active:scale-95
        `
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
