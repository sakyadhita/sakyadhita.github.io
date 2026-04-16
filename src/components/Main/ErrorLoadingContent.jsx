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

import React from 'react'
import { AlertCircle } from 'lucide-react'

export const ErrorLoadingContent = ({ height = '100%', width = '100%' }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-900 text-white rounded-2xl space-y-4"
      style={{ height, width }}
    >
      <AlertCircle className="w-16 h-16 text-brand-red animate-pulse" />
      <p className="text-xl font-bold font-heading tracking-wide lowercase">
        Failed to load content
      </p>
    </div>
  )
}
