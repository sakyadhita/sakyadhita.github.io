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

import React from 'react'
import ConferenceDesktop from '../Conference/ConferenceDesktop'
import MobileConference from '../Conference/MobileConference'

function Conferences({ conferences, id = '' }) {
  return (
    <>
      <div className="hidden lg:block">
        <ConferenceDesktop data={conferences} id={id} />
      </div>
      <div className="block lg:hidden">
        <MobileConference data={conferences} id={id} />
      </div>
    </>
  )
}

export default React.memo(Conferences)
