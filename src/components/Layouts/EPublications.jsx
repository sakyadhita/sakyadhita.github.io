/**
 * renders the EPublication page that includes sections of publications
 * that can be expanded to show all publications in that section. This page
 * currently uses dummy data to display the publication list.
 *
 * Calls EPubCard.js, and EPubSection.js
 *
 * @Author PatrickBrown1, Navid Boloorian
 */

import React, { useState, useEffect } from 'react'
import Slideshow from '../Slideshow'
import EPubSection from '../EPubs/EPubSection'
import EPubCard from '../EPubs/EPubCard'

// renders selected section from state, including each card in that page,
// and a button to go back to the main EPublications screen
const renderSelectedSection = (selectedSection, setSelectedSection, isMobile) => {
  if (!isMobile) {
    // render desktop version
    return (
      <div className="block relative mt-32 mx-[10vw] mb-24">
        <div className="block relative top-0 left-0 w-full h-12">
          <h1 className="w-full font-heading text-4xl leading-relaxed text-center">
            {selectedSection.section_title}
          </h1>
          <button
            type="button"
            className="absolute left-6 bottom-0 w-fit z-100 p-0 mb-4 border-none bg-inherit font-body text-lg leading-relaxed no-underline hover:underline cursor-pointer"
            onClick={() => {
              setSelectedSection('')
            }}
          >
            &lt; Back
          </button>
          <p className="z-100 absolute right-6 bottom-0 w-fit font-body text-lg leading-relaxed no-underline">
            All <span className="text-brand-orange">({selectedSection.section_list.length})</span>
          </p>
        </div>
        <div className="flex items-start justify-center flex-wrap relative text-center mx-[-25px]">
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
    <div className="block relative my-12 mx-[10vw]">
      <div className="block relative -top-12 -ml-[10vw] pt-5 w-[calc(100%+20vw)] h-24 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
        <h1 className="w-full font-heading text-2xl font-bold leading-tight text-center">
          {selectedSection.section_title}
        </h1>
        <button
          type="button"
          className="block relative w-fit p-0 mx-auto mt-3 mb-5 border-none bg-inherit font-body text-base leading-tight text-center hover:underline cursor-pointer"
          onClick={() => {
            setSelectedSection('')
          }}
        >
          &lt; Back to latest
        </button>
      </div>
      <div className="flex items-start justify-center flex-wrap relative text-center mx-[-25px]">
        {
          // render each card based on data passed in
          selectedSection.section_list.map((pub) => (
            <div key={pub.data.id} className="flex flex-col items-center justify-start">
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
                className="h-9 w-40 rounded-full bg-brand-orange border-none text-white mb-5 cursor-pointer"
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
    const layout = document.getElementById('page-layout')
    if (layout) layout.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // scroll to top of div when a section is selected
  useEffect(() => {
    if (selectedSection !== '') {
      const page = document.getElementById('EPubPage')
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
                className="relative flex w-full h-full bg-brand-dark-purple text-white items-center justify-center lg:items-stretch lg:justify-start"
                key={epub.id}
              >
                <div className="absolute top-0 left-0 z-10 bg-brand-dark-purple lg:m-8 lg:ml-40 lg:mt-8 p-2.5 lg:w-[350px] md:w-72 max-sm:w-52 max-sm:h-[430px] max-sm:mx-auto max-sm:mt-10 block font-heading text-left h-fit max-md:bg-brand-dark-purple/90 max-md:p-5">
                  <h1 className="text-4xl font-bold leading-tight max-sm:text-lg max-sm:leading-relaxed">
                    {epub.data.title}
                  </h1>
                  <h2 className="text-lg font-bold leading-relaxed max-md:hidden">
                    {epub.data.author}
                  </h2>
                  <p className="font-body text-base font-normal leading-relaxed max-sm:leading-normal">
                    {epub.data.description}
                  </p>
                  <button
                    type="button"
                    className="font-body text-xl leading-relaxed text-center text-white bg-brand-orange rounded-full w-48 h-14 border-none mt-4 max-sm:w-36 max-sm:h-9 max-sm:text-sm cursor-pointer"
                    onClick={() => {
                      window.location.href = epub.data.pdfLink
                    }}
                  >
                    Read More
                  </button>
                </div>
                <img
                  className="absolute top-0 right-0 w-[700px] max-md:w-full m-0 p-0 bg-brand-dark-purple object-cover h-full"
                  src={epub.data.optimizedImage || epub.data.imageLink}
                  alt=""
                />
              </div>
            ))}
          </Slideshow>
          {/* Render a new publications section for each section in data, pass in each card */}
          <div className={!isMobile ? 'mt-14 mb-24' : 'm-0'}>
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
          sections.filter((e) => e.section_title === selectedSection)[0],
          setSelectedSection,
          isMobile
        )
      )}
    </div>
  )
}
