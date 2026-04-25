import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

interface CustomModalProps {
  hide: (value: boolean) => void
  open: boolean
  text: string
  negativeButtonText?: string
  positiveButtonText?: string
  positiveUrl?: string
}

export default function CustomModal({
  hide,
  open,
  text,
  negativeButtonText,
  positiveButtonText,
  positiveUrl
}: CustomModalProps) {
  // redirect to the registration url
  const redirectLink = () => {
    if (positiveUrl) {
      globalThis.location.href = positiveUrl
    }
  }

  return (
    <Dialog open={open} onOpenChange={hide}>
      <DialogContent
        className="
          max-w-md rounded-lg border-2 border-brand-orange bg-white p-4
        "
      >
        <DialogHeader>
          <DialogTitle className="sr-only">Notification</DialogTitle>
        </DialogHeader>
        <DialogDescription
          className="px-4 pt-4 text-center font-body text-2xl text-black"
        >
          {text}
        </DialogDescription>

        <div className="mt-6 mb-4 flex flex-row justify-center space-x-4">
          {negativeButtonText && (
            <Button
              variant="outline"
              onClick={() => hide(false)}
              className="
                h-10 min-w-32 rounded-full border-[1.2px] border-black
                bg-transparent font-body text-lg font-bold text-black
              "
            >
              {negativeButtonText}
            </Button>
          )}

          {positiveButtonText && (
            <Button
              onClick={redirectLink}
              className="
                h-10 min-w-32 rounded-full bg-brand-orange font-body text-lg
                font-bold text-white
                hover:bg-brand-dark-orange
              "
            >
              {positiveButtonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
