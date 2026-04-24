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

import ConferenceOverview from './ConferenceOverview'
import ConferenceTheme from './ConferenceTheme'
import HorizontalStepper from './HorizontalStepper'
import { ErrorLoadingContent } from '../Main/ErrorLoadingContent'
import Slideshow from '../Slideshow'

export default function MobileConferences(props) {
  // keep track of the conference
  const [index, setIndex] = useState(() => {
    if (props.id) {
      const ind = props.data.findIndex((x) => x.id === props.id)
      return ind === -1 ? 0 : ind
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
        <div
          className="
            relative h-72 w-full overflow-hidden rounded-b-3xl shadow-xl
            sm:h-96
          "
        >
          {displayImages.length === 1 ? (
            <div className="relative size-full">
              <div
                className="
                  absolute bottom-10 left-6 z-10 pr-12 text-white drop-shadow-md
                "
              >
                <h1
                  className="
                    font-heading text-2xl font-bold tracking-tight lowercase
                  "
                >
                  {item.data.title}
                </h1>
                <h3
                  className="
                    font-body text-sm font-bold tracking-widest uppercase
                    opacity-90
                  "
                >
                  {item.data.location}
                </h3>
              </div>
              <img className="size-full object-cover" alt="Event" src={displayImages[0]} />
              <div
                className="
                  absolute inset-0 bg-linear-to-t from-black/60 via-transparent
                  to-transparent
                "
              />
            </div>
          ) : (
            <Slideshow height="100%" width="100%" isMobile>
              {displayImages.map((image) => (
                <div key={image} className="relative size-full">
                  <div
                    className="
                      absolute bottom-12 left-6 z-10 pr-12 text-white
                      drop-shadow-md
                    "
                  >
                    <h1
                      className="
                        font-heading text-2xl font-bold tracking-tight lowercase
                      "
                    >
                      {item.data.title}
                    </h1>
                    <h3
                      className="
                        font-body text-sm font-bold tracking-widest uppercase
                        opacity-90
                      "
                    >
                      {item.data.location}
                    </h3>
                  </div>
                  <img className="size-full object-cover" alt="Event" src={image} />
                  <div
                    className="
                      absolute inset-0 bg-linear-to-t from-black/60
                      via-transparent to-transparent
                    "
                  />
                </div>
              ))}
            </Slideshow>
          )}
        </div>
      )
    }

    // if it is the overivew tab, render the associated video
    return (
      <div
        className="
          my-8 aspect-video overflow-hidden rounded-2xl bg-black shadow-lg
        "
      >
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
    <div className="mt-8 space-y-12">
      <section className="animate-in fade-in slide-in-from-bottom-4">
        <h2
          className="
            mb-6 w-fit border-b-2 border-brand-orange pb-1 font-heading text-2xl
            font-bold text-brand-dark-purple lowercase italic
          "
        >
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
        <h2
          className="
            mb-6 w-fit border-b-2 border-brand-orange pb-1 font-heading text-2xl
            font-bold text-brand-dark-purple lowercase italic
          "
        >
          Overview
        </h2>
        <ConferenceOverview info={item} />
      </section>
    </div>
  )

  // check to see if data exists
  if (props.data.length === 0) {
    return (
      <div className="py-20 text-center font-body text-gray-500 italic">
        We have no conferences to show you at this time
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col pb-12 font-body">
      <div className="component-display">
        {/* Render either the associated video or the slideshow of images */}
        <div style={{ width: '100%' }}>{slideshowVideo(true)}</div>

        {/* The stepper component */}
        <div
          className="
            no-scrollbar overflow-x-auto border-y border-gray-100 bg-gray-50
            py-8 shadow-inner
          "
        >
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
