/**
 * The contact us page on the website.It displays contact information, including email,
 * phone number, and address (on click opens up google maps). It also includes a small form
 * to allow any user to send messages to Sakyadhita. Sent messages are done using a fetch request
 * to the backend server, which will trigger email automation to Sakyadhita with the given form
 * information provided by the user.
 *
 * @summary     Displays Contact Us Page.
 * @author      Amrit Kaur Singh
 */
import React, { useEffect } from 'react'
import { GoMail } from 'react-icons/go'
import { FaPhoneAlt } from 'react-icons/fa'
import { BsHouseFill } from 'react-icons/bs'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import ImageHeader from '../Contact/ImageHeader'
import ResourcesHeader from '../ResourcesHeader'
import Modal from '../Modal'
import CustomButton from '../CustomButton'
import { cn } from '../../lib/utils'
import '../../css/ContactUs.css'

const MAX_MOBILE_WIDTH = 1050

export default function ContactUs({ frontmatter, children }) {
  // tracks page layout to width changes
  const [isMobile, setIsMobile] = React.useState(false)
  // tracks whether form is disabled
  const [isFormDisabled, setIsFormDisabled] = React.useState(false)
  // tracks whether thank you modal should open
  const [isEmailSentModuleOpen, setIsEmailSentModuleOpen] = React.useState(false)
  // tracks snackbar for any error messages to the user
  const [snackbar, setSnackBar] = React.useState({
    open: false,
    message: ''
  })
  // tracks values and error states for all fields in form
  const [values, setValues] = React.useState({
    name: {
      value: '', // field value given by user
      error: false // field contains an error
    },
    email: {
      value: '',
      error: false
    },
    phone: {
      value: '',
      error: false
    },
    message: {
      value: '',
      error: false
    }
  })

  // handler to call on window resize
  useEffect(() => {
    function handleResize() {
      // check if now in mobile mode
      if (window.innerWidth <= MAX_MOBILE_WIDTH) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    // add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    // remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // handles user updates to any field in form
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: {
        value: event.target.value
      }
    })
  }

  // triggered once user decides to close thank you modal
  const handleModalHide = (event) => {
    setIsEmailSentModuleOpen(event)
  }

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  // triggered once submit button is clicked by user
  const handleFormSubmit = async () => {
    // do nothing if form is already processing a request
    if (isFormDisabled) return

    // disable form to prevent spam requests
    setIsFormDisabled(true)
    // display loading cursor
    document.body.style.cursor = 'wait'

    let nameError = false
    let messageError = false
    let emailError = false

    if (values.name.value === '') nameError = true
    if (values.message.value === '') messageError = true
    if (values.email.value === '') emailError = true

    setValues({
      ...values,
      name: { ...values.name, error: nameError },
      message: { ...values.message, error: messageError },
      email: { ...values.email, error: emailError }
    })

    // check to see if any required fields are empty
    if (nameError || messageError || emailError) {
      setSnackBar({ open: true, message: 'Missing required fields' })
      setIsFormDisabled(false)
      document.body.style.cursor = null
      return
    }

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: values.name.value,
        email: values.email.value,
        phone: values.phone.value,
        message: values.message.value
      })
    })
      // message sent
      .then(() => {
        // display email sent confirmation modal
        setIsEmailSentModuleOpen(true)
        // clear form values
        setValues({
          ...values,
          name: { ...values.name, value: '' },
          message: { ...values.message, value: '' },
          email: { ...values.email, value: '' },
          phone: { ...values.phone, value: '' }
        })
      })
      // message could not be sent
      .catch((error) => {
        // show snackbar to notify message could not be sent
        setSnackBar({
          open: true,
          message: error.toString()
        })
      })

    // allow form to be editable again
    document.body.style.cursor = null
    setIsFormDisabled(false)
  }

  const inputClasses = (hasError) =>
    cn(
      'm-2 w-[95%] border-black rounded-[30px] focus-visible:ring-brand-dark-purple focus-visible:border-brand-dark-purple h-12 px-6 bg-white font-body',
      hasError && 'border-brand-red ring-brand-red'
    )

  return (
    <div className="Contact-Us">
      {/* contains textual rendering of all information not including header image  */}
      <section className="left-container">
        {/* Main paragraph at top  */}
        <h2 className="font-heading lowercase tracking-tight">
          {isMobile ? 'Thank you for your interest in Sakyadhita!' : 'Contact Us'}
        </h2>
        <div className="font-body text-lg leading-relaxed text-gray-700">{children}</div>
        {/* Contact Information */}
        <h4 className="font-heading italic lowercase text-2xl mt-8 mb-4 border-b-2 border-brand-orange w-fit">
          Reach us at:{' '}
        </h4>
        {/* Email */}
        <div className="space-y-3 font-body">
          {frontmatter.email.map((email) => (
            <p key={email.address} className="flex items-center space-x-2">
              {' '}
              <GoMail className="text-brand-orange text-xl" />{' '}
              <a
                href={'mailto:' + email.address}
                className="hover:text-brand-orange transition-colors"
              >
                {' '}
                {email.address}{' '}
              </a>{' '}
              ({email.description}){' '}
            </p>
          ))}
          {/* Phone Number */}
          <p className="flex items-center space-x-2">
            {' '}
            <FaPhoneAlt className="text-brand-orange text-lg" /> <span>{frontmatter.phone}</span>
          </p>
          {/* Address */}
          <div className="address flex items-start space-x-2">
            <BsHouseFill className="address-icon text-brand-orange text-2xl shrink-0 mt-1" />
            <span>{frontmatter.address}</span>
          </div>
        </div>

        {/* Renders Form */}
        <h4 className="font-heading italic lowercase text-2xl mt-12 mb-6">Send us a message!</h4>
        <form autoComplete="off" name="contact" className="space-y-4">
          {/* Full Name Field */}
          <div className="form-field-wrapper">
            <Input
              name="name"
              value={values.name.value}
              onChange={handleChange}
              placeholder="Full Name"
              disabled={isFormDisabled}
              className={inputClasses(values.name.error)}
            />
            <span className="required-asterisk text-brand-red font-bold"> * </span>
          </div>
          {/* Email Field */}
          <div className="form-field-wrapper">
            <Input
              name="email"
              type="email"
              value={values.email.value}
              onChange={handleChange}
              placeholder="Email"
              disabled={isFormDisabled}
              className={inputClasses(values.email.error)}
            />
            <span className="required-asterisk text-brand-red font-bold"> * </span>
          </div>
          {/* Phone Number Field */}
          <div className="form-field-wrapper">
            <Input
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
              value={values.phone.value}
              disabled={isFormDisabled}
              className={inputClasses(values.phone.error)}
            />
            <span style={{ color: 'white' }}> * </span>
          </div>
          {/* Message Field */}
          <div className="form-field-wrapper">
            <Textarea
              name="message"
              value={values.message.value}
              onChange={handleChange}
              placeholder="Write your message here"
              disabled={isFormDisabled}
              className={cn(
                inputClasses(values.message.error),
                'h-48 rounded-[20px] py-4 resize-none'
              )}
              rows={8}
            />
            <span className="required-asterisk text-brand-red font-bold"> * </span>
          </div>
          {/* Note on required fields  */}
          <p className="text-center font-body text-sm text-gray-500">
            {' '}
            <span className="required-asterisk text-brand-red font-bold"> * </span> indicates a
            required field
          </p>
          {/* Submit Button */}
          <div className="submit-button flex justify-center py-4">
            <CustomButton text="Submit" onClickCallback={handleFormSubmit} />
          </div>
        </form>

        {/* Simple Snackbar Replacement */}
        {snackbar.open && (
          <div className="fixed bottom-5 left-5 bg-brand-red text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between min-w-[300px]">
            <span>{snackbar.message}</span>
            <button onClick={() => setSnackBar({ open: false })} className="ml-4 font-bold">
              X
            </button>
          </div>
        )}
      </section>

      {isMobile || window.innerHeight <= 500 ? (
        <ResourcesHeader
          image={frontmatter.image}
          title="Contact Us"
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ImageHeader image={frontmatter.image} width="50%" height="auto" />
      )}

      {/* Thank You Modal Once Form Submitted */}
      <Modal
        text="Thank you for contacting us. We will get in touch with you shortly."
        open={isEmailSentModuleOpen}
        hide={handleModalHide}
        negativeButtonText="Ok"
      />
    </div>
  )
}
