import { Dialog as BaseDialog } from '@base-ui/react'
import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogPortal = BaseDialog.Portal
const DialogClose = BaseDialog.Close

type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Backdrop
      data-slot="dialog-overlay"
      ref={ref}
      className={cn('fade-in-0 fixed inset-0 z-50 animate-in bg-black/80', className)}
      {...props}
    />
  )
)
DialogOverlay.displayName = 'DialogOverlay'

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <BaseDialog.Popup
        data-slot="dialog-content"
        ref={ref}
        className={cn(
          `
            fade-in-0 zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full
            max-w-lg -translate-1/2 animate-in gap-4 border bg-background p-6
            shadow-lg duration-200
            sm:rounded-lg
          `,
          className
        )}
        {...props}
      >
        {children}
        <BaseDialog.Close
          className="
            absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background
            transition-opacity
            hover:opacity-100
            focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none
            disabled:pointer-events-none
          "
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </BaseDialog.Close>
      </BaseDialog.Popup>
    </DialogPortal>
  )
)
DialogContent.displayName = 'DialogContent'

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn(
        `
          flex flex-col space-y-1.5 text-center
          sm:text-left
        `,
        className
      )}
      {...props}
    />
  )
)
DialogHeader.displayName = 'DialogHeader'

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        `
          flex flex-col-reverse
          sm:flex-row sm:justify-end sm:space-x-2
        `,
        className
      )}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Title
      data-slot="dialog-title"
      ref={ref}
      className={cn('text-lg leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
)
DialogTitle.displayName = 'DialogTitle'

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Description
      data-slot="dialog-description"
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
DialogDescription.displayName = 'DialogDescription'

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
