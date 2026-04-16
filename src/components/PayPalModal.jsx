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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export default function PayPalModal(props) {
  return (
    <Dialog open={true} onOpenChange={props.toggleModal}>
      <DialogContent className="max-w-xl p-8 border-2 border-brand-orange bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading text-brand-dark-purple text-center lowercase">
            Choose Your Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          <PayPal
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

        <div className="flex justify-center">
          <CustomButton text="Return to Form" onClickCallback={props.toggleModal} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
