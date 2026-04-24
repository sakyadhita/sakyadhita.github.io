/**
 * The ConferenceTheme page only renders the 'theme' information
 * This is a component of the Conferences page
 *
 * Takes in the following props:
 *  - title: required, string
 *  - location: required, string
 *  - redirect: required, string
 *  - theme: required, string (HTML)
 *
 * @summary     conferences theme component
 * @author      Amitesh Sharma
 */

import { useState } from 'react'

import Modal from '../Modal'

export default function ConferenceTheme(props) {
  // used to control the state of the CustomModal
  const [open, setOpen] = useState(false)

  /**
   * function to set the view state of the modal.
   */
  const redirect = () => setOpen(!open)

  /**
   * Sets the modal view state to false and closes it.
   */
  const hide = () => setOpen(false)

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10">
      {/* The title of the conference */}
      {props.title ? (
        <section className="space-y-6">
          <h1
            className="
              font-heading text-3xl font-bold tracking-tight
              text-brand-dark-purple lowercase
              md:text-5xl
            "
          >
            {props.title}
          </h1>
          {props.tabs ? props.tabs() : null}
        </section>
      ) : null}

      {/* The location of the conference */}
      <section>
        <h3
          className="
            font-heading text-xl font-bold text-brand-orange lowercase italic
            md:text-2xl
          "
        >
          {props.location}
        </h3>
      </section>

      {/* Button that opens the modal */}
      {props.signup && !props.isMobile ? (
        <section>
          <button
            onClick={() => redirect()}
            type="button"
            className="
              rounded-full border-none bg-brand-orange px-8 py-3 font-body
              font-bold tracking-wider text-white uppercase shadow-md
              transition-all
              hover:bg-brand-dark-orange
              active:scale-95
            "
          >
            Sign Up
          </button>
        </section>
      ) : null}

      {/* The text describing the specific conference */}
      <div
        className="
          mr-8 flex flex-col-reverse gap-8
          lg:flex-row lg:gap-12
        "
      >
        <div
          className="
            prose prose-lg max-w-none flex-1 font-body leading-relaxed
            text-gray-700 lowercase italic
          "
          dangerouslySetInnerHTML={{ __html: props.theme }}
        />
        <div
          className="
            shrink-0
            lg:w-1/2
          "
        >
          {props.slideShow ? props.slideShow() : null}
        </div>
      </div>

      <Modal
        open={open}
        hide={hide}
        text="You will be redirected to a new link to sign up for the conference. Do you want to be redirected?"
        positiveUrl={props.redirect}
        positiveButtonText="Yes"
        negativeButtonText="No"
      />
    </div>
  )
}
