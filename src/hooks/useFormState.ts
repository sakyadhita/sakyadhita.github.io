import { useReducer, useCallback } from 'react'

export interface FormValues {
  firstName: { value: string; error: boolean }
  middleName: { value: string; error: boolean }
  lastName: { value: string; error: boolean }
  phoneNumber: { value: string; error: boolean }
  emailAddress: { value: string; error: boolean }
  country: { value: string; error: boolean }
  addressOne: { value: string; error: boolean }
  addressTwo: { value: string; error: boolean }
  city: { value: string; error: boolean }
  stateLocation: { value: string; error: boolean }
  zipcode: { value: string; error: boolean }
}

export interface FormState {
  values: FormValues
  organizations: string
  donation: number
  selectedMembershipIndex: number
  memberType: boolean
  isNewMember: string
  membershipCheck: boolean
  donateCheck: boolean
  displayPayPal: boolean
  displayPayPalModal: boolean
  isFormDisabled: boolean
  isThankYouNoteOpen: boolean
  snackbar: { open: boolean; message: string }
}

export type FormAction =
  | { type: 'SET_FIELD'; payload: { field: keyof FormValues; value: string } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: keyof FormValues; error: boolean } }
  | { type: 'SET_ORGANIZATIONS'; payload: string }
  | { type: 'SET_DONATION'; payload: number }
  | { type: 'SET_MEMBERSHIP_INDEX'; payload: number }
  | { type: 'SET_MEMBER_TYPE'; payload: boolean }
  | { type: 'SET_IS_NEW_MEMBER'; payload: string }
  | { type: 'SET_MEMBERSHIP_CHECK'; payload: boolean }
  | { type: 'SET_DONATE_CHECK'; payload: boolean }
  | { type: 'SET_DISPLAY_PAYPAL'; payload: boolean }
  | { type: 'SET_DISPLAY_PAYPAL_MODAL'; payload: boolean }
  | { type: 'SET_FORM_DISABLED'; payload: boolean }
  | { type: 'SET_THANK_YOU_OPEN'; payload: boolean }
  | { type: 'SET_SNACKBAR'; payload: { open: boolean; message: string } }
  | { type: 'RESET_FORM' }
  | { type: 'SET_MULTIPLE_ERRORS'; payload: Record<keyof FormValues, boolean> }

const initialFormValues: FormValues = {
  firstName: { value: '', error: false },
  middleName: { value: '', error: false },
  lastName: { value: '', error: false },
  phoneNumber: { value: '', error: false },
  emailAddress: { value: '', error: false },
  country: { value: '', error: false },
  addressOne: { value: '', error: false },
  addressTwo: { value: '', error: false },
  city: { value: '', error: false },
  stateLocation: { value: '', error: false },
  zipcode: { value: '', error: false }
}

export const initialFormState: FormState = {
  values: initialFormValues,
  organizations: '',
  donation: 0,
  selectedMembershipIndex: 0,
  memberType: false,
  isNewMember: '',
  membershipCheck: false,
  donateCheck: false,
  displayPayPal: false,
  displayPayPalModal: false,
  isFormDisabled: false,
  isThankYouNoteOpen: false,
  snackbar: { open: false, message: '' }
}

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD': {
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: {
            value: action.payload.value,
            error: false
          }
        }
      }
    }
    case 'SET_FIELD_ERROR': {
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: {
            ...state.values[action.payload.field],
            error: action.payload.error
          }
        }
      }
    }
    case 'SET_MULTIPLE_ERRORS': {
      return {
        ...state,
        values: {
          ...state.values,
          ...Object.entries(action.payload).reduce((acc, [field, error]) => {
            acc[field as keyof FormValues] = {
              value: state.values[field as keyof FormValues].value,
              error
            }
            return acc
          }, {} as FormValues)
        }
      }
    }
    case 'SET_ORGANIZATIONS': {
      return { ...state, organizations: action.payload }
    }
    case 'SET_DONATION': {
      return { ...state, donation: action.payload }
    }
    case 'SET_MEMBERSHIP_INDEX': {
      return { ...state, selectedMembershipIndex: action.payload }
    }
    case 'SET_MEMBER_TYPE': {
      return { ...state, memberType: action.payload }
    }
    case 'SET_IS_NEW_MEMBER': {
      return { ...state, isNewMember: action.payload, memberType: action.payload === 'new' }
    }
    case 'SET_MEMBERSHIP_CHECK': {
      return { ...state, membershipCheck: action.payload }
    }
    case 'SET_DONATE_CHECK': {
      return {
        ...state,
        donateCheck: action.payload,
        donation: action.payload ? state.donation : 0
      }
    }
    case 'SET_DISPLAY_PAYPAL': {
      return { ...state, displayPayPal: action.payload }
    }
    case 'SET_DISPLAY_PAYPAL_MODAL': {
      return { ...state, displayPayPalModal: action.payload }
    }
    case 'SET_FORM_DISABLED': {
      return { ...state, isFormDisabled: action.payload }
    }
    case 'SET_THANK_YOU_OPEN': {
      return { ...state, isThankYouNoteOpen: action.payload }
    }
    case 'SET_SNACKBAR': {
      return { ...state, snackbar: action.payload }
    }
    case 'RESET_FORM': {
      return {
        ...state,
        values: initialFormValues,
        organizations: '',
        donation: 0,
        selectedMembershipIndex: 0,
        memberType: false,
        isNewMember: '',
        membershipCheck: false,
        donateCheck: false,
        displayPayPalModal: false
      }
    }
    default: {
      return state
    }
  }
}

export function useFormState() {
  const [state, dispatch] = useReducer(formReducer, initialFormState)

  const setField = useCallback((field: keyof FormValues, value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } })
  }, [])

  const setFieldError = useCallback((field: keyof FormValues, error: boolean) => {
    dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } })
  }, [])

  const setMultipleErrors = useCallback((errors: Record<keyof FormValues, boolean>) => {
    dispatch({ type: 'SET_MULTIPLE_ERRORS', payload: errors })
  }, [])

  return { state, dispatch, setField, setFieldError, setMultipleErrors }
}
