import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react'
import { X } from 'lucide-react'
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
      className={cn('fixed inset-0 z-50 bg-black/80 animate-in fade-in-0', className)}
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
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 sm:rounded-lg',
          className
        )}
        {...props}
      >
        {children}
        <BaseDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
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
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
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
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
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
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
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
