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
import '../../css/EPublications.css'

// renders selected section from state, including each card in that page,
// and a button to go back to the main EPublications screen
const renderSelectedSection = (selectedSection, setSelectedSection, isMobile) => {
  if (!isMobile) {
    // render desktop version
    return (
      <div className="EPub_SelectedSection">
        <div className="EPub_SelectedSection_header">
          <h1 className="EPub_SelectedSection_header_title">{selectedSection.section_title}</h1>
          <button
            type="button"
            className="EPub_SelectedSection_header_back"
            onClick={() => {
              setSelectedSection('')
            }}
          >
            &lt; Back
          </button>
          <p className="EPub_SelectedSection_header_seeAll">
            All <span>({selectedSection.section_list.length})</span>
          </p>
        </div>
        <div className="EPub_SelectedSection_body">
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
    <div className="EPub_SelectedSection--mobile">
      <div className="EPub_SelectedSection_header--mobile">
        <h1 className="EPub_SelectedSection_header_title--mobile">
          {selectedSection.section_title}
        </h1>
        <button
          type="button"
          className="EPub_SelectedSection_header_back--mobile"
          onClick={() => {
            setSelectedSection('')
          }}
        >
          &lt; Back to latest
        </button>
      </div>
      <div className="EPub_SelectedSection_body--mobile">
        {
          // render each card based on data passed in
          selectedSection.section_list.map((pub) => (
            <div className="EPub_SelectedSection_body_cardcontainer">
              <EPubCard
                key={pub.data.id}
                title={pub.data.title}
                author={pub.data.author}
                image_url={pub.data.imageLink}
                redirect_link={pub.data.pdfLink}
                isMobile={isMobile}
              />
              <button
                type="button"
                onClick={() => window.open(pub.data.pdfLink, '_blank', 'norefferer')}
                className="EPub_SelectedSection_body_readbutton--mobile"
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
    document.getElementById('page-layout').scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // scroll to top of div when a section is selected
  useEffect(() => {
    if (selectedSection !== '')
      document.getElementById('EPubPage').scrollIntoView({
        // smooth animation on scroll
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      })
  }, [selectedSection]) // called again when selectedSection is changed

  return (
    <div id="EPubPage">
      {selectedSection === '' ? (
        <>
          <Slideshow height={isMobile ? '530px' : '450px'} width="100%" isMobile={isMobile}>
            {featuredEpubs.map((epub) => (
              <div className="EPub_Slide" key={epub.id}>
                <div className="EPub_Slide_body">
                  <h1>{epub.data.title}</h1>
                  <h2>{epub.data.author}</h2>
                  <p>{epub.data.description}</p>
                  <button
                    type="button"
                    className="EPub_Slide_body_readMoreButton"
                    onClick={() => {
                      window.location.href = epub.data.pdfLink
                    }}
                  >
                    Read More
                  </button>
                </div>
                <img className="EPub_Slide_image" src={epub.data.imageLink} alt="" />
              </div>
            ))}
          </Slideshow>
          {/* Render a new publications section for each section in data, pass in each card */}
          <div className={!isMobile ? 'EPub_body' : 'EPub_body--mobile'}>
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
