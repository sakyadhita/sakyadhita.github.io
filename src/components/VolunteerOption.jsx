/**
 * This file creates a component for the volunteer committee with a checkbox,
 * title and description. This component is used on the Volunteer page to
 * display each committee option the user can choose.
 *
 * @summary Creates a component for committee options on Volunteer page
 * @author Dhanush Nanjunda Reddy
 */

import React from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export default function VolunteerOption(props) {
  const handleCheckbox = (checked) => {
    // Replicate event object for the legacy handler
    props.handleChange({ target: { value: props.value, checked } })
  }

  const id = `committee-${props.value}`

  return (
    <div className="mb-4">
      <div className="committee-row flex items-center space-x-3">
        <Checkbox
          id={id}
          className="border-black data-[state=checked]:bg-brand-orange w-6 h-6 rounded-md shadow-sm"
          checked={props.checked}
          onCheckedChange={handleCheckbox}
        />
        <Label
          htmlFor={id}
          className="committee-title cursor-pointer font-bold text-[18px] font-body text-brand-dark-purple"
        >
          {props.title}
        </Label>
      </div>
      <p className="committee-description mt-2 ml-9 text-[16px] font-body text-gray-600 leading-relaxed italic">
        {props.description}
      </p>
    </div>
  )
}
