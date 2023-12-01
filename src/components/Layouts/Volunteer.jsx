/**
 * This file implements the Volunteer page, which contains a header and a form that is
 * used to sign up for volunteering. The form asks for the user's name, contact
 * information, and committee interests. It renders both the desktop and mobile version
 * of this page based on the screen size.
 *
 * @summary Implements the Volunteer page
 * @author Dhanush Nanjunda Reddy
 */

import React, { useState, useEffect } from 'react'
import '../../css/Volunteer.css'

import { withStyles } from '@material-ui/core/styles'
import { TextField, Snackbar } from '@material-ui/core'
import { CountryDropdown } from 'react-country-region-selector'
import ResourcesHeader from '../ResourcesHeader'
import VolunteerOption from '../VolunteerOption'
import Modal from '../Modal'
import CustomButton from '../CustomButton'
// function to display asterisk for required fields

function displayAsterisk() {
  return <span className="error-asterisk">*</span>
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
      <div className="volunteer-options">
        {volunteerCommittees.map((committee) => (
          <VolunteerOption
            value={committee.id}
            checked={selectedCommittees.includes(committee.id)}
            handleChange={(e) => handleCommitteesChange(e)}
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
        handleChange={(e) => handleCommitteesChange(e)}
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
        handleChange={(e) => handleCommitteesChange(e)}
        title={volunteerCommittees[i].data.title}
        description={volunteerCommittees[i].data.description}
      />
    )
  }

  // renders committees in two columns
  return (
    <div className="volunteer-options">
      <div className="left-options-column">{volunteerOptionsLeft}</div>
      <div className="right-options-column">{volunteerOptionsRight}</div>
    </div>
  )
}

// custom style for text fields on form
const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #000000',
        borderRadius: '15px',
        fontFamily: 'Nunito',
        fontSize: '18px',
        lineHeight: '1.95vw',
        boxSizing: 'border-box',
        color: '#000000'
      },
      '&:hover fieldset': {
        borderColor: 'black'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6652a0'
      }
    },
    '& input': {
      height: '0.2vw',
      fontFamily: 'Nunito',
      fontSize: '18px',
      lineHeight: '25px',
      color: 'black',
      opacity: '1',
      '&::placeholder': {
        fontFamily: 'Nunito',
        fontSize: '18px',
        lineHeight: '25px',
        color: 'black',
        opacity: '1'
      }
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red'
    }
  }
})(TextField)

export default function Volunteer({ frontmatter, interests }) {
  // tracks window width changes
  const [isMobile, setIsMobile] = useState(false)
  const arrowScrollToRef = React.createRef()

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

  // closes snackbar
  const handleSnackClose = () => {
    setSnackBar({ open: false })
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
    if (selectedCommittees.includes(parseInt(event.target.value, 10))) {
      setSelectedCommittees(
        selectedCommittees.filter((committee) => committee !== parseInt(event.target.value, 10))
      )
    } else {
      setSelectedCommittees((oldArray) => [...oldArray, parseInt(event.target.value, 10)])
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
          message: error
        })
      })

    // allow form to be edited
    document.body.style.cursor = null
    setIsFormDisabled(false)
  }

  const inputFieldStyle = {
    border: '1px solid #000000'
  }

  const inputErrorStyle = {
    border: '1px solid #ea4444'
  }

  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <div>
      {isMobile || window.innerHeight <= 500 ? (
        <ResourcesHeader
          title={frontmatter.title}
          image={frontmatter.image}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ResourcesHeader
          title={frontmatter.title}
          text={frontmatter.description}
          image={frontmatter.image}
          height="max(75vh, 400px)"
          width="100%"
          arrowClickCallback={scrollToRef}
        />
      )}
      <div className="volunteer-content">
        <form autoComplete="off">
          <p className="required-note">
            {' '}
            <span className="error-asterisk"> * </span> indicates a required field
          </p>
          <h1 ref={arrowScrollToRef} className="signup-text">
            Sign Me Up!
          </h1>
          <div className="form-item">
            <CustomTextField
              variant="outlined"
              className="first-name input-field"
              placeholder="First Name"
              value={values.firstName.value}
              error={values.firstName.error}
              onChange={handleChange}
              disabled={isFormDisabled}
              name="firstName"
            />
            {displayAsterisk()}
          </div>
          {/* middle name field */}
          <div className="form-item">
            <CustomTextField
              variant="outlined"
              className="middle-name input-field"
              placeholder="Middle Name"
              value={values.middleName.value}
              onChange={handleChange}
              disabled={isFormDisabled}
              name="middleName"
            />
          </div>
          {/* last name field */}
          <div className="form-item last-name-field">
            <CustomTextField
              variant="outlined"
              className="input-field"
              placeholder="Last Name"
              value={values.lastName.value}
              error={values.lastName.error}
              onChange={handleChange}
              disabled={isFormDisabled}
              name="lastName"
            />
            {displayAsterisk()}
          </div>
          <h1 className="contact-info-text">Contact Information</h1>
          {/* email address field */}
          <div className="form-item">
            <CustomTextField
              variant="outlined"
              className="email-address input-field"
              placeholder="Email Address"
              type="email"
              value={values.emailAddress.value}
              error={values.emailAddress.error}
              onChange={handleChange}
              disabled={isFormDisabled}
              name="emailAddress"
            />
            {displayAsterisk()}
          </div>
          {/* country dropdown field */}
          {values.country.error ? (
            <div className="form-item">
              <CountryDropdown
                className="input-field country-dropdown"
                style={inputErrorStyle}
                value={values.country.value}
                onChange={handleCountryChange}
                disabled={isFormDisabled}
              />
              {displayAsterisk()}
            </div>
          ) : (
            <div className="form-item">
              <CountryDropdown
                className="input-field country-dropdown"
                style={inputFieldStyle}
                value={values.country.value}
                onChange={handleCountryChange}
                disabled={isFormDisabled}
              />
              {displayAsterisk()}
            </div>
          )}
          {/* displays other address fields if country is selected */}
          {values.country.value !== '' ? (
            <div>
              {/* address line 1 field */}
              <div className="form-item">
                <CustomTextField
                  variant="outlined"
                  className="address-line1 input-field"
                  placeholder="Address Line 1"
                  value={values.addressOne.value}
                  error={values.addressOne.error}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="addressOne"
                />
                {displayAsterisk()}
              </div>
              {/* address line 2 field */}
              <div className="form-item">
                <CustomTextField
                  variant="outlined"
                  className="address-line2 input-field"
                  placeholder="Address Line 2"
                  value={values.addressTwo.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="addressTwo"
                />
              </div>
              {/* city field */}
              <div className="city-field form-item">
                <CustomTextField
                  variant="outlined"
                  className="input-field"
                  placeholder="City"
                  value={values.city.value}
                  error={values.city.error}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="city"
                />
                {displayAsterisk()}
              </div>
              {/* state field */}
              <div className="form-item">
                <CustomTextField
                  variant="outlined"
                  className="state-field input-field"
                  placeholder="State"
                  value={values.stateLocation.value}
                  error={values.stateLocation.error}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="stateLocation"
                />
                {displayAsterisk()}
              </div>
              {/* zipcode field */}
              <div className="form-item">
                <CustomTextField
                  variant="outlined"
                  className="zipcode-field input-field"
                  placeholder="Zip Code"
                  value={values.zipcode.value}
                  error={values.zipcode.error}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="zipcode"
                />
                {displayAsterisk()}
              </div>
              {/* phone number field */}
              <div className="form-item">
                <CustomTextField
                  variant="outlined"
                  className="phone-number input-field"
                  placeholder="Phone Number"
                  type="tel"
                  value={values.phoneNumber.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="phoneNumber"
                />
              </div>
            </div>
          ) : null}
          <h1 className="help-section-title">What would you like to help with?</h1>
          <p className="select-committees-text">Select all committees you are interested in.</p>
          {committeesError ? (
            <p className="committees-error-text">At least one committee must be selected.</p>
          ) : null}
          {/* displays all committee options or spinner if loading data */}
          {displayCommittees(isMobile, interests, selectedCommittees, handleCommitteesChange)}
          {/* submit button */}
          <div className="submit-form">
            <CustomButton text="Submit" onClickCallback={handleSubmit} />
          </div>
        </form>
      </div>
      {/* thank you modal displayed when form is submitted */}
      <Modal
        text="Thank you for your support! We will get in touch with you shortly."
        open={isThankYouNoteOpen}
        hide={handleModalClose}
        negativeButtonText="Ok"
      />
      {/* snackbar to display error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackbar.message}
      />
    </div>
  )
}
