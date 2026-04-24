/**
 * This file creates a component for the volunteer committee with a checkbox,
 * title and description. This component is used on the Volunteer page to
 * display each committee option the user can choose.
 *
 * @summary Creates a component for committee options on Volunteer page
 * @author Dhanush Nanjunda Reddy
 */

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
          className="
            size-6 rounded-md border-black shadow-sm
            data-checked:bg-brand-orange
          "
          checked={props.checked}
          onCheckedChange={handleCheckbox}
        />
        <Label
          htmlFor={id}
          className="
            committee-title cursor-pointer font-body text-lg font-bold
            text-brand-dark-purple
          "
        >
          {props.title}
        </Label>
      </div>
      <p
        className="
          committee-description mt-2 ml-9 font-body text-base/relaxed
          text-gray-600 italic
        "
      >
        {props.description}
      </p>
    </div>
  )
}
