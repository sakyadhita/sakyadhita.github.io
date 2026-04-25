import React, { useState, useEffect } from 'react'
import { CountryDropdown } from 'react-country-region-selector'

import { cn } from '../../lib/utils'
import CustomButton from '../CustomButtonReact'
import Modal from '../Modal'
import PayPalModal from '../PayPalModal'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

// function to display asterisk for required fields
function displayAsterisk() {
  return <span className="error-asterisk ml-2 shrink-0 text-xl font-bold text-brand-red">*</span>
}

interface MembershipItem {
  id: string
  title: string
  cost: string
}

interface JoinUsProps {
  frontmatter: any
  memberships: MembershipItem[]
}

export default function JoinUs({ frontmatter: _frontmatter, memberships }: JoinUsProps) {
  const [membershipCheck, setMembershipCheck] = useState(false)
  // tracks whether donation field should be displayed
  const [donateCheck, setDonateCheck] = useState(false)
  // tracks whether the form is disabled
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  // tracks whether thank you modal should be open
  const [isThankYouNoteOpen, setIsThankYouNoteOpen] = React.useState(false)

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

  // stores value of organizations field
  const [organizations, setOrganizations] = useState('')
  // stores donation amount entered
  const [donation, setDonation] = useState(0)
  // stores cost of memebership selected
  const [selectedMembershipIndex, setSelectedMembershipIndex] = useState(0)
  // stores whether user is a new member
  const [memberType, setMemberType] = useState(false)
  // stores options to display in new member field
  const [isNewMember, setIsNewMember] = useState('')
  // tracks whether continue to payment button is displayed
  const [displayPayPal, setDisplayPayPal] = useState(false)
  // tracks whether paypal modal should be displayed
  const [displayPayPalModal, setDisplayPayPalModal] = useState(false)

  // snackbar used to display error messages
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: ''
  })

  // paypal buttons are rendered if all fields are filled
  useEffect(() => {
    if (
      values.firstName.value === '' ||
      values.lastName.value === '' ||
      values.emailAddress.value === '' ||
      values.country.value === '' ||
      values.addressOne.value === '' ||
      values.city.value === '' ||
      values.stateLocation.value === '' ||
      values.zipcode.value === '' ||
      (!membershipCheck &&
        (memberType === '' || organizations === '' || selectedMembershipIndex === 0)) ||
      (donateCheck && donation === 0)
    ) {
      setDisplayPayPal(false)
    } else {
      setDisplayPayPal(true)
    }
  }, [
    values,
    membershipCheck,
    memberType,
    organizations,
    selectedMembershipIndex,
    donateCheck,
    donation
  ])

  // handles user input to any form field
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: {
        value: event.target.value
      }
    })
  }

  // handle user input to new member field
  const handleNewMember = (val) => {
    setIsNewMember(val)
    if (val === 'new') {
      setMemberType(true)
    } else {
      setMemberType(false)
    }
  }

  // handles change in membership checkbox
  const handleMembershipChange = (checked) => {
    setMembershipCheck(checked)
  }

  // handles change in donation checkbox
  const handleDonateChange = (checked) => {
    if (donateCheck) setDonation('')
    setDonateCheck(checked)
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

  // handles opening/closing paypal modal
  const openPaypalModal = () => {
    setDisplayPayPalModal(!displayPayPalModal)
  }

  // called when user decides to close thank you modal
  const handleModalClose = (event) => {
    setIsThankYouNoteOpen(event)
  }

  // called when form/payment is submitted
  const handleFormCompleted = () => {
    // closes paypal modal
    setDisplayPayPalModal(false)

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

    // clear all other values
    setOrganizations('')
    setDonation(0)
    setSelectedMembershipIndex(0)
    setMemberType(false)
    setIsNewMember('')
    setMembershipCheck(false)
    setDonateCheck(false)
  }

  const encode = (data) => {
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

    // checks if any required fields are empty
    if (firstName || lastName || email || country || address || city || state || zipcode) {
      setSnackBar({ open: true, message: 'Missing required fields' })
      setIsFormDisabled(false)
      document.body.style.cursor = null
      return
    }

    // defines address to pass to backend
    const addressOpt = values.addressTwo.value === '' ? '' : `${values.addressTwo.value} `
    const givenAddress = `${values.addressOne.value} ${addressOpt}${values.city.value} ${values.stateLocation.value} ${values.country.value} ${values.zipcode.value}`

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'membership',
        fName: values.firstName.value,
        mName: values.middleName.value,
        lName: values.lastName.value,
        phone: values.phoneNumber.value,
        email: values.emailAddress.value,
        address: givenAddress
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

  const selectTriggerClasses =
    'h-12 border-black rounded-2xl focus:ring-brand-dark-purple px-4 text-lg font-body w-full bg-white flex items-center'

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
            Thank you for your interest!
          </h1>
          <p className="text-lg/relaxed text-gray-700">
            By filling out this form, you will be added to the email list. If you wish to also have
            a membership with Sakyadhita, you will be asked to pay a membership fee through PayPal
            once all required fields are filled out. If you wish to only be on the email list,
            please check the “Not interested in membership” box below.
          </p>
          {/* checkbox to only join email list */}
          <div
            className="
              flex items-center space-x-3 rounded-lg border
              border-brand-orange/20 bg-brand-orange/10 p-4
            "
          >
            <Checkbox
              id="membershipCheck"
              checked={membershipCheck}
              onCheckedChange={handleMembershipChange}
              className="
                border-black
                data-checked:bg-brand-orange
              "
            />
            <Label
              htmlFor="membershipCheck"
              className="cursor-pointer text-lg font-bold text-black"
            >
              Not interested in membership, but want to be on the email list.
            </Label>
          </div>
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
            <div className="flex items-center">
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
            <div className="flex items-center">
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
                <Input
                  className={inputClasses(values.emailAddress.error)}
                  placeholder="Email Address"
                  value={values.emailAddress.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="emailAddress"
                  type="email"
                />
              </div>
              {displayAsterisk()}
            </div>
            {/* country dropdown field */}
            <div className="flex items-center">
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
                  fade-in slide-in-from-top-4 animate-in space-y-4 pt-2
                  duration-500
                "
              >
                {/* address line 1 field */}
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
                  <div className="flex-1">
                    <Input
                      className={inputClasses(values.phoneNumber.error)}
                      placeholder="Phone Number"
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
          </section>

          {/* displays rest of the form if email list only isn't selected */}
          {membershipCheck ? (
            <div className="space-y-10 pt-16">
              <p className="text-center font-body text-lg text-gray-500 italic">
                <span className="font-bold text-brand-red"> * </span> indicates a required field
              </p>
              {/* submit button for email list only form */}
              <div className="flex justify-center pb-12">
                <CustomButton
                  className="h-16 w-auto rounded-full px-16 text-2xl"
                  text="Submit"
                  onClickCallback={handleSubmit}
                />
              </div>
            </div>
          ) : (
            <div className="fade-in animate-in space-y-8 pt-8 duration-500">
              <section className="space-y-4">
                <h1
                  className="
                    mt-12 mb-8 w-fit border-b-2 border-brand-orange pb-1
                    font-heading text-3xl text-brand-dark-purple lowercase
                    italic
                  "
                >
                  Additional Information
                </h1>
                {/* new member dropdown */}
                <div className="flex items-center">
                  <div className="flex-1">
                    <Select value={isNewMember} onValueChange={handleNewMember}>
                      <SelectTrigger className={selectTriggerClasses}>
                        <SelectValue placeholder="New or Renewing Member?" />
                      </SelectTrigger>
                      <SelectContent className="bg-white font-body text-black">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="renew">Renewing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {displayAsterisk()}
                </div>
                {/* past organizations field */}
                <div className="flex items-start">
                  <div className="flex-1">
                    <Textarea
                      className={cn(inputClasses(false), 'h-32 resize-none py-2')}
                      placeholder="List any organizations you’re involved with"
                      required
                      value={organizations}
                      onChange={(e) => setOrganizations(e.target.value)}
                      rows={3}
                    />
                  </div>
                  {displayAsterisk()}
                </div>
              </section>

              <section className="space-y-4">
                <h1
                  className="
                    mt-16 mb-8 w-fit border-b-2 border-brand-orange pb-1
                    font-heading text-3xl text-brand-dark-purple lowercase
                    italic
                  "
                >
                  Payment Options
                </h1>
                <div className="flex items-center">
                  <div className="flex-1">
                    <Select
                      value={selectedMembershipIndex.toString()}
                      onValueChange={(val) => setSelectedMembershipIndex(Number.parseInt(val))}
                    >
                      <SelectTrigger className={selectTriggerClasses}>
                        <SelectValue placeholder="Select Membership" />
                      </SelectTrigger>
                      <SelectContent className="bg-white font-body text-black">
                        {memberships.map((membershipItem, index) => (
                          <SelectItem value={index.toString()} key={index}>
                            {membershipItem.title} ${membershipItem.cost} USD
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {displayAsterisk()}
                </div>
                {/* checkbox to add a donation */}
                <div
                  className="
                    mt-8! flex items-center space-x-3 rounded-xl border
                    border-brand-orange/10 bg-brand-orange/5 p-5
                  "
                >
                  <Checkbox
                    id="donateCheck"
                    checked={donateCheck}
                    onCheckedChange={handleDonateChange}
                    className="
                      border-black
                      data-checked:bg-brand-orange
                    "
                  />
                  <Label
                    htmlFor="donateCheck"
                    className="
                      cursor-pointer text-lg/tight font-bold text-black
                    "
                  >
                    I would like to donate in addition to membership fees
                  </Label>
                </div>

                {/* displays donation field if donate checkbox is checked */}
                {donateCheck ? (
                  <div className="relative mt-4! flex items-center">
                    <div className="relative w-full">
                      <span
                        className="
                          absolute top-1/2 left-4 z-10 -translate-y-1/2 text-lg
                          font-bold text-black
                        "
                      >
                        $
                      </span>
                      <Input
                        className={cn(inputClasses(false), 'pl-10')}
                        placeholder="Insert Donation Amount"
                        required
                        value={donation}
                        onChange={(e) => setDonation(Number.parseFloat(e.target.value))}
                        type="number"
                        step={0.01}
                      />
                    </div>
                    {displayAsterisk()}
                  </div>
                ) : null}
              </section>

              {/* displays paypal modal if continue button is clicked */}
              {displayPayPalModal ? (
                <PayPalModal
                  // key={displayPayPal}
                  fName={values.firstName.value}
                  mName={values.middleName.value}
                  lName={values.lastName.value}
                  email={values.emailAddress.value}
                  phoneNumber={values.phoneNumber.value}
                  membershipTitle={memberships[selectedMembershipIndex].title}
                  membershipID={memberships[selectedMembershipIndex].id}
                  membershipCost={Number.parseFloat(memberships[selectedMembershipIndex].cost)}
                  donationAmount={donation}
                  isNewMember={memberType}
                  affiliatedOrgs={organizations}
                  toggleModal={openPaypalModal}
                  address={`${values.addressOne.value} ${values.addressTwo.value} ${values.city.value} ${values.stateLocation.value} ${values.country.value} ${values.zipcode.value}`}
                  transactionCompleted={handleFormCompleted}
                />
              ) : null}
              <div className="flex flex-col items-center space-y-6 pt-12">
                {/* displays continue to payment button if all fields are filled */}
                {displayPayPal ? (
                  <div className="continue-button text-center">
                    <CustomButton
                      className="h-16 w-auto rounded-full px-16 text-2xl"
                      text="Continue to Payment"
                      onClickCallback={openPaypalModal}
                    />
                  </div>
                ) : (
                  <div
                    className="
                      rounded-lg border border-brand-red/20 bg-brand-red/5 p-4
                      text-center
                    "
                  >
                    <p className="animate-pulse text-lg font-bold text-brand-red">
                      *Please fill out all required fields to proceed to payment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
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
