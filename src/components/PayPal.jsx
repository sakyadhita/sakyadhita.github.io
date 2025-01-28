/**
 * This file contains the code for the PayPal Smart Buttons integration.
 * It will call the backend to verify the item type, and then after the purchase was complete.
 * The expected props include Membership title, membership cost, donation amount, and disable
 * This function also takes in a callback function that is called when the transaction is completed.
 *
 * @summary Renders paypal buttons for payment based on values passed in through props
 * @author PatrickBrown1
 */
import React from 'react'

// const config = require("../config.js");

// const BACKEND_URL = config.backend.uri;

const TAX_RATE = 0.08

// PayPal script is located in public/index.html (contains Client ID)
export default function PayPal({
  fName,
  mName,
  lName,
  email,
  phone,
  membershipTitle,
  membershipID,
  membershipCost,
  donationAmount,
  isNewMember,
  affiliatedOrgs,
  disable,
  transactionCompleted,
  address
}) {
  // only add values to itemTotal and taxTotal if they are positive
  let itemTotal
  itemTotal = membershipCost > 0 ? membershipCost : itemTotal
  itemTotal = donationAmount > 0 ? itemTotal + donationAmount : itemTotal
  const taxTotal = membershipCost > 0 ? membershipCost * TAX_RATE : 0
  // generate donation and item
  const itemsList = []
  // add membership item if valid
  if (membershipCost > 0) {
    itemsList.push({
      name: membershipTitle,
      description: `Membership level: ${membershipTitle}`,
      unit_amount: {
        currency_code: 'USD',
        value: membershipCost
      },
      tax: {
        currency_code: 'USD',
        value: taxTotal
      },
      quantity: 1
    })
  }
  // add donation item if valid
  if (donationAmount > 0) {
    itemsList.push({
      name: 'Donation',
      description: `Donation of $${donationAmount}`,
      unit_amount: {
        currency_code: 'USD',
        value: donationAmount
      },
      tax: {
        currency_code: 'USD',
        value: 0
      },
      quantity: 1
    })
  }
  const paypalRef = React.useRef()
  const paypalOrderObject = {
    intent: 'CAPTURE',
    application_context: {
      shipping_preference: 'NO_SHIPPING'
    },
    purchase_units: [
      {
        description: 'Sakyadhita Membership or Donation Confirmation',
        // Deals with pricing of the cart
        amount: {
          currency_code: 'USD',
          value: itemTotal + taxTotal,
          breakdown: {
            // includes totals for items and taxes. Shipping and handling can be ignored
            // because the items are for pickup and handling is included in price
            item_total: {
              currency_code: 'USD',
              value: itemTotal
            },
            tax_total: {
              currency_code: 'USD',
              value: taxTotal
            }
          }
        },
        // Deals with the individual item entries for the order
        items: itemsList
      }
    ]
  }
  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: async (_data, actions) => {
          // console.log(paypalOrderObject)
          return actions.order.create(paypalOrderObject)
        },
        onApprove: async (_data, actions) => {
          // loading cursor to indicate to the user they need to wait
          document.body.style.cursor = 'wait'
          return actions.order.capture().then((details) => {
            // restore screen back to normal
            document.body.style.cursor = null
            // create membership object
            const membershipObject = {
              fName: fName || details.payer.name.given_name,
              lName: lName || details.payer.name.surname,
              email: email || details.payer.email_address,
              phone,
              mName,
              address,
              isNewMember,
              affiliatedOrgs,
              membershipType: membershipID,
              totalPaid: parseFloat(details.purchase_units[0].amount.value),
              payPalTransactionId: details.purchase_units[0].payments.captures[0].id
            }
            console.log(membershipObject)

            return fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: encode({
                'form-name': 'paidmembership',
                fName: fName || details.payer.name.given_name,
                lName: lName || details.payer.name.surname,
                email: email || details.payer.email_address,
                phone,
                mName,
                address,
                isNewMember,
                affiliatedOrgs,
                membershipType: membershipID,
                totalPaid: parseFloat(details.purchase_units[0].amount.value),
                payPalTransactionId: details.purchase_units[0].payments.captures[0].id
              })
            })
              .then((res) => {
                if (res.ok) {
                  transactionCompleted()
                } else {
                  alert(
                    "Transaction completed but it wasn't sent to us. Please email us with the receipt sent to your email."
                  )
                }
              })
              .catch(() => {
                document.body.style.cursor = null
                alert(
                  'There was an internal error. Check your email for a receipt from PayPal, and contact us to set up your order.'
                )
              })
          })
        },
        onCancel: () => {
          document.body.style.cursor = null
        },
        onError: (_err) => {
          document.body.style.cursor = null
          alert(
            'An unexpected error occurred - your payment did not go through. Please try again later.'
          )
        }
      })
      .render(paypalRef.current)
  }, [membershipTitle, membershipCost, donationAmount])

  return <div>{!disable && <div ref={paypalRef} />}</div>
}
