import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <BaseCheckbox.Root
    data-slot="checkbox"
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-brand-orange data-[checked]:text-white',
      className
    )}
    {...props}
  >
    <BaseCheckbox.Indicator
      data-slot="checkbox-indicator"
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }
