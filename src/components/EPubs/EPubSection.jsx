/**
 * renders the preview publications for a given section. This includes
 * up to 5 elements, and in mobile view includes arrows to iterate through
 * the publications.
 *
 * @Author PatrickBrown1
 */
import React, { useState } from 'react'
import EPubCard from './EPubCard'
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
    <div className="block relative py-[44px] px-0 mx-[10vw]">
      <div className="flex flex-col relative top-0 left-0 w-full h-[64px]">
        <h1 className="w-full font-heading text-[24px] font-bold leading-[31px] text-center">
          {publication_section.section_title}
        </h1>
        <button
          type="button"
          className="w-fit z-100 p-0 m-auto mb-[16px] border-none bg-inherit no-underline font-body text-[16px] leading-[16px] text-center hover:underline cursor-pointer"
          onClick={() => {
            setSelectedSection(publication_section.section_title)
          }}
        >
          All <span className="text-brand-orange">({publication_section.section_list.length})</span> &gt;
        </button>
      </div>
      <div className="flex flex-wrap items-start justify-center relative text-center mx-[-25px] overflow-hidden">
        {currentIndex > 0 ? (
          <button
            type="button"
            className="inline-block relative min-w-[30px] max-w-[30px] h-[30px] m-0 bottom-[200px] border-none bg-inherit cursor-pointer"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <img src={LeftArrowBlack.src} alt="left arrow" />
          </button>
        ) : (
          <span className="inline-block relative min-w-[30px] max-w-[30px] h-[30px] m-0 bottom-[200px]" />
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
            className="inline-block relative min-w-[30px] max-w-[30px] h-[30px] m-0 bottom-[200px] border-none bg-inherit cursor-pointer"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <img src={RightArrowBlack.src} alt="right arrow" />
          </button>
        ) : (
          <span className="inline-block relative min-w-[30px] max-w-[30px] h-[30px] m-0 bottom-[200px]" />
        )}
        <div className="absolute bottom-0 h-[1px] w-full bg-brand-orange" />
      </div>
    </div>
  )
}

// desktop render
const EPubSectionDesktop = (publication_section, setSelectedSection, isMobile) => (
  <div className="block relative py-[44px] px-0 mx-[10vw]">
    <div className="block relative top-0 left-0 w-full h-[50px]">
      <h1 className="w-full font-heading text-[36px] leading-[45px] text-center">
        {publication_section.section_title}
      </h1>
      <button
        type="button"
        className="absolute right-[25px] bottom-0 w-fit z-100 p-0 mb-[16px] border-none bg-inherit font-body text-[18px] leading-[25px] no-underline hover:underline cursor-pointer"
        onClick={() => {
          setSelectedSection(publication_section.section_title)
        }}
      >
        All <span className="text-brand-orange">({publication_section.section_list.length})</span> &gt;
      </button>
    </div>
    <div className="flex flex-wrap justify-center items-start relative text-center mx-[-25px]">
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
    <div className="absolute bottom-0 h-[8px] w-full px-[25px] box-border bg-brand-orange" />
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
