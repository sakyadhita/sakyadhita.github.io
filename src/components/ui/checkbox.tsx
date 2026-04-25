import { Checkbox as BaseCheckbox } from '@base-ui/react'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'

interface CheckboxProps extends React.HTMLAttributes<HTMLSpanElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  value?: string
  id?: string
  disabled?: boolean
}

const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, value, id, disabled, ...props }, ref) => (
    <BaseCheckbox.Root
      data-slot="checkbox"
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      value={value}
      id={id}
      disabled={disabled}
      className={cn(
        `
          peer size-4 shrink-0 rounded-sm border border-primary shadow-sm
          focus-visible:ring-1 focus-visible:ring-ring
          focus-visible:outline-none
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
  )
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
