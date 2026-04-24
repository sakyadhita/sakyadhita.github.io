import { Select as BaseSelect } from '@base-ui/react'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'

const Select = BaseSelect.Root
const SelectValue = BaseSelect.Value

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    data-slot="select-trigger"
    ref={ref}
    className={cn(
      `
        border-input ring-offset-background
        placeholder:text-muted-foreground
        focus:ring-ring
        flex h-9 w-full items-center justify-between rounded-md border
        bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm
        focus:ring-1 focus:outline-none
        disabled:cursor-not-allowed disabled:opacity-50
        [&>span]:line-clamp-1
      `,
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="size-4 opacity-50" />
  </BaseSelect.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <BaseSelect.Portal>
    <BaseSelect.Positioner data-slot="select-positioner" sideOffset={4}>
      <BaseSelect.Popup
        data-slot="select-content"
        ref={ref}
        className={cn(
          `
            bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95
            relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border
            shadow-md
          `,
          className
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  </BaseSelect.Portal>
))
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    data-slot="select-item"
    ref={ref}
    className={cn(
      `
        focus:bg-accent focus:text-accent-foreground
        relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8
        pl-2 text-sm outline-none select-none
        data-disabled:pointer-events-none data-disabled:opacity-50
      `,
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <BaseSelect.ItemIndicator data-slot="select-item-indicator">
        <Check className="size-4" />
      </BaseSelect.ItemIndicator>
    </span>
    <BaseSelect.ItemText data-slot="select-item-text">{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
))
SelectItem.displayName = 'SelectItem'

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }
