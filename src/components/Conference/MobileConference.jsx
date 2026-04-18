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

import { useState } from 'react'
import ReactPlayer from 'react-player'
import { ErrorLoadingContent } from '../Main/ErrorLoadingContent'
import HorizontalStepper from './HorizontalStepper'
import ConferenceOverview from './ConferenceOverview'
import ConferenceTheme from './ConferenceTheme'
import Slideshow from '../Slideshow'

export default function MobileConferences(props) {
  // keep track of the conference
  const [index, setIndex] = useState(() => {
    if (props.id) {
      const ind = props.data.findIndex((x) => x.id === props.id)
      return ind !== -1 ? ind : 0
    }
    return 0
  })

  // update screen with specific conference information
  const item = props.data[index]

  // determine if video has an error
  const [videoError, setVideoError] = useState(false)

  /**
   * Updates the current index and information rendered
   * when clicked on in VerticalStepper
   * @param {number} step - the index clicked on the vertical stepper
   */
  const setParentIndex = (step) => {
    setIndex(step)
  }

  /**
   * Renders a slideshow or video depending on the tab
   * If theme, slideshow, otherwise video
   * @param {boolean} - display video or slideshow
   * @returns Node - component to render
   */
  const slideshowVideo = (isInfo) => {
    const displayImages = item.data.optimizedImages || item.data.slideShowImages
    if (isInfo) {
      return (
        <div className="relative h-72 sm:h-96 w-full rounded-b-3xl overflow-hidden shadow-xl">
          {displayImages.length === 1 ? (
            <div className="w-full h-full relative">
              <div className="absolute bottom-10 left-6 z-10 text-white drop-shadow-md pr-12">
                <h1 className="font-heading font-bold text-2xl lowercase tracking-tight">
                  {item.data.title}
                </h1>
                <h3 className="text-sm font-bold opacity-90 uppercase tracking-widest font-body">
                  {item.data.location}
                </h3>
              </div>
              <img className="w-full h-full object-cover" alt="Event" src={displayImages[0]} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          ) : (
            <Slideshow height="100%" width="100%" isMobile>
              {displayImages.map((image) => (
                <div key={image} className="w-full h-full relative">
                  <div className="absolute bottom-12 left-6 z-10 text-white drop-shadow-md pr-12">
                    <h1 className="font-heading font-bold text-2xl lowercase tracking-tight">
                      {item.data.title}
                    </h1>
                    <h3 className="text-sm font-bold opacity-90 uppercase tracking-widest font-body">
                      {item.data.location}
                    </h3>
                  </div>
                  <img className="w-full h-full object-cover" alt="Event" src={image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              ))}
            </Slideshow>
          )}
        </div>
      )
    }

    // if it is the overivew tab, render the associated video
    return (
      <div className="my-8 rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
        {videoError ? (
          <ErrorLoadingContent height="100%" width="100%" />
        ) : (
          <ReactPlayer
            url={item.data.video}
            height="100%"
            width="100%"
            controls
            onError={() => setVideoError(true)}
          />
        )}
      </div>
    )
  }

  const displayInformation = () => (
    <div className="space-y-12 mt-8">
      <section className="animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-bold font-heading text-brand-dark-purple border-b-2 border-brand-orange w-fit pb-1 mb-6 italic lowercase">
          Theme
        </h2>
        <ConferenceTheme
          redirect={item.data.signUpLink}
          theme={item.data.htmlBody}
          signup={item.data.signUpLink}
          location={item.data.location}
          isMobile
        />
      </section>
      <section className="animate-in fade-in slide-in-from-bottom-4 delay-200">
        <h2 className="text-2xl font-bold font-heading text-brand-dark-purple border-b-2 border-brand-orange w-fit pb-1 mb-6 italic lowercase">
          Overview
        </h2>
        <ConferenceOverview info={item} />
      </section>
    </div>
  )

  // check to see if data exists
  if (props.data.length === 0) {
    return (
      <div className="py-20 text-center italic text-gray-500 font-body">
        We have no conferences to show you at this time
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pb-12 font-body">
      <div className="component-display">
        {/* Render either the associated video or the slideshow of images */}
        <div style={{ width: '100%' }}>{slideshowVideo(true)}</div>

        {/* The stepper component */}
        <div className="py-8 bg-gray-50 border-y border-gray-100 shadow-inner overflow-x-auto no-scrollbar">
          <HorizontalStepper
            items={props.data}
            color="#6652a0"
            setParentIndex={setParentIndex}
            id={props.id}
          />
        </div>

        {/* The information for either theme or overview */}
        <div className="px-6">{displayInformation()}</div>

        {/* Render the video at bottom if it exists */}
        {item.data.video && slideshowVideo(false)}
      </div>
    </div>
  )
}
