/**
 * The conferences page on the website. This is a template page
 * and will be served dynamically. It will take in an array of
 * objects containing information for each conference.
 *
 * It consists of the following components:
 *  - VerticalStepper
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
import VerticalStepper from './VerticalStepper'
import ConferenceOverview from './ConferenceOverview'
import ConferenceTheme from './ConferenceTheme'
import Slideshow from '../Slideshow'

import '../../css/Conferences.css'

export default function ConferencesDesktop(props) {
  // switch used to toggle theme and overview state
  const [isInfo, setIsInfo] = useState(true)
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
    if (props.id) {
      // find the index of the conference in the items list
      const ind = itemList.findIndex((x) => x.slug === props.id)
      setIndex(ind)
      setItem(itemList[ind])
    } else setItem(itemList[index])
  }, [])

  /**
   * Switch between the theme and overview tabs depending on the previous state
   */
  const updateInformation = () => {
    setIsInfo(!isInfo)
  }

  /**
   * Updates the current index and information rendered
   * when clicked on in VerticalStepper
   * @param {number} step - the index clicked on the vertical stepper
   */
  const setParentIndex = (step) => {
    setIndex(step)
    setItem(itemList[step])
  }

  const tabs = () => (
    <div className="slideshow-section">
      <div className="slideshow-section-tabs">
        {/* The 'theme' tab button */}
        <button
          className={isInfo ? 'slideshow-section-theme-active' : 'slideshow-section-theme'}
          onClick={() => updateInformation()}
          type="button"
        >
          Theme
        </button>
        {/* The 'overview' tab button */}
        <button
          className={isInfo ? 'slideshow-section-overview' : 'slideshow-section-overview-active'}
          onClick={() => updateInformation()}
          type="button"
        >
          Overview
        </button>
      </div>
    </div>
  )

  /**
   * Renders a slideshow or video depending on the tab
   * If theme, slideshow, otherwise video
   * @returns Node - component to render
   */
  const slideshowVideo = () => {
    if (isInfo || !item.data.video) {
      if (item.data.slideShowImages.length === 1) {
        return (
          <div key={item.data.slideShowImages[0]} height="430px" width="100%">
            {/* Set styling on the img */}
            <img
              className="img-slideshow-conferences"
              alt="Event Visual"
              src={item.data.slideShowImages[0]}
            />
          </div>
        )
      }
      return (
        <Slideshow height="430px" width="100%" isMobile={false}>
          {/* Loop through all the images associated with the conference */}
          {item.data.slideShowImages.map((image) => (
            <div key={image}>
              {/* Set styling on the img */}
              <img className="img-slideshow-conferences" alt="Event Visual" src={image} />
            </div>
          ))}
        </Slideshow>
      )
    }

    // if it is the overivew tab, render the associated video
    return videoError ? (
      <ErrorLoadingContent height="430px" width="100%" />
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
   *      title - the title of the conference
   *      location - location of the conference
   *      redirect - redirect url for registration
   *      theme - information about the conference
   *      info - overview of conference, files
   * @returns Node - component to render
   */
  const displayInformation = () => {
    if (isInfo) {
      return (
        <ConferenceTheme
          title={item.data.title}
          location={item.data.location}
          redirect={item.data.signUpLink}
          theme={item.body}
          signup={item.data.signUpLink}
          isMobile={false}
          slideShow={slideshowVideo}
          tabs={tabs}
        />
      )
    }

    // if it is not the info tab, then render the overview tab
    return (
      <ConferenceOverview
        info={item}
        title={item.data.title}
        slideShow={slideshowVideo}
        tabs={tabs}
      />
    )
  }

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
        {/* The vertical stepper */}
        <div className="conference-vertical-stepper">
          <div className="sticky-vertical-stepper">
            <VerticalStepper
              items={props.data}
              color="#6652a0"
              setParentIndex={setParentIndex}
              id={props.id}
            />
          </div>
        </div>

        {/* This outer div is used for 1050 < x < 1200 screen widths */}
        <div className="small-desktop-div-container">
          {/* Display the information for either theme or overview */}
          <div className="conference-container">
            {displayInformation()}
            {/* <div style={{ width: "100%" }}>{slideshowVideo()}</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
