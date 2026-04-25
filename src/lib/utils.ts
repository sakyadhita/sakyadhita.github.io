import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ordinal_suffix_of = (i: number) => {
  const ones = i % 10
  const hundreds = i % 100
  if (ones === 1 && hundreds !== 11) return `${i}st`
  if (ones === 2 && hundreds !== 12) return `${i}nd`
  if (ones === 3 && hundreds !== 13) return `${i}rd`
  return `${i}th`
}

export const determineLocationLabel = (location: string) => {
  const splitLocation = location.split(',')
  if (splitLocation.length > 2) splitLocation.shift()
  return splitLocation.join(', ')
}
