/**
 * The conferences page on the website. This is a template page
 * and will be served dynamically. It will take in an array of
 * objects containing information for each conference.
 *
 * It simply renders either the mobile version or the
 * desktop version of this page. The data can be fetched on this
 * page and sent to both components and render appropriately
 *
 * @summary     conferences page
 * @author      Amitesh Sharma
 */

import React, { useEffect, useState } from 'react'
import useWindowSize from '../../util/ScreenListener'
import ConferenceDesktop from '../Conference/ConferenceDesktop'
import MobileConference from '../Conference/MobileConference'
import '../../css/Conferences.css'

export default function Conferences({ conferences, id = null }) {
  // Needed to determine when to render the desktop or mobile version
  const listener = useWindowSize()
  // const listener = { width: 2000 };

  /**
   * Determine whether to render desktop or mobile view
   * @returns desktop or mobile rendering
   */
  const isDesktop = () =>
    listener.width > 1050 ? (
      <div>
        <ConferenceDesktop data={conferences} id={id} />
      </div>
    ) : (
      <div>
        <MobileConference data={conferences} id={id} />
      </div>
    )

  return isDesktop()
}
