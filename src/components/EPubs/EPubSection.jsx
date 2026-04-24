/**
 * renders the preview publications for a given section. This includes
 * up to 5 elements, and in mobile view includes arrows to iterate through
 * the publications.
 *
 * @Author PatrickBrown1
 */
import { useState } from 'react'

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
    <div className="relative mx-[10vw] block px-0 py-11">
      <div className="relative top-0 left-0 flex h-16 w-full flex-col">
        <h1 className="w-full text-center font-heading text-2xl/tight font-bold">
          {publication_section.section_title}
        </h1>
        <button
          type="button"
          className="
            z-100 m-auto mb-4 w-fit cursor-pointer border-none bg-inherit p-0
            text-center font-body text-base/tight no-underline
            hover:underline
          "
          onClick={() => {
            setSelectedSection(publication_section.section_title)
          }}
        >
          All <span className="text-brand-orange">({publication_section.section_list.length})</span>{' '}
          &gt;
        </button>
      </div>
      <div
        className="
          relative mx-[-25px] flex flex-wrap items-start justify-center
          overflow-hidden text-center
        "
      >
        {currentIndex > 0 ? (
          <button
            type="button"
            className="
              relative bottom-48 m-0 inline-block h-8 max-w-8 min-w-8
              cursor-pointer border-none bg-inherit
            "
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <img src={LeftArrowBlack.src} alt="left arrow" />
          </button>
        ) : (
          <span className="
            relative bottom-48 m-0 inline-block h-8 max-w-8 min-w-8
          " />
        )}
        <EPubCard
          title={currentPub.data.title}
          author={currentPub.data.author}
          image_url={currentPub.data.imageLink}
          optimized_url={currentPub.data.optimizedImage}
          redirect_link={currentPub.data.pdfLink}
          isMobile={isMobile}
        />
        {currentIndex < publication_section.section_list.length - 1 ? (
          <button
            type="button"
            className="
              relative bottom-48 m-0 inline-block h-8 max-w-8 min-w-8
              cursor-pointer border-none bg-inherit
            "
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <img src={RightArrowBlack.src} alt="right arrow" />
          </button>
        ) : (
          <span className="
            relative bottom-48 m-0 inline-block h-8 max-w-8 min-w-8
          " />
        )}
        <div className="absolute bottom-0 h-px w-full bg-brand-orange" />
      </div>
    </div>
  )
}

// desktop render
const EPubSectionDesktop = (publication_section, setSelectedSection, isMobile) => (
  <div className="relative mx-[10vw] block px-0 py-11">
    <div className="relative top-0 left-0 block h-12 w-full">
      <h1 className="w-full text-center font-heading text-4xl/relaxed">
        {publication_section.section_title}
      </h1>
      <button
        type="button"
        className="
          absolute right-6 bottom-0 z-100 mb-4 w-fit cursor-pointer border-none
          bg-inherit p-0 font-body text-lg/relaxed no-underline
          hover:underline
        "
        onClick={() => {
          setSelectedSection(publication_section.section_title)
        }}
      >
        All <span className="text-brand-orange">({publication_section.section_list.length})</span>{' '}
        &gt;
      </button>
    </div>
    <div
      className="
        relative mx-[-25px] flex flex-wrap items-start justify-center
        text-center
      "
    >
      {publication_section.section_list.slice(0, 5).map((pub) => (
        <EPubCard
          key={pub.id}
          title={pub.data.title}
          author={pub.data.author}
          image_url={pub.data.imageLink}
          optimized_url={pub.data.optimizedImage}
          redirect_link={pub.data.pdfLink}
          isMobile={isMobile}
        />
      ))}
    </div>
    <div className="
      absolute bottom-0 box-border h-2 w-full bg-brand-orange px-6
    " />
  </div>
)
export default function EPubSection({ publication_section, setSelectedSection, isMobile }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <>
      {isMobile
        ? EPubSectionMobile(
            publication_section,
            setSelectedSection,
            true,
            currentIndex,
            setCurrentIndex
          )
        : EPubSectionDesktop(publication_section, setSelectedSection, false)}
    </>
  )
}
