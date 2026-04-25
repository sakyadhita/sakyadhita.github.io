import React, { useState, useEffect } from 'react'
import { CountryDropdown } from 'react-country-region-selector'

import { cn } from '../../lib/utils'
import CustomButton from '../CustomButtonReact'
import Modal from '../Modal'
import VolunteerOption from '../VolunteerOption'

function displayCommittees(
  volunteerCommittees: any[],
  selectedCommittees: number[],
  handleCommitteesChange: (e: { target: { value: number; checked: boolean } }) => void
) {
  return (
    <div className="mt-8 space-y-6">
      {volunteerCommittees.map((committee) => (
        <VolunteerOption
          key={committee.id}
          value={Number.parseInt(committee.id)}
          checked={selectedCommittees.includes(Number.parseInt(committee.id))}
          handleChange={handleCommitteesChange}
          title={committee.data.title}
          description={committee.data.description}
        />
      ))}
    </div>
  )
}

// function to display asterisk for required fields
function displayAsterisk() {
  return (
    <span
      className="
    error-asterisk ml-2 shrink-0 text-xl font-bold text-brand-red
  "
    >
      *
    </span>
  )
}

interface CommitteeData {
  id: string
  data: {
    title: string
    description: string
  }
}

interface VolunteerProps {
  interests: CommitteeData[]
}

export default function Volunteer({ interests }: VolunteerProps) {
  // tracks whether thank you modal should be open
  const [isThankYouNoteOpen, setIsThankYouNoteOpen] = React.useState(false)
  // tracks whether the form is disabled
  const [isFormDisabled, setIsFormDisabled] = useState(false)
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
    address: {
      value: '',
      error: false
    }
  })

  // stores IDs of all committees selected
  const [selectedCommittees, setSelectedCommittees] = useState<number[]>([])

  // snackbar used to display error messages
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: ''
  })

  // handles user input to any form field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: {
        ...(values as any)[name],
        value: value
      }
    })
  }

  // handles user input to country field
  const handleCountryChange = (val: string) => {
    setValues({
      ...values,
      country: {
        value: val,
        error: false
      }
    })
  }

  // called when user decides to close thank you modal
  const handleModalClose = (event: boolean) => {
    setIsThankYouNoteOpen(event)
  }

  // handles change in any of the committee checkboxes
  function handleCommitteesChange(event: { target: { value: number; checked: boolean } }) {
    const val = event.target.value
    if (selectedCommittees.includes(val)) {
      setSelectedCommittees(selectedCommittees.filter((item) => item !== val))
    } else {
      setSelectedCommittees((oldArray) => [...oldArray, val])
    }
  }

  // called when form is submitted
  const handleFormCompleted = () => {
    // display thank you modal
    setIsThankYouNoteOpen(true)

    // clear form values
    setValues({
      ...values,
      firstName: { ...values.firstName, value: '', error: false },
      middleName: { ...values.middleName, value: '', error: false },
      lastName: { ...values.lastName, value: '', error: false },
      phoneNumber: { ...values.phoneNumber, value: '', error: false },
      emailAddress: { ...values.emailAddress, value: '', error: false },
      country: { ...values.country, value: '', error: false },
      address: { ...values.address, value: '', error: false }
    })

    // clear committee selections
    setSelectedCommittees([])
  }

  const encode = (data: any) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

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

    if (values.firstName.value === '') firstName = true
    if (values.lastName.value === '') lastName = true
    if (values.emailAddress.value === '') email = true
    if (values.country.value === '') country = true
    if (values.address.value === '') address = true

    // sets error values for all fields
    setValues({
      ...values,
      firstName: { ...values.firstName, error: firstName },
      lastName: { ...values.lastName, error: lastName },
      emailAddress: { ...values.emailAddress, error: email },
      country: { ...values.country, error: country },
      address: { ...values.address, error: address }
    })

    // checks if any required fields are empty
    if (firstName || lastName || email || country || address) {
      setSnackBar({ open: true, message: 'Missing required fields' })
      setIsFormDisabled(false)
      document.body.style.cursor = ''
      return
    }

    const selectedCommitteesText = selectedCommittees
      .map((id) => interests.find((i) => Number.parseInt(i.id) === id)?.data.title)
      .join(', ')

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
        address: values.address.value,
        interests: selectedCommitteesText
      })
    })
      // message sent
      .then(() => {
        // display thank you modal and clear form
        handleFormCompleted()
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
    document.body.style.cursor = ''
    setIsFormDisabled(false)
  }

  const inputClasses = (hasError: boolean) =>
    cn(
      `
        input-field h-12 w-full rounded-2xl border-black bg-white px-4
        font-body text-lg transition-all outline-none
        focus:ring-2 focus:ring-brand-dark-purple
      `,
      hasError && 'border-brand-red ring-2 ring-brand-red'
    )

  return (
    <div className="font-body">
      <div
        className="
          mx-auto max-w-7xl space-y-12 px-6 py-12 text-black
          md:px-12
        "
      >
        <div className="space-y-6">
          <h1 className="font-heading text-4xl text-brand-dark-purple lowercase">
            Support Sakyadhita!
          </h1>
          <p className="text-lg/relaxed text-gray-700">
            Sakyadhita is a 501(c)3 non-profit organization. We are a volunteer-run organization
            and rely on the generous support of our members and donors. We are always looking for
            volunteers to help us with our various initiatives. If you are interested in
            volunteering with us, please fill out the form below and select the committees you are
            interested in joining.
          </p>
        </div>

        <form autoComplete="off" className="mx-auto max-w-2xl space-y-4">
          <section className="space-y-4">
            <h1
              className="
                mt-12 mb-8 w-fit border-b-2 border-brand-orange pb-1
                font-heading text-3xl text-brand-dark-purple lowercase italic
              "
            >
              Sign Me Up!
            </h1>
            {/* first name field */}
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  name="firstName"
                  className={inputClasses(values.firstName.error)}
                  placeholder="First Name"
                  value={values.firstName.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  required
                />
              </div>
              {displayAsterisk()}
            </div>
            {/* middle name field */}
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  name="middleName"
                  className={inputClasses(values.middleName.error)}
                  placeholder="Middle Name"
                  value={values.middleName.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                />
              </div>
              <span className="ml-2 w-4 shrink-0" />
            </div>
            {/* last name field */}
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  name="lastName"
                  className={inputClasses(values.lastName.error)}
                  placeholder="Last Name"
                  value={values.lastName.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  required
                />
              </div>
              {displayAsterisk()}
            </div>
          </section>

          <section className="space-y-4">
            <h1
              className="
                mt-16 mb-8 w-fit border-b-2 border-brand-orange pb-1
                font-heading text-3xl text-brand-dark-purple lowercase italic
              "
            >
              Contact Information
            </h1>
            {/* email address field */}
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  name="emailAddress"
                  className={inputClasses(values.emailAddress.error)}
                  placeholder="Email Address"
                  value={values.emailAddress.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  type="email"
                  required
                />
              </div>
              {displayAsterisk()}
            </div>
            {/* country dropdown field */}
            <div className="flex items-center">
              <div className="flex-1">
                <CountryDropdown
                  className="
                    input-field h-12 w-full rounded-2xl border-black bg-white
                    px-4 font-body text-lg transition-all outline-none
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
            {/* address field */}
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  name="address"
                  className={inputClasses(values.address.error)}
                  placeholder="Full Address"
                  value={values.address.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  required
                />
              </div>
              {displayAsterisk()}
            </div>
            {/* phone number field */}
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  name="phoneNumber"
                  className={inputClasses(values.phoneNumber.error)}
                  placeholder="Phone Number"
                  value={values.phoneNumber.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                />
              </div>
              <span className="ml-2 w-4 shrink-0" />
            </div>
          </section>

          <section className="space-y-4">
            <h1
              className="
                mt-16 mb-8 w-fit border-b-2 border-brand-orange pb-1
                font-heading text-3xl text-brand-dark-purple lowercase italic
              "
            >
              Committee Interests
            </h1>
            <p className="text-lg/relaxed text-gray-700 italic">
              Select any and all committees you are interested in joining:
            </p>
            {displayCommittees(interests, selectedCommittees, handleCommitteesChange)}
          </section>

          <div className="space-y-10 pt-16">
            <p className="text-center font-body text-lg text-gray-500 italic">
              <span className="font-bold text-brand-red"> * </span> indicates a required field
            </p>
            {/* submit button */}
            <div className="flex justify-center pb-12">
              <CustomButton
                className="h-16 w-auto rounded-full px-16 text-2xl"
                text="Submit"
                onClickCallback={handleSubmit}
              />
            </div>
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
              onClick={() => setSnackBar({ open: false, message: '' })}
              className="ml-4 font-bold text-white"
            >
              X
            </button>
          </div>
        )}
      </div>
      {/* thank you modal displayed when form is submitted */}
      <Modal
        text="Thank you for your interest! We will get in touch with you shortly."
        open={isThankYouNoteOpen}
        hide={handleModalClose}
        negativeButtonText="Ok"
      />
    </div>
  )
}
