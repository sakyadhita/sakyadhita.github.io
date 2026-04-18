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

import { useState } from 'react'
import ReactPlayer from 'react-player'
import { ErrorLoadingContent } from '../Main/ErrorLoadingContent'
import VerticalStepper from './VerticalStepper'
import ConferenceOverview from './ConferenceOverview'
import ConferenceTheme from './ConferenceTheme'
import Slideshow from '../Slideshow'
import { cn } from '../../lib/utils'

export default function ConferencesDesktop(props) {
  // switch used to toggle theme and overview state
  const [isInfo, setIsInfo] = useState(true)
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

  const tabs = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit mb-8 font-body">
      <button
        className={cn(
          'px-6 py-2 rounded-lg font-bold transition-all',
          isInfo ? 'bg-white text-brand-dark-purple shadow-sm' : 'text-gray-500 hover:text-gray-700'
        )}
        onClick={() => setIsInfo(true)}
        type="button"
      >
        Theme
      </button>
      <button
        className={cn(
          'px-6 py-2 rounded-lg font-bold transition-all',
          !isInfo
            ? 'bg-white text-brand-dark-purple shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
        onClick={() => setIsInfo(false)}
        type="button"
      >
        Overview
      </button>
    </div>
  )

  /**
   * Renders a slideshow or video depending on the tab
   * If theme, slideshow, otherwise video
   * @returns Node - component to render
   */
  const slideshowVideo = () => {
    const displayImages = item.data.optimizedImages || item.data.slideShowImages
    if (isInfo || !item.data.video) {
      return (
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 h-112">
          {displayImages.length === 1 ? (
            <img
              className="w-full h-full object-cover"
              alt="Event Visual"
              src={displayImages[0]}
            />
          ) : (
            <Slideshow height="100%" width="100%" isMobile={false}>
              {displayImages.map((image) => (
                <div key={image} className="w-full h-full">
                  <img className="w-full h-full object-cover" alt="Event Visual" src={image} />
                </div>
              ))}
            </Slideshow>
          )}
        </div>
      )
    }

    // if it is the overivew tab, render the associated video
    return (
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-black h-112">
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
          theme={item.data.htmlBody}
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
      <div className="flex items-center justify-center py-24 italic text-gray-500 text-xl font-body">
        We have no conferences to show you at this time
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-12 py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
        {/* The vertical stepper */}
        <aside className="w-full lg:w-48 lg:shrink-0">
          <div className="lg:sticky lg:top-32">
            <VerticalStepper
              items={props.data}
              color="#6652a0"
              setParentIndex={setParentIndex}
              id={props.id}
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {displayInformation()}
          </div>
        </main>
      </div>
    </div>
  )
}
