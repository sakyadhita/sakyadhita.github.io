import React, { useState, useEffect } from 'react'

import { Input } from '../ui/input'
import { CountryDropdown } from 'react-country-region-selector'
import VolunteerOption from '../VolunteerOption'
import Modal from '../Modal'
import CustomButton from '../CustomButtonReact'
import { cn } from '../../lib/utils'

// function to display asterisk for required fields
function displayAsterisk() {
  return (
    <span className="error-asterisk text-brand-red ml-2 font-bold text-xl flex-shrink-0">*</span>
  )
}

// funcion to render all volunteer committees
function displayCommittees(
  isMobile,
  volunteerCommittees,
  selectedCommittees,
  handleCommitteesChange
) {
  const mid = Math.floor(volunteerCommittees.length / 2)

  if (isMobile) {
    // renders a single column if device is mobile
    return (
      <div className="volunteer-options flex flex-col space-y-4">
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

  const volunteerOptionsLeft = []
  const volunteerOptionsRight = []

  // separates committees into two lists to display in two columns
  for (let ind = 0; ind <= mid; ind++) {
    volunteerOptionsLeft.push(
      <VolunteerOption
        key={volunteerCommittees[ind].id}
        value={volunteerCommittees[ind].id}
        checked={selectedCommittees.includes(volunteerCommittees[ind].id)}
        handleChange={handleCommitteesChange}
        title={volunteerCommittees[ind].data.title}
        description={volunteerCommittees[ind].data.description}
      />
    )
  }

  for (let i = mid + 1; i < volunteerCommittees.length; i++) {
    volunteerOptionsRight.push(
      <VolunteerOption
        key={volunteerCommittees[i].id}
        value={volunteerCommittees[i].id}
        checked={selectedCommittees.includes(volunteerCommittees[i].id)}
        handleChange={handleCommitteesChange}
        title={volunteerCommittees[i].data.title}
        description={volunteerCommittees[i].data.description}
      />
    )
  }

  // renders committees in two columns
  return (
    <div className="volunteer-options grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="left-options-column flex flex-col space-y-6">{volunteerOptionsLeft}</div>
      <div className="right-options-column flex flex-col space-y-6">{volunteerOptionsRight}</div>
    </div>
  )
}

export default function Volunteer({ frontmatter, interests }) {
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
  const [isMobile, setIsMobile] = useState(false)

  // snackbar used to display error messages
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: ''
  })

  // modifies isMobile state when window resizes
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600)
    }

    // event listener for resize
    window.addEventListener('resize', handleResize)
    handleResize()

    // Removes event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    const val = parseInt(event.target.value, 10)
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
    const addressOpt = values.addressTwo.value !== '' ? `${values.addressTwo.value} ` : ''
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
      'h-12 border-black rounded-2xl focus-visible:ring-brand-dark-purple focus-visible:border-brand-dark-purple px-4 text-lg font-body bg-white w-full',
      hasError && 'border-brand-red'
    )

  return (
    <div className="font-body">
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto space-y-12 text-black">
        <form autoComplete="off" className="space-y-4 max-w-2xl mx-auto">
          <p className="text-right text-sm text-gray-500 font-body italic mb-10 text-black">
            {' '}
            <span className="error-asterisk text-brand-red font-bold"> * </span> indicates a
            required field
          </p>
          <h1 className="text-3xl font-heading text-brand-dark-purple border-b-2 border-brand-orange w-fit pb-1 lowercase italic mb-8 mt-12">
            Sign Me Up!
          </h1>
          {/* first name field */}
          <div className="flex items-center !mt-1">
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
          <div className="flex items-center !mt-1">
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
            <span className="ml-2 w-4 flex-shrink-0"></span>
          </div>
          {/* last name field */}
          <div className="flex items-center !mt-1">
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

          <h1 className="text-3xl font-heading text-brand-dark-purple border-b-2 border-brand-orange w-fit pb-1 lowercase italic mt-16 mb-8">
            Contact Information
          </h1>
          {/* email address field */}
          <div className="flex items-center !mt-1">
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
          <div className="flex items-center !mt-1">
            <div className="flex-1">
              <CountryDropdown
                className="input-field country-dropdown h-12 border-black rounded-2xl px-4 text-lg font-body w-full bg-white transition-all focus:ring-2 focus:ring-brand-dark-purple outline-none"
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
          {values.country.value !== '' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 pt-4">
              {/* address line 1 field */}
              <div className="flex items-center !mt-1">
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
              <div className="flex items-center !mt-1">
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
                <span className="ml-2 w-4 flex-shrink-0"></span>
              </div>
              {/* city field */}
              <div className="flex items-center !mt-1">
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
              <div className="flex items-center !mt-1">
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
              <div className="flex items-center !mt-1">
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
              <div className="flex items-center !mt-1">
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
                <span className="ml-2 w-4 flex-shrink-0"></span>
              </div>
            </div>
          ) : null}

          <div className="space-y-6 pt-10">
            <h1 className="text-3xl font-heading text-brand-dark-purple text-center lowercase italic">
              What would you like to help with?
            </h1>
            <p className="text-center text-lg text-gray-600 font-body">
              Select all committees you are interested in.
            </p>
            {committeesError ? (
              <p className="text-center text-brand-red font-bold animate-pulse">
                At least one committee must be selected.
              </p>
            ) : null}
            {/* displays all committee options or spinner if loading data */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner">
              {displayCommittees(isMobile, interests, selectedCommittees, handleCommitteesChange)}
            </div>
          </div>
          {/* submit button */}
          <div className="flex justify-center pt-12 pb-16">
            <CustomButton
              className="w-auto px-16 h-16 text-2xl rounded-full"
              text="Submit"
              onClickCallback={handleSubmit}
            />
          </div>
        </form>

        {/* Simple Snackbar Replacement */}
        {snackbar.open && (
          <div className="fixed bottom-5 left-5 bg-brand-red text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between min-w-[300px]">
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
