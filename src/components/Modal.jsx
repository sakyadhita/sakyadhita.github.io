/**
 * This is a custom modal that can be reused for other pages.
 * Takes in the following props:
 *  - open: control if the modal should be open or not
 *  - hide: function to hide the modal
 *  - text: required, pass in text for the modal.
 *  - url: required if button is rendered within modal,
 *         directs the user to the specified link.
 *
 * @summary     popup modal
 * @author      Amitesh Sharma
 */

import React from 'react'
import { Modal } from 'react-bootstrap'
import '../css/Modal.css'

export default function CustomModal({
  hide,
  open,
  text,
  negativeButtonText,
  positiveButtonText,
  positiveUrl
}) {
  // redirect to the registration url
  const redirectLink = () => {
    window.location.href = positiveUrl
  }

  return (
    <Modal show={open} onHide={() => hide(false)} centered>
      <div className="modal-body-div">
        <div className="modal-body-content">
          <Modal.Body>
            {/* The text of the modal */}
            <p>{text}</p>

            {/* Contains the two buttons within the modal */}
            <div className="redirect-div">
              {/* The close modal button */}
              {negativeButtonText ? (
                <button className="redirect-cancel" onClick={() => hide(false)} type="button">
                  {negativeButtonText}
                </button>
              ) : null}

              {positiveButtonText ? (
                <button className="redirect-link" onClick={() => redirectLink()} type="button">
                  {positiveButtonText}
                </button>
              ) : null}
            </div>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  )
}
