/**
 * This renders a error component for when
 * video fail to render. Takes in two props:
 *
 * height
 * width
 *
 * @summary     conferences page
 * @author      Amitesh Sharma
 */

import { AlertCircle } from 'lucide-react'

interface ErrorLoadingContentProps {
  height?: string
  width?: string
}

export const ErrorLoadingContent = ({
  height = '100%',
  width = '100%'
}: ErrorLoadingContentProps) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center space-y-4 rounded-2xl
        bg-gray-900 text-white
      "
      style={{ height, width }}
    >
      <AlertCircle className="size-16 animate-pulse text-brand-red" />
      <p className="font-heading text-xl font-bold tracking-wide lowercase">
        Failed to load content
      </p>
    </div>
  )
}
