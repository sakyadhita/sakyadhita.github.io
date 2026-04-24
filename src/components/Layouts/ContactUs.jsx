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
import { Mail, Phone, House } from 'lucide-react'
import React from 'react'

import { cn } from '../../lib/utils'
import CustomButton from '../CustomButtonReact'
import Modal from '../Modal'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export default function ContactUs({ frontmatter, children }) {
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
      `
        m-2 h-12 w-[95%] rounded-3xl border-black bg-white px-6 font-body
        focus-visible:border-brand-dark-purple
        focus-visible:ring-brand-dark-purple
      `,
      hasError && 'border-brand-red ring-brand-red'
    )

  return (
    <div
      className="
        flex h-auto w-full flex-1 flex-col font-body
        lg:flex-row
      "
    >
      {/* contains textual rendering of all information not including header image  */}
      <section
        className="
          prose max-w-none flex-1 p-6 text-left text-black
          md:p-12
          lg:p-24
        "
      >
        {/* Main paragraph at top  */}
        <h2
          className="
            mb-5 font-heading text-2xl font-bold tracking-tight text-black
            lowercase
            lg:text-3xl
          "
        >
          Contact Us
        </h2>
        <div className="font-body text-lg/relaxed text-gray-700">{children}</div>
        {/* Contact Information */}
        <h4
          className="
            mt-10 mb-5 w-fit border-b-2 border-brand-orange font-heading
            text-2xl font-semibold text-black lowercase italic
          "
        >
          Reach us at:{' '}
        </h4>
        {/* Email */}
        <div className="space-y-3 font-body">
          {frontmatter.email.map((email) => (
            <p key={email.address} className="
              m-0 flex items-center space-x-2 text-black
            ">
              {' '}
              <Mail className="size-5 text-brand-orange" />{' '}
              <a
                href={'mailto:' + email.address}
                className="
                  text-black no-underline transition-colors
                  hover:text-brand-orange
                "
              >
                {' '}
                {email.address}{' '}
              </a>{' '}
              ({email.description}){' '}
            </p>
          ))}
          {/* Phone Number */}
          <p className="m-0 flex items-center space-x-2 text-black">
            {' '}
            <Phone className="size-5 text-brand-orange" /> <span>{frontmatter.phone}</span>
          </p>
          {/* Address */}
          <div className="flex items-start space-x-2 text-black">
            <House className="mt-1 size-6 shrink-0 text-brand-orange" />
            <span>{frontmatter.address}</span>
          </div>
        </div>

        {/* Renders Form */}
        <h4
          className="
            mt-12 mb-6 font-heading text-2xl font-semibold text-black lowercase
            italic
          "
        >
          Send us a message!
        </h4>
        <form autoComplete="off" name="contact" className="space-y-4">
          {/* Full Name Field */}
          <div className="flex">
            <Input
              name="name"
              value={values.name.value}
              onChange={handleChange}
              placeholder="Full Name"
              disabled={isFormDisabled}
              className={inputClasses(values.name.error)}
            />
            <span className="text-3xl font-bold text-brand-red"> * </span>
          </div>
          {/* Email Field */}
          <div className="flex">
            <Input
              name="email"
              type="email"
              value={values.email.value}
              onChange={handleChange}
              placeholder="Email"
              disabled={isFormDisabled}
              className={inputClasses(values.email.error)}
            />
            <span className="text-3xl font-bold text-brand-red"> * </span>
          </div>
          {/* Phone Number Field */}
          <div className="flex">
            <Input
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
              value={values.phone.value}
              disabled={isFormDisabled}
              className={inputClasses(values.phone.error)}
            />
            <span className="text-white"> * </span>
          </div>
          {/* Message Field */}
          <div className="flex">
            <Textarea
              name="message"
              value={values.message.value}
              onChange={handleChange}
              placeholder="Write your message here"
              disabled={isFormDisabled}
              className={cn(
                inputClasses(values.message.error),
                'h-48 resize-none rounded-2xl py-4'
              )}
              rows={8}
            />
            <span className="text-3xl font-bold text-brand-red"> * </span>
          </div>
          {/* Note on required fields  */}
          <p className="m-0 text-center font-body text-sm text-gray-500">
            {' '}
            <span className="font-bold text-brand-red"> * </span> indicates a required field
          </p>
          {/* Submit Button */}
          <div className="mt-5 flex justify-center py-4">
            <CustomButton text="Submit" onClickCallback={handleFormSubmit} />
          </div>
        </form>

        {/* Simple Snackbar Replacement */}
        {snackbar.open && (
          <div
            className="
              fixed bottom-5 left-5 z-50 flex min-w-[300px] items-center
              justify-between rounded-lg bg-brand-red px-6 py-3 text-white
              shadow-lg
            "
          >
            <span>{snackbar.message}</span>
            <button onClick={() => setSnackBar({ open: false })} className="
              ml-4 font-bold
            ">
              X
            </button>
          </div>
        )}
      </section>

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
