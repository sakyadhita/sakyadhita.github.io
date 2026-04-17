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
      <div className="block relative m-[130px_10vw]">
        <div className="block relative top-0 left-0 w-full h-[50px]">
          <h1 className="w-full font-heading text-[36px] leading-[45px] text-center">
            {selectedSection.section_title}
          </h1>
          <button
            type="button"
            className="absolute left-[25px] bottom-0 w-fit z-100 p-0 mb-[16px] border-none bg-inherit font-body text-[18px] leading-[25px] no-underline hover:underline cursor-pointer"
            onClick={() => {
              setSelectedSection('')
            }}
          >
            &lt; Back
          </button>
          <p className="z-100 absolute right-[25px] bottom-0 w-fit font-body text-[18px] leading-[25px] no-underline">
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
    <div className="block relative m-[50px_10vw]">
      <div className="block relative top-[-50px] left-[-10vw] pt-[20px] w-[calc(100%+20vw)] h-[88px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]">
        <h1 className="w-full font-heading text-[24px] font-bold leading-[31px] text-center">
          {selectedSection.section_title}
        </h1>
        <button
          type="button"
          className="block relative w-fit p-0 m-[11px_auto_20px_auto] border-none bg-inherit font-body text-[16px] leading-[16px] text-center hover:underline cursor-pointer"
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
                redirect_link={pub.data.pdfLink}
                isMobile={isMobile}
              />
              <button
                type="button"
                onClick={() => window.open(pub.data.pdfLink, '_blank', 'norefferer')}
                className="h-[37px] w-[158px] rounded-[40px] bg-brand-orange border-none text-white mb-[20px] cursor-pointer"
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
                <div className="absolute top-0 left-0 z-10 bg-brand-dark-purple lg:m-[30px_100px_0px_160px] p-[10px] lg:w-[350px] md:w-[300px] max-[600px]:w-[210px] max-[600px]:h-[430px] max-[600px]:m-[40px_auto] block font-heading text-left h-fit max-[750px]:bg-brand-dark-purple/85 max-[750px]:p-5">
                  <h1 className="text-[36px] font-bold leading-[45px] max-[750px]:text-[18px] max-[750px]:leading-[30px]">
                    {epub.data.title}
                  </h1>
                  <h2 className="text-[18px] font-bold leading-[31px] max-[750px]:hidden">
                    {epub.data.author}
                  </h2>
                  <p className="font-body text-[16px] font-normal leading-[27px] max-[750px]:leading-[21px]">
                    {epub.data.description}
                  </p>
                  <button
                    type="button"
                    className="font-body text-[20px] leading-[27px] text-center text-white bg-brand-orange rounded-[40px] w-[200px] h-[55px] border-none mt-4 max-[750px]:w-[150px] max-[750px]:h-[35px] max-[750px]:text-[14px] cursor-pointer"
                    onClick={() => {
                      window.location.href = epub.data.pdfLink
                    }}
                  >
                    Read More
                  </button>
                </div>
                <img
                  className="absolute top-0 right-0 w-[700px] max-[750px]:w-full m-0 p-0 bg-brand-dark-purple object-cover h-full"
                  src={epub.data.imageLink}
                  alt=""
                />
              </div>
            ))}
          </Slideshow>
          {/* Render a new publications section for each section in data, pass in each card */}
          <div className={!isMobile ? 'm-[56px_0px_100px_0px]' : 'm-0'}>
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
