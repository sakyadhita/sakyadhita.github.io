/**
 * This file implements the Join Us page, which contains a header and a form that is
 * used to sign up for the email list, membership, or both. The form asks for the
 * user's name, contact information, and the type of membership they want. The payment
 * is handled by the Paypal component and the form data is stored in the database.
 *
 * @summary Implements the Join Us page
 * @author Dhanush Nanjunda Reddy
 */

import React, { useState, useEffect } from 'react'
import '../../css/JoinUs.css'
import { withStyles } from '@material-ui/core/styles'

import { Checkbox, MenuItem, TextField, InputAdornment, Snackbar } from '@material-ui/core'
import { CountryDropdown } from 'react-country-region-selector'
import ResourcesHeader from '../ResourcesHeader'

import CustomButton from '../CustomButton'
import PayPalModal from '../PayPalModal'
import Modal from '../Modal'

// function to display asterisk for required fields
function displayAsterisk() {
  return <span className="error-asterisk">*</span>
}

const CustomSelectField = withStyles({
  root: {
    '& .MuiOutlinedInput-input': {
      color: '#000000'
    },
    '& .MuiInputLabel-root': {
      color: 'black',
      fontFamily: 'Nunito',
      fontSize: '18px',
      lineHeight: '25px',
      opacity: '1'
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
      border: '1px solid #000000',
      borderRadius: '15px',
      fontFamily: 'Nunito',
      fontSize: '18px',
      lineHeight: '1.95vw',
      boxSizing: 'border-box',
      color: '#000000'
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'black'
    },
    '&:hover .MuiInputLabel-root': {
      color: 'black'
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'black'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'black'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6652a0'
    }
  }
})(TextField)

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

export default function JoinUs({ frontmatter, image, memberships }) {
  // tracks window width changes
  const [isMobile, setIsMobile] = useState(false)
  const arrowScrollToRef = React.createRef()

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
  const [selectedMembershipIndex, setSelectedMembershipIndex] = useState(-1)
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
      memberType === '' ||
      organizations === '' ||
      selectedMembershipIndex === -1 ||
      (donateCheck && donation === 0)
    ) {
      setDisplayPayPal(false)
    } else {
      setDisplayPayPal(true)
    }
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

  // handle user input to new member field
  const handleNewMember = (event) => {
    setIsNewMember(event.target.value)
    if (event.target.value === 'new') {
      setMemberType(true)
    } else {
      setMemberType(false)
    }
  }

  // closes snackbar
  const handleSnackClose = () => {
    setSnackBar({ open: false })
  }

  // handles change in membership checkbox
  const handleMembershipChange = (event) => {
    setMembershipCheck(event.target.checked)
  }

  // handles change in donation checkbox
  const handleDonateChange = (event) => {
    if (donateCheck) setDonation('')
    setDonateCheck(event.target.checked)
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
    setSelectedMembershipIndex(-1)
    setMemberType(false)
    setIsNewMember('')
    setMembershipCheck(false)
    setDonateCheck(false)
  }

  // called when submit button is clicked
  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
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
    const addressOpt = values.addressTwo.value !== '' ? `${values.addressTwo.value} ` : ''
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
          message: error
        })
      })
    // // call backend route to store member data
    // await fetch(`${BACKEND_URL}emailList/`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //         fName: values.firstName.value,
    //         mName: values.middleName.value,
    //         lName: values.lastName.value,
    //         phone: values.phoneNumber.value,
    //         email: values.emailAddress.value,
    //         address: givenAddress,
    //     }),
    // }).then((res) => {
    //     // form submitted
    //     if (res.ok) {
    //         // display thank you modal and clear form
    //         handleFormCompleted();
    //     } else {
    //         // show snackbar to notify form could not be submitted
    //         setSnackBar({
    //             open: true,
    //             message: "An internal error occurred. Form not submitted.",
    //         });
    //     }
    // });

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

  // style for checkboxes
  const CustomColorCheckbox = withStyles({
    root: {
      color: '#000000',
      paddingLeft: 0,
      '&$checked': {
        color: '#EA8644'
      }
    },
    checked: {}
  })((props) => <Checkbox color="default" {...props} />)

  return (
    <div>
      {isMobile || window.innerHeight <= 500 ? (
        <ResourcesHeader
          title={frontmatter.title}
          image={image}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ResourcesHeader
          title={frontmatter.title}
          text={frontmatter.description}
          image={image}
          height="max(75vh, 400px)"
          width="100%"
          arrowClickCallback={scrollToRef}
        />
      )}

      <div className="main-content">
        {/* displays info based on if device is mobile or not */}
        {isMobile ? (
          <div>
            <h1 ref={arrowScrollToRef} className="thank-you">
              Thank you for your interest in Sakyadhita!
            </h1>
            <p className="page-info">
              By filling out this form, you will be added to the email list and be asked to pay a
              membership fee. Once all required fields are filled out, you may proceed to payment
              through PayPal.
            </p>
            {/* checkbox to only join email list */}
            <div className="membership-check">
              <CustomColorCheckbox checked={membershipCheck} onChange={handleMembershipChange} />
              <span className="checkbox-text">Want to join email list only.</span>
            </div>
          </div>
        ) : (
          <div>
            <h1 ref={arrowScrollToRef} className="thank-you">
              Thank you for your interest!
            </h1>
            <p className="page-info">
              By filling out this form, you will be added to the email list. If you wish to also
              have a membership with Sakyadhita, you will be asked to pay a membership fee through
              PayPal once all required fields are filled out. If you wish to only be on the email
              list, please check the “Not interested in membership” box below.
            </p>
            {/* checkbox to only join email list */}
            <div className="membership-check">
              <CustomColorCheckbox checked={membershipCheck} onChange={handleMembershipChange} />
              <span className="checkbox-text">
                Not interested in membership, but want to be on the email list.
              </span>
            </div>
          </div>
        )}
        <form autoComplete="off">
          <h1 className="signup-text">Sign Me Up!</h1>
          {/* first name field */}
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
              className="last-name input-field"
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
              value={values.emailAddress.value}
              error={values.emailAddress.error}
              onChange={handleChange}
              disabled={isFormDisabled}
              name="emailAddress"
            />
            {displayAsterisk()}
          </div>
          {/* country dropdown field */}
          <div className="form-item">
            <CountryDropdown
              className="input-field country-dropdown"
              style={values.country.error ? inputErrorStyle : inputFieldStyle}
              value={values.country.value}
              onChange={handleCountryChange}
              disabled={isFormDisabled}
            />
            {displayAsterisk()}
          </div>
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
                  className="city-field input-field"
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
                  value={values.phoneNumber.value}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  name="phoneNumber"
                />
              </div>
            </div>
          ) : null}
          {/* displays rest of the form if email list only isn't selected */}
          {!membershipCheck ? (
            <div>
              <h1 className="additional-info-text">Additional Information</h1>
              {/* new member dropdown */}
              <div className="form-item">
                <CustomSelectField
                  className="input-field"
                  value={isNewMember}
                  onChange={handleNewMember}
                  variant="outlined"
                  label="New or Renewing Member?"
                  select
                  size="small"
                  InputLabelProps={isMobile ? { style: { fontSize: 14 } } : null}
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="renew">Renewing</MenuItem>
                </CustomSelectField>
                {displayAsterisk()}
              </div>
              {/* past organizations field */}
              <div className="form-item organizations-section">
                <CustomTextField
                  variant="outlined"
                  className="organizations-worked input-field"
                  placeholder="List any organizations you’re involved with"
                  required
                  value={organizations}
                  onChange={(e) => setOrganizations(e.target.value)}
                  multiline
                  rows={3}
                />
                {displayAsterisk()}
              </div>
              <h1 className="payment-text">Payment Options</h1>
              <div className="form-item">
                <CustomSelectField
                  className="input-field"
                  value={selectedMembershipIndex}
                  onChange={(e) => {
                    setSelectedMembershipIndex(e.target.value)
                  }}
                  variant="outlined"
                  label="Select Membership"
                  select
                  size="small"
                >
                  {memberships.map((membershipItem, index) => (
                    <MenuItem value={index} key={index}>
                      {membershipItem.title} ${membershipItem.cost} USD
                    </MenuItem>
                  ))}
                </CustomSelectField>
                {displayAsterisk()}
              </div>
              {/* checkbox to add a donation */}
              <div className="donate-check">
                <CustomColorCheckbox
                  className="donate-checkbox"
                  checked={donateCheck}
                  onChange={handleDonateChange}
                />
                <span className="checkbox-text donation-text">
                  I would like to donate in addition to membership fees
                </span>
              </div>
              {/* displays donation field if donate checkbox is checked */}
              {donateCheck ? (
                <div className="donation-num form-item">
                  <CustomTextField
                    variant="outlined"
                    className="donation-amount input-field"
                    placeholder="Insert Donation Amount"
                    required
                    value={donation}
                    onChange={(e) => setDonation(parseFloat(e.target.value))}
                    type="number"
                    step={0.01}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                  {displayAsterisk()}
                </div>
              ) : null}
              {/* displays paypal modal if continue button is clicked */}
              {displayPayPalModal ? (
                <PayPalModal
                  key={displayPayPal}
                  fName={values.firstName.value}
                  mName={values.middleName.value}
                  lName={values.lastName.value}
                  email={values.emailAddress.value}
                  phoneNumber={values.phoneNumber.value}
                  membershipTitle={memberships[selectedMembershipIndex].title}
                  membershipID={memberships[selectedMembershipIndex].id}
                  membershipCost={parseFloat(memberships[selectedMembershipIndex].cost)}
                  donationAmount={donation}
                  isNewMember={memberType}
                  affiliatedOrgs={organizations}
                  toggleModal={openPaypalModal}
                  address={`${values.addressOne.value} ${values.addressTwo.value} ${values.city.value} ${values.stateLocation.value} ${values.country.value} ${values.zipcode.value}`}
                  transactionCompleted={handleFormCompleted}
                />
              ) : null}
              <div className="paypal-buttons">
                {/* displays continue to payment button if all fields are filled */}
                {!displayPayPal ? (
                  <p className="error-message">
                    *Please fill out all required fields to proceed to payment.
                  </p>
                ) : (
                  <div className="continue-button">
                    <CustomButton
                      style={{ width: 'fit-content' }}
                      text="Continue to Payment"
                      onClickCallback={openPaypalModal}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p style={{ textAlign: 'center', marginTop: '50px' }}>
                {' '}
                <span className="error-asterisk"> * </span> indicates a required field
              </p>
              {/* submit button for email list only form */}
              <div className="submit-button">
                <CustomButton text="Submit" onClickCallback={handleSubmit} />
              </div>
            </div>
          )}
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
