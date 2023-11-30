/**
 * The ConferenceOverview page only renders the 'overview' information
 * This is a component of both Conferences page.
 *
 * Takes in the following props:
 *  - title: required, string
 *  - item: required, object consisting of:
 *      - url: required, string
 *      - description: required, string
 *
 * @summary     conferences theme component
 * @author      Amitesh Sharma
 */

import React from 'react'
import '../../css/Conferences.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export default function ConferenceOverview(props) {
  const items = props.info

  // Convert each item in the props.info to a <a> tag
  const itemList = (item) => (
    <div className="program-divider">
      {/* Loop thorugh each item and display it */}

      {!item || item.length === 0 ? (
        <div className="program no-hover">
          <p>No info available</p>
        </div>
      ) : (
        item.map((program) => (
          <a href={program.url} download className="program" key={program.url}>
            {/* The download font icon */}
            <FontAwesomeIcon icon={faDownload} />
            <p>{program.description}</p>
          </a>
        ))
      )}
    </div>
  )

  return (
    <div className="conference-overview">
      {/* The title of the conference */}
      <section className="conference-info-title">
        <h1>{props.title}</h1>
        {props.tabs ? props.tabs() : null}
      </section>

      {/* Header section for file downloads */}
      <section className="conference-info-resource-title">
        <h4>Conference resources are available for download as a PDF.</h4>
      </section>

      <div className="conferences-info-section">
        <div className="conference-info-divider-div">
          {/* render the files for 'brochures' */}
          <div className="conference-info-divider">Brochures</div>
          {itemList(items.data.brochures)}

          {/* render the files for 'programs' */}
          <div className="conference-info-divider">Programs</div>
          {itemList(items.data.programs)}

          {/* render the files for 'abstracts' */}
          <div className="conference-info-divider">Abstracts</div>
          {itemList(items.data.abstracts)}

          {/* render the files for 'presentations' */}
          <div className="conference-info-divider">Presentations</div>
          {itemList(items.data.presentations)}
        </div>

        <div className="conference-info-slideshow">
          {props.slideShow ? props.slideShow() : null}
        </div>
      </div>
    </div>
  )
}
