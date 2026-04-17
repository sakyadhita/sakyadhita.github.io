/**
 * Displays Home Screen of website, inclusive of Slideshow component and interactive map for
 * global branches/chapters. The page dynamically rerenders css as screen width changes, adjusting
 * for mobile/tablet views. It has sub-components for the Slideshow, Interactive Map, and each of
 * the Be Involved sections.
 *
 * @summary Renders and formats Home Page.
 *
 * @author Amrit Kaur Singh
 */

import React, { useState, useEffect } from 'react'
import { ExternalLink, Mail } from 'lucide-react'
import Markdown from 'react-markdown'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import InteractiveMap from '../Home/InteractiveMap'
import Slideshow from '../Slideshow'
import NewsEventsSlide from '../Home/NewsEventsSlide'
import BeInvolved from '../Home/BeInvolved'
import Introduction from '../Home/Introduction'
import NewsFlash from '../Home/NewsFlash'
import Loader from '../Main/Loader'

import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'

// Mobile Screens
const MAX_HEIGHT_HORIZONTAL_MOBILE = 500 // Landscape Layout
const MAX_MOBILE_WIDTH = 750

// Tablet Screens - Portrait Layout
const TABLET_MIN_WIDTH = 756
const TABLET_MAX_WIDTH = 1050
const TABLET_MIN_HEIGHT = 1000
const TABLET_MAX_HEIGHT = 2500

export default function Home({
  newsAndEvents,
  introduction,
  newsflash,
  branchesAndChapters,
  additionalSections,
  images
}) {
  // tracks layout of screen
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [disableZoom, setDisableZoom] = useState(false)

  const [isMobile, setMobileView] = useState(false)
  const [isHorizontalMobile, setHorizontalMobile] = useState(false)
  const [isTabletVertical, setTebletVertical] = useState(false)

  // handler to call on window resize
  useEffect(() => {
    function handleResize() {
      // check if now in mobile mode
      if (window.innerWidth <= MAX_MOBILE_WIDTH) {
        setDisableZoom(false)
        setMobileView(true)
      } else {
        setDisableZoom(true)
        setMobileView(false)
      }

      // mobile landscape mode
      if (window.innerHeight <= MAX_HEIGHT_HORIZONTAL_MOBILE) {
        setHorizontalMobile(true)
      } else {
        setHorizontalMobile(false)
      }

      // portrait tablet screen mode
      if (
        window.innerWidth >= TABLET_MIN_WIDTH &&
        window.innerWidth <= TABLET_MAX_WIDTH &&
        window.innerHeight >= TABLET_MIN_HEIGHT &&
        window.innerHeight <= TABLET_MAX_HEIGHT
      ) {
        setTebletVertical(true)
      } else {
        setTebletVertical(false)
      }
    }

    setIsPageLoading(false)

    // add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    // remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function getSlideshowHeight() {
    if (isHorizontalMobile) return '500px'
    if (isMobile) return '95vh'
    if (isTabletVertical) return '55vh'
    return '85vh'
  }

  function displayTooltip(dataTip) {
    if (branchesAndChapters.length > 0) {
      const item = branchesAndChapters[Math.floor(dataTip)]
      const data = item.data

      return (
        <div key={item.id}>
          {/* Display name (with hyperlink if given) */}
          {data.siteLink ? (
            <a
              href={data.siteLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline text-brand-orange"
            >
              {data.name}
              <ExternalLink className="shrink-0 w-4 h-4" />
            </a>
          ) : (
            <span className="font-bold text-brand-dark-purple">{data.name}</span>
          )}
          {/* Display email if it given */}
          {data.email ? (
            <div className="flex items-center gap-1 mt-1 text-sm">
              <Mail className="shrink-0 w-4 h-4 text-brand-orange" />
              {data.email}
            </div>
          ) : null}
          <div className="prose prose-sm max-w-none mt-2 leading-tight">
            <Markdown>{item.body}</Markdown>
          </div>
        </div>
      )
    }
  }

  const formatLoader = (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  )

  const renderSlideshow =
    newsAndEvents.length > 0 ? (
      <Slideshow height={getSlideshowHeight()} width="100%" isMobile={isMobile}>
        {/* All Slides mapped here with display information  */}
        {newsAndEvents.map((slideInfo) => (
          <NewsEventsSlide
            key={slideInfo.title}
            height={getSlideshowHeight()}
            showButton={slideInfo.redirectLink}
            openInSameTab={slideInfo.openInSameTab}
            redirect_link={slideInfo.redirectLink}
            title={slideInfo.title}
            description={slideInfo.description}
            image_url={slideInfo.imageLink}
          />
        ))}
      </Slideshow>
    ) : null

  if (isPageLoading) {
    return formatLoader
  }
  return (
    <div className="w-full">
      {/* Slideshow component */}
      {isPageLoading ? formatLoader : renderSlideshow}
      {/* Body of Page - Everthing below slideshow */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 flex flex-col items-center font-body">
        {/* Introduction */}
        <section id="home-intro" className="w-full whitespace-pre-line">
          <Introduction body={introduction} />
        </section>

        {/* Mini Divider */}
        <hr className="w-1/2 h-0.5 bg-brand-orange border-none my-16 md:my-[70px_0_40px_0]" />

        {/* Latest News */}
        {newsflash.data.isPublished > 0 && (
          <>
            <section id="latest-news" className="w-full">
              <NewsFlash article={newsflash} />
            </section>
          </>
        )}
        {additionalSections.length > 0 && (
          <>
            <hr className="w-1/2 h-0.5 bg-brand-orange border-none my-16" />
            <section className="w-full flex flex-col gap-8">
              {additionalSections.map((section) => (
                <div key={section.id} className="flex flex-col text-left whitespace-pre-line">
                  <h1 className="font-heading font-bold text-2xl md:text-3xl mb-8 mt-5">{section.data.title}</h1>
                  <div
                    className="prose max-w-none flex flex-col items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: `${section.body}` }}
                  />
                </div>
              ))}
            </section>
          </>
        )}
        {images.length > 0 && (
          <Gallery>
            <section className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label="Gallery">
              {images.map((image, index) => (
                <Item
                  key={`${image.default.src}-${index}`}
                  original={image.default.src}
                  thumbnail={image.default.src}
                  width={image.default.width}
                  height={image.default.height}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src={image.default.src}
                      width={image.default.width}
                      height={image.default.height}
                      loading="lazy"
                      alt="Home gallery"
                      className="w-full h-[220px] md:h-[260px] object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  )}
                </Item>
              ))}
            </section>
          </Gallery>
        )}

        {/* Branches & Chapters Section */}
        <section id="branches-and-chapters" className="w-full flex flex-col-reverse lg:flex-row-reverse items-center justify-center mt-[30px]">
          {/* Interactive Map */}
          {isPageLoading ? (
            formatLoader
          ) : (
            <div className="w-full lg:w-1/2 h-[400px] md:h-[600px]">
              <InteractiveMap
                disableZooming={disableZoom}
                markers={branchesAndChapters.map((m) => m.data)}
                renderTooltipContent={(index) => displayTooltip(index)}
              />
            </div>
          )}

          {/* Branch/Chapter Information  */}
          <div className="w-full lg:w-1/2 lg:pr-12 prose max-w-none mt-6 lg:mt-0 whitespace-pre-wrap">
            <h1 className="font-heading font-bold mb-[30px] text-2xl md:text-3xl">Branches </h1>
            <p className="text-gray-700">
              Buddhist women and their allies gather at the Sakyadhita International Conferences
              every two years and also organize national branches and local chapters to facilitate
              networking and events closer to home. These branches and chapters help bring awareness
              of Sakyadhita’s goals and activities to large numbers of people in their vicinity.
              Some help plan the international conferences, developing leadership skillson the
              ground. Others are active in translation activities and have done excellent work in
              training translators who are qualified to translate materials on Buddhism and issues
              of interest to Buddhist women.
              {'\n\n\n'}
              Click on a pin for more information about the branch!
              {isMobile ? ' Pinch the screen to zoom in and out of the map.' : null}
              {'\n'}
            </p>
            {/* Mini Color Legend  */}
            <section className="flex flex-row justify-evenly items-start mt-8">
              <div className="flex flex-row items-center justify-center text-center">
                <div className="w-6 h-6 mr-2 bg-[#EA8644]" />
                <div className="font-bold lowercase"> Branch </div>
              </div>

              <div className="flex flex-row items-center justify-center text-center">
                <div className="w-6 h-6 mr-2 bg-[#8477B9]" />
                <div className="font-bold lowercase"> Chapter </div>
              </div>
            </section>
          </div>
        </section>

        {/* Mini Divider */}
        <hr className="w-1/2 h-0.5 bg-brand-orange border-none my-16 md:my-[70px_0_40px_0]" />

        {/* Be Involved Section  */}
        <section id="home-be-involved" className="w-full prose max-w-none mt-8">
          <h1 className="font-heading font-bold mb-[30px] text-2xl md:text-3xl text-center md:text-left">Be Involved </h1>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 lg:gap-12 justify-between items-center mt-[30px]">
            {/* Join Us  */}
            <BeInvolved
              description="Become a member of Sakyadhita!"
              image_url="/assets/Join%20Us%20Page/JoinUs.jpg"
              openInSameTab="true"
              redirect_link={SITE_PAGES.JOIN_US}
              button_title="Join Us"
            />
            {/* Volunteer  */}
            <BeInvolved
              description="Interested in helping us with anything from writing content to
                            building?"
              image_url="/assets/Join%20Us%20Page/Volunteer.jpg"
              openInSameTab="true"
              redirect_link={SITE_PAGES.VOLUNTEER}
              button_title="Volunteer"
            />
            {/* Donate  */}
            <BeInvolved
              description="Help us grow and continue to connect by donating in any amount"
              image_url="/assets/Donate%20Page/Donate.jpg"
              openInSameTab="true"
              redirect_link={SITE_PAGES.DONATE}
              button_title="Donate"
            />
          </div>
        </section>
      </section>
    </div>
  )
}
