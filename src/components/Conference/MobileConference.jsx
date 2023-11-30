/**
 * The conferences page on the website. This is a template page
 * and will be served dynamically. It will take in an array of
 * objects containing information for each conference.
 *
 * It consists of the following components:
 *  - HorizontalStepper
 *  - ConferenceOverview
 *  - ConferenceTheme
 *  - Slideshow
 *
 * @summary     conferences page
 * @author      Amitesh Sharma
 */

import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { ErrorLoadingContent } from '../Main/ErrorLoadingContent'
import HorizontalStepper from './HorizontalStepper'
import ConferenceOverview from './ConferenceOverview'
import ConferenceTheme from './ConferenceTheme'
import Slideshow from '../Slideshow'

import '../../css/Conferences.css'

export default function MobileConferences(props) {
  // keep track of the conference
  const [index, setIndex] = useState(0)
  // update screen with spceific conference information
  const [item, setItem] = useState(props.data[index])
  // list of all conferences
  const [itemList] = useState(props.data)
  // determine if video has an error
  const [videoError, setVideoError] = useState(false)

  /**
   * On rendering of page, set the current item to be the first item on stepper
   */
  useEffect(() => {
    // initalially set the page to render the first conference
    if (props.location.search) {
      const confNum = parseInt(props.location.search.split('=')[1], 10)
      // find the index of the conference in the items list
      const ind = itemList.findIndex((x) => x.data.confNum === confNum)
      setIndex(ind)
      setItem(itemList[ind])
    } else setItem(itemList[index])
  }, [])

  /**
   * Updates the current index and information rendered
   * when clicked on in VerticalStepper
   * @param {number} step - the index clicked on the vertical stepper
   */
  const setParentIndex = (step) => {
    setIndex(step)
    setItem(itemList[step])
  }

  /**
   * Renders a slideshow or video depending on the tab
   * If theme, slideshow, otherwise video
   * @param {boolean} - display video or slideshow
   * @returns Node - component to render
   */
  const slideshowVideo = (isInfo) => {
    if (isInfo) {
      if (item.data.slideShowImages.length === 1) {
        return (
          <div key={item.data.slideShowImages[0]} height="400px" width="100%">
            {/* Set styling on the img */}
            <div className="mobile-slideshow-label">
              <h1>{item.data.title}</h1>
              <h3>{item.data.location}</h3>
            </div>
            <img
              style={{
                height: '400px',
                width: '100%'
              }}
              alt="Event Visual"
              src={item.data.slideShowImages[0]}
            />
          </div>
        )
      }
      return (
        <Slideshow height="400px" width="100%" isMobile>
          {/* Loop through all the images associated with the conference */}
          {item && item.data.slideShowImages
            ? item.data.slideShowImages.map((image) => (
                <div key={image}>
                  {/* Set styling on the img */}
                  <div className="mobile-slideshow-label">
                    <h1>{item.data.title}</h1>
                    <h3>{item.data.location}</h3>
                  </div>
                  <img
                    style={{
                      height: '400px',
                      width: '100%'
                    }}
                    alt="Event Visual"
                    src={image}
                  />
                </div>
              ))
            : null}
        </Slideshow>
      )
    }

    // if it is the overivew tab, render the associated video
    return videoError ? (
      <ErrorLoadingContent height="400px" width="100%" />
    ) : (
      <ReactPlayer
        url={item.data.video}
        height="430px"
        width="100%"
        onError={() => setVideoError(true)}
      />
    )
  }

  /**
   * Rendersthe conference theme information
   * title - the title of the conference
   * location - location of the conference
   * redirect - redirect url for registration
   * theme - information about the conference
   * info - overview of conference, files
   * @returns Node - component to render
   */
  const displayInformation = () => (
    <div>
      <div className="theme-header-mobile">
        <h2>Theme</h2>
      </div>
      <ConferenceTheme
        redirect={item.data.signUpLink}
        theme={item.body}
        signup={item.data.signUpLink}
        location={item.data.location}
        isMobile
      />
      <div className="overview-header-mobile">
        <h2>Overview</h2>
      </div>
      <ConferenceOverview info={item} />
    </div>
  )

  // check to see if data exists
  if (props.data.length === 0) {
    return (
      <div className="empty-conferences">
        <p>We have no conferences to show you at this time</p>
      </div>
    )
  }

  return (
    <div className="conferences-outer-container">
      <div className="component-display">
        {/* Render either the associated video or the slideshow of images */}
        <div style={{ width: '100%' }}>{slideshowVideo(true)}</div>

        {/* The vertical stepper */}
        <div className="conference-vertical-stepper">
          <div className="horizontal-stepper">
            <HorizontalStepper
              items={props.data}
              color="#6652a0"
              setParentIndex={setParentIndex}
              location={props.location}
            />
          </div>
        </div>

        {/* The tabs to switch between theme and overview */}
        {displayInformation()}

        {/* Render either the associated video or the slideshow of images */}
        {item.data.video ? <div style={{ width: '100%' }}>{slideshowVideo(false)}</div> : null}
      </div>
    </div>
  )
}
