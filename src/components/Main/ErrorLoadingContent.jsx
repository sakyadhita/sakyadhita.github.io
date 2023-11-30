/**
 * This renders a error component for when
 * video fail to render. Takes in two props:
 *
 * height
 * width
 *
 * @summary     conferences page
 * @author      Amitesh Sharma
 */

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import '../../css/ErrorLoadingContent.css'

export const ErrorLoadingContent = (props) => {
  const height = props.height ? props.height : '100%'
  const width = props.width ? props.width : '100%'

  return (
    <div className="load-content-failure" style={{ height, width }}>
      <FontAwesomeIcon icon={faExclamationCircle} color="white" size="3x" />
      <p>Failed to load content</p>
    </div>
  )
}
