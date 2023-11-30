/**
 * This file creates a component for the PayPal Modal that is used to
 * display the PayPal buttons for making payments. This component is
 * used on the Join Us page to allow the user to pay for memberships.
 *
 * @summary Creates a component for PayPal Modal on Join Us page
 * @author Dhanush Nanjunda Reddy
 */

import React from 'react'
import PayPal from './PayPal'
import CustomButton from './CustomButton'
import '../css/PayPalModal.css'

export default function PayPalModal(props) {
  return (
    <>
      <div className="background" onClick={props.toggleModal} />
      <div className="paypal-modal-wrapper">
        <p className="header-text">Choose Your Payment Method</p>

        <div className="paypal-component">
          {/* displays PayPal buttons component */}
          <PayPal
            key={props.key}
            fName={props.fName}
            mName={props.mName}
            lName={props.lName}
            email={props.email}
            phone={props.phoneNumber}
            membershipTitle={props.membershipTitle}
            membershipID={props.membershipID}
            membershipCost={props.membershipCost}
            donationAmount={props.donationAmount}
            isNewMember={props.isNewMember}
            affiliatedOrgs={props.affiliatedOrgs}
            address={props.address}
            disable={false}
            transactionCompleted={props.transactionCompleted}
          />
        </div>
        {/* button to close modal */}
        <div className="return-button">
          <CustomButton text="Return to Form" onClickCallback={props.toggleModal} />
        </div>
      </div>
    </>
  )
}
