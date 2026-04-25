import { Tooltip as BaseTooltip } from '@base-ui/react'
import * as React from 'react'

import { cn } from '../../lib/utils'

const TooltipProvider = BaseTooltip.Provider

const Tooltip = BaseTooltip.Root

const TooltipTrigger = BaseTooltip.Trigger

const TooltipPortal = BaseTooltip.Portal

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset}>
        <BaseTooltip.Popup
          ref={ref}
          className={cn(
            `
              fade-in-0 zoom-in-95
              data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
              data-[side=left]:slide-in-from-right-2
              data-[side=right]:slide-in-from-left-2
              data-[side=top]:slide-in-from-bottom-2
              z-50 animate-in overflow-hidden rounded-md border bg-popover px-3
              py-1.5 text-sm text-popover-foreground shadow-md
              data-[state=closed]:animate-out
            `,
            className
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
)
TooltipContent.displayName = 'TooltipContent'

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipPortal }
