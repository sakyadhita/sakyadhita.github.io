import { useCallback } from 'react'
import type { FormValues } from './useFormState'

interface ValidationErrors {
  firstName: boolean
  lastName: boolean
  email: boolean
  country: boolean
  address: boolean
  city: boolean
  state: boolean
  zipcode: boolean
}

export interface FormValidationResult {
  isValid: boolean
  errors: ValidationErrors
}

export function useFormValidation() {
  const validateRequiredFields = useCallback(
    (
      values: FormValues,
      membershipCheck: boolean,
      memberType: string,
      organizations: string,
      selectedMembershipIndex: number,
      donateCheck: boolean,
      donation: number
    ): FormValidationResult => {
      const errors: ValidationErrors = {
        firstName: values.firstName.value === '',
        lastName: values.lastName.value === '',
        email: values.emailAddress.value === '',
        country: values.country.value === '',
        address: values.addressOne.value === '',
        city: values.city.value === '',
        state: values.stateLocation.value === '',
        zipcode: values.zipcode.value === ''
      }

      const missingMembership =
        !membershipCheck &&
        (memberType === '' || organizations === '' || selectedMembershipIndex === 0)
      const missingDonation = donateCheck && donation === 0

      const isValid = !Object.values(errors).some(Boolean) && !missingMembership && !missingDonation

      return { isValid, errors }
    },
    []
  )

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [])

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    // Allow empty or valid phone formats
    if (phone === '') return true
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone)
  }, [])

  return { validateRequiredFields, validateEmail, validatePhoneNumber }
}
