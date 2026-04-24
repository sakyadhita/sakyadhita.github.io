/**
 * renders the EPublication page that includes sections of publications
 * that can be expanded to show all publications in that section. This page
 * currently uses dummy data to display the publication list.
 *
 * Calls EPubCard.js, and EPubSection.js
 *
 * @Author PatrickBrown1, Navid Boloorian
 */

import { useState, useEffect } from 'react'

import EPubCard from '../EPubs/EPubCard'
import EPubSection from '../EPubs/EPubSection'
import Slideshow from '../Slideshow'

// renders selected section from state, including each card in that page,
// and a button to go back to the main EPublications screen
const renderSelectedSection = (selectedSection, setSelectedSection, isMobile) => {
  if (!isMobile) {
    // render desktop version
    return (
      <div className="relative mx-[10vw] mt-32 mb-24 block">
        <div className="relative top-0 left-0 block h-12 w-full">
          <h1 className="w-full text-center font-heading text-4xl/relaxed">
            {selectedSection.section_title}
          </h1>
          <button
            type="button"
            className="
              absolute bottom-0 left-6 z-100 mb-4 w-fit cursor-pointer
              border-none bg-inherit p-0 font-body text-lg/relaxed no-underline
              hover:underline
            "
            onClick={() => {
              setSelectedSection('')
            }}
          >
            &lt; Back
          </button>
          <p
            className="
              absolute right-6 bottom-0 z-100 w-fit font-body text-lg/relaxed
              no-underline
            "
          >
            All <span className="text-brand-orange">({selectedSection.section_list.length})</span>
          </p>
        </div>
        <div
          className="
            relative mx-[-25px] flex flex-wrap items-start justify-center
            text-center
          "
        >
          {
            // render each card based on data passed in
            selectedSection.section_list.map((pub) => (
              <EPubCard
                key={pub.data.id}
                title={pub.data.title}
                author={pub.data.author}
                image_url={pub.data.imageLink}
                optimized_url={pub.data.optimizedImage}
                redirect_link={pub.data.pdfLink}
                isMobile={isMobile}
              />
            ))
          }
        </div>
      </div>
    )
  }
  return (
    // render mobile version
    <div className="relative mx-[10vw] my-12 block">
      <div
        className="
          relative -top-12 ml-[-10vw] block h-24 w-[calc(100%+20vw)] pt-5
          shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]
        "
      >
        <h1 className="w-full text-center font-heading text-2xl/tight font-bold">
          {selectedSection.section_title}
        </h1>
        <button
          type="button"
          className="
            relative mx-auto mt-3 mb-5 block w-fit cursor-pointer border-none
            bg-inherit p-0 text-center font-body text-base/tight
            hover:underline
          "
          onClick={() => {
            setSelectedSection('')
          }}
        >
          &lt; Back to latest
        </button>
      </div>
      <div
        className="
          relative mx-[-25px] flex flex-wrap items-start justify-center
          text-center
        "
      >
        {
          // render each card based on data passed in
          selectedSection.section_list.map((pub) => (
            <div
              key={pub.data.id}
              className="flex flex-col items-center justify-start"
            >
              <EPubCard
                title={pub.data.title}
                author={pub.data.author}
                image_url={pub.data.imageLink}
                optimized_url={pub.data.optimizedImage}
                redirect_link={pub.data.pdfLink}
                isMobile={isMobile}
              />
              <button
                type="button"
                onClick={() => window.open(pub.data.pdfLink, '_blank', 'norefferer')}
                className="
                  mb-5 h-9 w-40 cursor-pointer rounded-full border-none
                  bg-brand-orange text-white
                "
              >
                Read
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
// No props
export default function EPublications({ sections, featuredEpubs }) {
  const [selectedSection, setSelectedSection] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // max width size that mobile view will be rendered
  const MAX_MOBILE_VIEW_WIDTH = 600

  // track window resizes to determine rerender
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= MAX_MOBILE_VIEW_WIDTH)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  useEffect(() => {
    // scroll to top whenever a new section is selected / left
    const layout = document.querySelector('#page-layout')
    if (layout) layout.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // scroll to top of div when a section is selected
  useEffect(() => {
    if (selectedSection !== '') {
      const page = document.querySelector('#EPubPage')
      if (page)
        page.scrollIntoView({
          // smooth animation on scroll
          behavior: 'smooth',
          block: 'start',
          inline: 'start'
        })
    }
  }, [selectedSection]) // called again when selectedSection is changed

  return (
    <div id="EPubPage">
      {selectedSection === '' ? (
        <>
          <Slideshow height={isMobile ? '530px' : '450px'} width="100%" isMobile={isMobile}>
            {featuredEpubs.map((epub) => (
              <div
                className="
                  relative flex size-full items-center justify-center
                  bg-brand-dark-purple text-white
                  lg:items-stretch lg:justify-start
                "
                key={epub.id}
              >
                <div
                  className="
                    absolute top-0 left-0 z-10 block h-fit bg-brand-dark-purple
                    p-2.5 text-left font-heading
                    max-md:bg-brand-dark-purple/90 max-md:p-5
                    max-sm:mx-auto max-sm:mt-10 max-sm:h-108 max-sm:w-52
                    md:w-72
                    lg:m-8 lg:mt-8 lg:ml-40 lg:w-80
                  "
                >
                  <h1
                    className="
                      text-4xl/tight font-bold
                      max-sm:text-lg/relaxed
                    "
                  >
                    {epub.data.title}
                  </h1>
                  <h2
                    className="
                      text-lg/relaxed font-bold
                      max-md:hidden
                    "
                  >
                    {epub.data.author}
                  </h2>
                  <p
                    className="
                      font-body text-base/relaxed font-normal
                      max-sm:leading-normal
                    "
                  >
                    {epub.data.description}
                  </p>
                  <button
                    type="button"
                    className="
                      mt-4 h-14 w-48 cursor-pointer rounded-full border-none
                      bg-brand-orange text-center font-body text-xl/relaxed
                      text-white
                      max-sm:h-9 max-sm:w-36 max-sm:text-sm
                    "
                    onClick={() => {
                      globalThis.location.href = epub.data.pdfLink
                    }}
                  >
                    Read More
                  </button>
                </div>
                <img
                  className="
                    absolute top-0 right-0 m-0 size-full max-w-3xl
                    bg-brand-dark-purple object-cover p-0
                  "
                  src={epub.data.optimizedImage || epub.data.imageLink}
                  alt=""
                />
              </div>
            ))}
          </Slideshow>
          {/* Render a new publications section for each section in data, pass in each card */}
          <div className={isMobile ? 'm-0' : 'mt-14 mb-24'}>
            {sections.map((section) => (
              <EPubSection
                key={section.section_title}
                publication_section={section}
                setSelectedSection={setSelectedSection}
                isMobile={isMobile}
              />
            ))}
          </div>
        </>
      ) : (
        renderSelectedSection(
          sections.find((e) => e.section_title === selectedSection),
          setSelectedSection,
          isMobile
        )
      )}
    </div>
  )
}
