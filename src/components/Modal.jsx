/**
 * This is a custom modal that can be reused for other pages.
 * Takes in the following props:
 *  - open: control if the modal should be open or not
 *  - hide: function to hide the modal
 *  - text: required, pass in text for the modal.
 *  - url: required if button is rendered within modal,
 *         directs the user to the specified link.
 *
 * @summary     popup modal
 * @author      Amitesh Sharma
 */

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

export default function CustomModal({
  hide,
  open,
  text,
  negativeButtonText,
  positiveButtonText,
  positiveUrl
}) {
  // redirect to the registration url
  const redirectLink = () => {
    window.location.href = positiveUrl
  }

  return (
    <Dialog open={open} onOpenChange={hide}>
      <DialogContent className="max-w-md border-2 border-brand-orange p-4 rounded-lg bg-white">
        <DialogHeader>
          <DialogTitle className="sr-only">Notification</DialogTitle>
          <DialogDescription className="text-center text-[23px] text-black pt-4 px-4 font-body">
            {text}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row justify-center mt-6 space-x-4 mb-4">
          {negativeButtonText && (
            <Button
              variant="outline"
              onClick={() => hide(false)}
              className="border-[1.2px] border-black bg-transparent text-black text-[18px] min-w-[120px] rounded-[3vw] font-bold font-body h-10"
            >
              {negativeButtonText}
            </Button>
          )}

          {positiveButtonText && (
            <Button
              onClick={redirectLink}
              className="bg-brand-orange text-white text-[18px] min-w-[120px] rounded-[3vw] font-bold hover:bg-brand-dark-orange font-body h-10"
            >
              {positiveButtonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
