/**
 * This file creates a component for the PayPal Modal that is used to
 * display the PayPal buttons for making payments. This component is
 * used on the Join Us page to allow the user to pay for memberships.
 *
 * @summary Creates a component for PayPal Modal on Join Us page
 * @author Dhanush Nanjunda Reddy
 */

import CustomButton from './CustomButtonReact'
import PayPal from './PayPal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

interface PayPalModalProps {
  toggleModal: (open: boolean) => void
  fName: string
  mName?: string
  lName: string
  email: string
  phoneNumber: string
  membershipTitle: string
  membershipID: number
  membershipCost: number
  donationAmount: number
  isNewMember: boolean
  affiliatedOrgs: string
  address: string
  transactionCompleted: () => void
}

export default function PayPalModal({
  toggleModal,
  fName,
  mName,
  lName,
  email,
  phoneNumber,
  membershipTitle,
  membershipID,
  membershipCost,
  donationAmount,
  isNewMember,
  affiliatedOrgs,
  address,
  transactionCompleted
}: PayPalModalProps) {
  return (
    <Dialog open={true} onOpenChange={toggleModal}>
      <DialogContent
        className="
          max-w-xl rounded-lg border-2 border-brand-orange bg-white p-8
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-center font-heading text-2xl font-bold text-brand-dark-purple
              lowercase
            "
          >
            Choose Your Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          <PayPal
            fName={fName}
            mName={mName}
            lName={lName}
            email={email}
            phone={phoneNumber}
            membershipTitle={membershipTitle}
            membershipID={membershipID}
            membershipCost={membershipCost}
            donationAmount={donationAmount}
            isNewMember={isNewMember}
            affiliatedOrgs={affiliatedOrgs}
            address={address}
            disable={false}
            transactionCompleted={transactionCompleted}
          />
        </div>

        <div className="flex justify-center">
          <CustomButton text="Return to Form" onClickCallback={() => toggleModal(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
