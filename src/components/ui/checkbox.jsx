import { Checkbox as BaseCheckbox } from '@base-ui/react'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <BaseCheckbox.Root
    data-slot="checkbox"
    ref={ref}
    className={cn(
      `
        peer border-primary
        focus-visible:ring-ring
        size-4 shrink-0 rounded-sm border shadow-sm
        focus-visible:ring-1 focus-visible:outline-none
        disabled:cursor-not-allowed disabled:opacity-50
        data-checked:bg-brand-orange data-checked:text-white
      `,
      className
    )}
    {...props}
  >
    <BaseCheckbox.Indicator
      data-slot="checkbox-indicator"
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="size-4" />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }
