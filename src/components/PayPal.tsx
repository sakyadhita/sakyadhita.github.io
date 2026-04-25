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

import { usePayPalSDK } from '../hooks/usePayPalSDK'
import { CONTACT_INFO, PAYPAL_CONFIG } from '../SiteMetadata'

// const config = require("../config.js");

// const BACKEND_URL = config.backend.uri;

const TAX_RATE = PAYPAL_CONFIG.TAX_RATE

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

// PayPal script is located in public/index.html (contains Client ID)
interface PayPalProps {
  fName?: any
  mName?: any
  lName?: any
  email?: any
  phone?: any
  membershipTitle?: string
  membershipID?: number
  membershipCost?: number
  donationAmount?: number
  isNewMember?: boolean
  affiliatedOrgs?: string
  disable?: boolean
  transactionCompleted?: () => void
  address?: string
}

export default function PayPal({
  fName,
  mName,
  lName,
  email,
  phone,
  membershipTitle,
  membershipID: _membershipID,
  membershipCost,
  donationAmount,
  isNewMember,
  affiliatedOrgs,
  disable,
  transactionCompleted,
  address
}: PayPalProps) {
  // only add values to itemTotal and taxTotal if they are positive
  const { itemTotal, taxTotal, itemsList } = React.useMemo(() => {
    let total = 0
    total = membershipCost > 0 ? membershipCost : total
    total = donationAmount > 0 ? total + donationAmount : total
    const tax = membershipCost > 0 ? membershipCost * TAX_RATE : 0

    const list = []
    // add membership item if valid
    if (membershipCost > 0) {
      list.push({
        name: membershipTitle,
        description: `Membership level: ${membershipTitle}`,
        unit_amount: {
          currency_code: 'USD',
          value: membershipCost
        },
        tax: {
          currency_code: 'USD',
          value: tax
        },
        quantity: 1
      })
    }
    // add donation item if valid
    if (donationAmount > 0) {
      list.push({
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
    return { itemTotal: total, taxTotal: tax, itemsList: list }
  }, [membershipCost, donationAmount, membershipTitle])
  const paypalRef = React.useRef()
  const paypalOrderObject = React.useMemo(
    () => ({
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
    }),
    [itemTotal, taxTotal, itemsList]
  )

  // Use a ref to keep track of the latest values for form fields to avoid re-rendering
  // the PayPal buttons every time a user types, while still having access to the latest
  // data in the callbacks.
  const latestFormValues = React.useRef({
    fName,
    mName,
    lName,
    email,
    phone,
    address,
    isNewMember,
    affiliatedOrgs,
    transactionCompleted
  })

  React.useEffect(() => {
    latestFormValues.current = {
      fName,
      mName,
      lName,
      email,
      phone,
      address,
      isNewMember,
      affiliatedOrgs,
      transactionCompleted
    }
  }, [
    fName,
    mName,
    lName,
    email,
    phone,
    address,
    isNewMember,
    affiliatedOrgs,
    transactionCompleted
  ])

  // Load PayPal SDK dynamically
  usePayPalSDK()

  // To show PayPal buttons once the component loads and SDK is available
  React.useEffect(() => {
    // Wait for PayPal SDK to load
    const waitForPayPal = () => {
      if (globalThis.paypal && globalThis.paypal.Buttons) {
        globalThis.paypal
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

                const values = latestFormValues.current
                return (
                  fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: encode({
                      'form-name': 'paidmembership',
                      fName: values.fName || details.payer.name.given_name,
                      lName: values.lName || details.payer.name.surname,
                      email: values.email || details.payer.email_address,
                      phone: values.phone,
                      mName: values.mName,
                      address: values.address,
                      isNewMember: values.isNewMember,
                      affiliatedOrgs: values.affiliatedOrgs,
                      membershipType: membershipTitle,
                      totalPaid: Number.parseFloat(details.purchase_units[0].amount.value),
                      payPalTransactionId: details.purchase_units[0].payments.captures[0].id
                    })
                  })
                    // message sent
                    .then(() => {
                      // display thank you modal and clear form
                      values.transactionCompleted()
                    })

                    // message could not be sent
                    .catch((error) => {
                      document.body.style.cursor = null
                      alert(
                        `Transaction completed but it wasn't sent to us. Please email us at ${CONTACT_INFO.SERVICE_EMAIL} with the receipt sent to your email. Error: ${error}`
                      )
                    })
                )
                // .then((res) => {
                //     if (res.ok) {
                //       transactionCompleted()
                //     } else {
                //       alert(
                //         "Transaction completed but it wasn't sent to us. Please email us with the receipt sent to your email."
                //       )
                //     }
                //   })
                //   .catch(() => {
                //     document.body.style.cursor = null
                //     alert(
                //       'There was an internal error. Check your email for a receipt from PayPal, and contact us to set up your order.'
                //     )
                //   })
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
      } else {
        // PayPal SDK not yet loaded, try again soon
        setTimeout(waitForPayPal, 100)
      }
    }

    waitForPayPal()
  }, [membershipTitle, paypalOrderObject])

  return <div>{!disable && <div ref={paypalRef} />}</div>
}
