/**
 * renders the preview publications for a given section. This includes
 * up to 5 elements, and in mobile view includes arrows to iterate through
 * the publications.
 *
 * @Author PatrickBrown1
 */
import React, { useState } from 'react'
import EPubCard from './EPubCard'
import '../../css/EPubSection.css'
import LeftArrowBlack from '../../media/left-arrow-black.svg'
import RightArrowBlack from '../../media/right-arrow-black.svg'

// Renders the mobile version of a given EPub section, which includes left/right arrows
const EPubSectionMobile = (
  publication_section,
  setSelectedSection,
  isMobile,
  currentIndex,
  setCurrentIndex
) => {
  const currentPub = publication_section.section_list[currentIndex]
  return (
    <div className="EPubSection--mobile">
      <div className="EPubSection_header--mobile">
        <h1 className="EPubSection_header_title--mobile">{publication_section.section_title}</h1>
        <button
          type="button"
          className="EPubSection_header_seeAll--mobile"
          onClick={() => {
            setSelectedSection(publication_section.section_title)
          }}
        >
          All <span>({publication_section.section_list.length})</span> &gt;
        </button>
      </div>
      <div className="EPubSection_body--mobile">
        {currentIndex > 0 ? (
          <button
            type="button"
            className="EPubSection_body_scrollbutton--mobile"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <img src={LeftArrowBlack.src} alt="left arrow" />
          </button>
        ) : (
          <span className="EPubSection_body_scrollbutton--mobile" />
        )}
        <EPubCard
          title={currentPub.data.title}
          author={currentPub.data.author}
          image_url={currentPub.data.imageLink}
          redirect_link={currentPub.data.pdfLink}
          isMobile={isMobile}
        />
        {currentIndex < publication_section.section_list.length - 1 ? (
          <button
            type="button"
            className="EPubSection_body_scrollbutton--mobile"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <img src={RightArrowBlack.src} alt="right arrow" />
          </button>
        ) : (
          <span className="EPubSection_body_scrollbutton--mobile" />
        )}
        <div className="EPubSection_orangebar--mobile" />
      </div>
    </div>
  )
}

// desktop render
const EPubSectionDesktop = (publication_section, setSelectedSection, isMobile) => (
  <div className="EPubSection">
    <div className="EPubSection_header">
      <h1 className="EPubSection_header_title">{publication_section.section_title}</h1>
      <button
        type="button"
        className="EPubSection_header_seeAll"
        onClick={() => {
          setSelectedSection(publication_section.section_title)
        }}
      >
        All <span>({publication_section.section_list.length})</span> &gt;
      </button>
    </div>
    <div className="EPubSection_body">
      {publication_section.section_list.slice(0, 5).map((pub) => (
        <EPubCard
          key={pub.id}
          title={pub.data.title}
          author={pub.data.author}
          image_url={pub.data.imageLink}
          redirect_link={pub.data.pdfLink}
          isMobile={isMobile}
        />
      ))}
    </div>
    <div className="EPubSection_orangebar" />
  </div>
)
export default function EPubSection({ publication_section, setSelectedSection, isMobile }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <>
      {!isMobile
        ? EPubSectionDesktop(publication_section, setSelectedSection, false)
        : EPubSectionMobile(
            publication_section,
            setSelectedSection,
            true,
            currentIndex,
            setCurrentIndex
          )}
    </>
  )
}
