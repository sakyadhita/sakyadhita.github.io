/**
 * The ConferenceTheme page only renders the 'theme' information
 * This is a component of the Conferences page
 *
 * Takes in the following props:
 *  - title: required, string
 *  - location: required, string
 *  - redirect: required, string
 *  - theme: required, string
 *
 * @summary     conferences theme component
 * @author      Amitesh Sharma
 */

import React, { useState } from 'react'
import Markdown from 'react-markdown'
import Modal from '../Modal'
import { cn } from '../../lib/utils'

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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* The title of the conference */}
      {props.title ? (
        <section className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-brand-dark-purple lowercase tracking-tight">
            {props.title}
          </h1>
          {props.tabs ? props.tabs() : null}
        </section>
      ) : null}

      {/* The location of the conference */}
      <section>
        <h3 className="text-xl md:text-2xl font-bold font-heading italic text-brand-orange lowercase">
          {props.location}
        </h3>
      </section>

      {/* Button that opens the modal */}
      {props.signup && !props.isMobile ? (
        <section>
          <button 
            onClick={() => redirect()} 
            type="button"
            className="px-8 py-3 bg-brand-orange text-white rounded-full font-bold font-body uppercase tracking-wider hover:bg-brand-dark-orange transition-all shadow-md active:scale-95 border-none"
          >
            Sign Up
          </button>
        </section>
      ) : null}

      {/* The text describing the specific conference */}
      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 mr-[3.5vw]">
        <div className="flex-1 prose prose-lg max-w-none font-body text-gray-700 leading-relaxed italic lowercase">
          <Markdown>{props.theme}</Markdown>
        </div>
        <div className="lg:w-[55%] shrink-0">
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
