import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

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
      window.location.href = positiveUrl
    }
  }

  return (
    <Dialog open={open} onOpenChange={hide}>
      <DialogContent className="max-w-md border-2 border-brand-orange p-4 rounded-lg bg-white">
        <DialogHeader>
          <DialogTitle className="sr-only">Notification</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-2xl text-black pt-4 px-4 font-body">
          {text}
        </DialogDescription>

        <div className="flex flex-row justify-center mt-6 space-x-4 mb-4">
          {negativeButtonText && (
            <Button
              variant="outline"
              onClick={() => hide(false)}
              className="border-[1.2px] border-black bg-transparent text-black text-lg min-w-32 rounded-full font-bold font-body h-10"
            >
              {negativeButtonText}
            </Button>
          )}

          {positiveButtonText && (
            <Button
              onClick={redirectLink}
              className="bg-brand-orange text-white text-lg min-w-32 rounded-full font-bold hover:bg-brand-dark-orange font-body h-10"
            >
              {positiveButtonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
