import React, { useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'

import { cn } from '../../lib/utils'
import CustomButton from '../CustomButtonReact'
import Modal from '../Modal'
import { Input } from '../ui/input'
import VolunteerOption from '../VolunteerOption'

// function to display asterisk for required fields
function displayAsterisk() {
  return <span className="
    error-asterisk ml-2 shrink-0 text-xl font-bold text-brand-red
  ">*</span>
}

// funcion to render all volunteer committees
function displayCommittees(volunteerCommittees, selectedCommittees, handleCommitteesChange) {
  return (
    <div
      className="
        volunteer-options grid grid-cols-1 gap-6
        md:grid-cols-2 md:gap-12
      "
    >
      {volunteerCommittees.map((committee) => (
        <VolunteerOption
          key={committee.id}
          value={committee.id}
          checked={selectedCommittees.includes(committee.id)}
          handleChange={handleCommitteesChange}
          title={committee.data.title}
          description={committee.data.description}
        />
      ))}
    </div>
  )
}

interface CommitteeData {
  id: string
  data: {
    startYear: number
    endYear: number
    name: string
    position: string
    redirectLink?: string
    openInSameTab?: boolean
    htmlBody?: string
    optimizedImage?: string
    imageLink?: string
  }
}

interface VolunteerProps {
  interests: CommitteeData[]
}

export default function Volunteer({ interests }: VolunteerProps) {
  // stores values and error states for various field in form
  const [values, setValues] = useState({
    firstName: {
      value: '', // field value given by user
      error: false // field contains an error
    },
    middleName: {
      value: '',
      error: false
    },
    lastName: {
      value: '',
      error: false
    },
    phoneNumber: {
      value: '',
      error: false
    },
    emailAddress: {
      value: '',
      error: false
    },
    country: {
      value: '',
      error: false
    },
    addressOne: {
      value: '',
      error: false
    },
    addressTwo: {
      value: '',
      error: false
    },
    city: {
      value: '',
      error: false
    },
    stateLocation: {
      value: '',
      error: false
    },
    zipcode: {
      value: '',
      error: false
    }
  })

  // stores all volunteer committees selected by user
  const [selectedCommittees, setSelectedCommittees] = useState([])
  // tracks whether thank you modal should be open
  const [isThankYouNoteOpen, setIsThankYouNoteOpen] = React.useState(false)
  // tracks whether the form is disabled
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  // tracks whether error message for commitees is displayed
  const [committeesError, setCommitteesError] = useState(false)

  // snackbar used to display error messages
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: ''
  })

  // handles user input to any form field
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: {
        value: event.target.value
      }
    })
  }

  // handles user input to country field
  const handleCountryChange = (val) => {
    setValues({
      ...values,
      country: {
        value: val
      }
    })
  }

  // called when user decides to close thank you modal
  const handleModalClose = (event) => {
    setIsThankYouNoteOpen(event)
  }

  // handles any changes to committees selected
  function handleCommitteesChange(event) {
    const val = Number.parseInt(event.target.value, 10)
    if (selectedCommittees.includes(val)) {
      setSelectedCommittees(selectedCommittees.filter((committee) => committee !== val))
    } else {
      setSelectedCommittees((oldArray) => [...oldArray, val])
      setCommitteesError(false)
    }
  }

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  // called when submit button is clicked
  const handleSubmit = async () => {
    // ignore if form is still being processed
    if (isFormDisabled) return

    // disable form to avoid frequent requests
    setIsFormDisabled(true)
    // display loading cursor
    document.body.style.cursor = 'wait'

    // variables used to check if any field is blank
    let firstName = false
    let lastName = false
    let email = false
    let country = false
    let address = false
    let city = false
    let state = false
    let zipcode = false

    if (values.firstName.value === '') firstName = true
    if (values.lastName.value === '') lastName = true
    if (values.emailAddress.value === '') email = true
    if (values.country.value === '') country = true
    if (values.addressOne.value === '') address = true
    if (values.city.value === '') city = true
    if (values.stateLocation.value === '') state = true
    if (values.zipcode.value === '') zipcode = true

    // sets error values for all fields
    setValues({
      ...values,
      firstName: { ...values.firstName, error: firstName },
      lastName: { ...values.lastName, error: lastName },
      emailAddress: { ...values.emailAddress, error: email },
      country: { ...values.country, error: country },
      addressOne: { ...values.addressOne, error: address },
      city: { ...values.city, error: city },
      stateLocation: { ...values.stateLocation, error: state },
      zipcode: { ...values.zipcode, error: zipcode }
    })

    if (selectedCommittees.length === 0) {
      setCommitteesError(true)
    }

    // checks if any required fields are empty
    if (
      firstName ||
      lastName ||
      email ||
      country ||
      address ||
      city ||
      state ||
      zipcode ||
      selectedCommittees.length === 0
    ) {
      setSnackBar({ open: true, message: 'Missing required fields' })
      setIsFormDisabled(false)
      document.body.style.cursor = null
      return
    }

    // defines address to pass to backend
    const addressOpt = values.addressTwo.value === '' ? '' : `${values.addressTwo.value} `
    const givenAddress = `${values.addressOne.value} ${addressOpt}${values.city.value} ${values.stateLocation.value} ${values.country.value} ${values.zipcode.value}`
    const selectedInterests = selectedCommittees.map((c) => interests[c].data.title).join(',')

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'volunteer',
        fName: values.firstName.value,
        mName: values.middleName.value,
        lName: values.lastName.value,
        phone: values.phoneNumber.value,
        email: values.emailAddress.value,
        address: givenAddress,
        interests: selectedInterests
      })
    })
      // message sent
      .then(() => {
        // display thank you modal
        setIsThankYouNoteOpen(true)
        // clear form values
        setValues({
          ...values,
          firstName: { ...values.firstName, value: '' },
          middleName: { ...values.middleName, value: '' },
          lastName: { ...values.lastName, value: '' },
          phoneNumber: { ...values.phoneNumber, value: '' },
          emailAddress: { ...values.emailAddress, value: '' },
          country: { ...values.country, value: '' },
          addressOne: { ...values.addressOne, value: '' },
          addressTwo: { ...values.addressTwo, value: '' },
          city: { ...values.city, value: '' },
          stateLocation: { ...values.stateLocation, value: '' },
          zipcode: { ...values.zipcode, value: '' }
        })
        setSelectedCommittees([])
        setCommitteesError(false)
      })
      // message could not be sent
      .catch((error) => {
        // show snackbar to notify message could not be sent
        setSnackBar({
          open: true,
          message: error.toString()
        })
      })

    // allow form to be edited
    document.body.style.cursor = null
    setIsFormDisabled(false)
  }

  const inputClasses = (hasError) =>
    cn(
      `
        h-12 w-full rounded-2xl border-black bg-white px-4 font-body text-lg
        focus-visible:border-brand-dark-purple
        focus-visible:ring-brand-dark-purple
      `,
      hasError && 'border-brand-red'
    )

  return (
    <div className="font-body">
      <div
        className="
          mx-auto max-w-7xl space-y-12 px-6 py-12 text-black
          md:px-12
        "
      >
        <form autoComplete="off" className="mx-auto max-w-2xl space-y-4">
          <p className="mb-10 text-right font-body text-sm text-gray-500 italic">
            {' '}
            <span className="error-asterisk font-bold text-brand-red"> * </span> indicates a
            required field
          </p>
          <h1
            className="
              mt-12 mb-8 w-fit border-b-2 border-brand-orange pb-1 font-heading
              text-3xl text-brand-dark-purple lowercase italic
            "
          >
            Sign Me Up!
          </h1>
          {/* first name field */}
          <div className="mt-1! flex items-center">
            <div className="flex-1">
              <Input
                className={inputClasses(values.firstName.error)}
                placeholder="First Name"
                value={values.firstName.value}
                onChange={handleChange}
                disabled={isFormDisabled}
                name="firstName"
              />
            </div>
            {displayAsterisk()}
          </div>
          {/* middle name field */}
          <div className="mt-1! flex items-center">
            <div className="flex-1">
              <Input
                className={inputClasses(values.middleName.error)}
                placeholder="Middle Name"
                value={values.middleName.value}
                onChange={handleChange}
                disabled={isFormDisabled}
                name="middleName"
              />
            </div>
            <span className="ml-2 w-4 shrink-0" />
          </div>
          {/* last name field */}
          <div className="mt-1! flex items-center">
            <div className="flex-1">
              <Input
                className={inputClasses(values.lastName.error)}
                placeholder="Last Name"
                value={values.lastName.value}
                onChange={handleChange}
                disabled={isFormDisabled}
                name="lastName"
              />
            </div>
            {displayAsterisk()}
          </div>

          <h1
            className="
              mt-16 mb-8 w-fit border-b-2 border-brand-orange pb-1 font-heading
              text-3xl text-brand-dark-purple lowercase italic
            "
          >
            Contact Information
          </h1>
          {/* email address field */}
          <div className="mt-1! flex items-center">
            <div className="flex-1">
              <Input
                className={inputClasses(values.emailAddress.error)}
                placeholder="Email Address"
                type="email"
                value={values.emailAddress.value}
                onChange={handleChange}
                disabled={isFormDisabled}
                name="emailAddress"
              />
            </div>
            {displayAsterisk()}
          </div>
          {/* country dropdown field */}
          <div className="mt-1! flex items-center">
            <div className="flex-1">
              <CountryDropdown
                className="
                  input-field country-dropdown h-12 w-full rounded-2xl
                  border-black bg-white px-4 font-body text-lg transition-all
                  outline-none
                  focus:ring-2 focus:ring-brand-dark-purple
                "
                style={
                  values.country.error
                    ? { border: '1px solid #ea4444' }
                    : { border: '1px solid #000000' }
                }
                value={values.country.value}
                onChange={handleCountryChange}
                disabled={isFormDisabled}
              />
            </div>
            {displayAsterisk()}
          </div>
          {/* displays other address fields if country is selected */}
          {values.country.value === '' ? null : (
            <div
              className="
                fade-in slide-in-from-top-4 animate-in space-y-4 pt-4
                duration-500
              "
            >
              {/* address line 1 field */}
              <div className="mt-1! flex items-center">
                <div className="flex-1">
                  <Input
                    className={inputClasses(values.addressOne.error)}
                    placeholder="Address Line 1"
                    value={values.addressOne.value}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    name="addressOne"
                  />
                </div>
                {displayAsterisk()}
              </div>
              {/* address line 2 field */}
              <div className="mt-1! flex items-center">
                <div className="flex-1">
                  <Input
                    className={inputClasses(values.addressTwo.value)}
                    placeholder="Address Line 2"
                    value={values.addressTwo.value}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    name="addressTwo"
                  />
                </div>
                <span className="ml-2 w-4 shrink-0" />
              </div>
              {/* city field */}
              <div className="mt-1! flex items-center">
                <div className="flex-1">
                  <Input
                    className={inputClasses(values.city.error)}
                    placeholder="City"
                    value={values.city.value}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    name="city"
                  />
                </div>
                {displayAsterisk()}
              </div>
              {/* state field */}
              <div className="mt-1! flex items-center">
                <div className="flex-1">
                  <Input
                    className={inputClasses(values.stateLocation.error)}
                    placeholder="State"
                    value={values.stateLocation.value}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    name="stateLocation"
                  />
                </div>
                {displayAsterisk()}
              </div>
              {/* zipcode field */}
              <div className="mt-1! flex items-center">
                <div className="flex-1">
                  <Input
                    className={inputClasses(values.zipcode.error)}
                    placeholder="Zip Code"
                    value={values.zipcode.value}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    name="zipcode"
                  />
                </div>
                {displayAsterisk()}
              </div>
              {/* phone number field */}
              <div className="mt-1! flex items-center">
                <div className="flex-1">
                  <Input
                    className={inputClasses(values.phoneNumber.error)}
                    placeholder="Phone Number"
                    type="tel"
                    value={values.phoneNumber.value}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    name="phoneNumber"
                  />
                </div>
                <span className="ml-2 w-4 shrink-0" />
              </div>
            </div>
          )}

          <div className="space-y-6 pt-10">
            <h1
              className="
                text-center font-heading text-3xl text-brand-dark-purple
                lowercase italic
              "
            >
              What would you like to help with?
            </h1>
            <p className="text-center font-body text-lg text-gray-600">
              Select all committees you are interested in.
            </p>
            {committeesError ? (
              <p className="animate-pulse text-center font-bold text-brand-red">
                At least one committee must be selected.
              </p>
            ) : null}
            {/* displays all committee options or spinner if loading data */}
            <div
              className="
                rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-inner
              "
            >
              {displayCommittees(interests, selectedCommittees, handleCommitteesChange)}
            </div>
          </div>
          {/* submit button */}
          <div className="flex justify-center pt-12 pb-16">
            <CustomButton
              className="h-16 w-auto rounded-full px-16 text-2xl"
              text="Submit"
              onClickCallback={handleSubmit}
            />
          </div>
        </form>

        {/* Simple Snackbar Replacement */}
        {snackbar.open && (
          <div
            className="
              fixed bottom-5 left-5 z-50 flex min-w-80 items-center
              justify-between rounded-lg bg-brand-red px-6 py-3 text-white
              shadow-lg
            "
          >
            <span>{snackbar.message}</span>
            <button
              onClick={() => setSnackBar({ open: false })}
              className="ml-4 font-bold text-white"
            >
              X
            </button>
          </div>
        )}
      </div>
      {/* thank you modal displayed when form is submitted */}
      <Modal
        text="Thank you for your support! We will get in touch with you shortly."
        open={isThankYouNoteOpen}
        hide={handleModalClose}
        negativeButtonText="Ok"
      />
    </div>
  )
}
