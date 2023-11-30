/**
 * This file creates a component for the volunteer committee with a checkbox,
 * title and description. This component is used on the Volunteer page to
 * display each committee option the user can choose.
 *
 * @summary Creates a component for committee options on Volunteer page
 * @author Dhanush Nanjunda Reddy
 */

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import '../css/Volunteer.css'
import { Checkbox } from '@material-ui/core'

export default function VolunteerOption(props) {
  const handleCheckbox = (event) => {
    props.handleChange(event)
  }

  const CustomColorCheckbox = withStyles({
    root: {
      color: '#000000',
      paddingLeft: 0,
      '&$checked': {
        color: '#EA8644'
      }
    },
    checked: {}
  })(Checkbox)

  return (
    <div>
      <div className="committee-row">
        <CustomColorCheckbox
          className="committee-checkbox"
          value={props.value}
          checked={props.checked}
          onChange={handleCheckbox}
        />
        <span className="committee-title">{props.title}</span>
      </div>
      <p className="committee-description">{props.description}</p>
    </div>
  )
}
