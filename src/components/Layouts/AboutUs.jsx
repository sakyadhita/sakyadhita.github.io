/**
 * About page containing content on the mission, history, committees, and
 * founding of Sakyadhita. Also includes a stickied navbar that updates
 * as you scroll through the page.
 *
 * @summary     About page with mission, history, committee, and founding sections.
 * @author      Aaron Kirk
 */

import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import ResourcesHeader from '../ResourcesHeader'
import { cn } from '../../lib/utils'

import DownArrow from '../../media/down-arrow.svg'
import Link from '../../media/link.svg'

const CommitteeSelector = ({
  years,
  toggleDropdown,
  dropdownOn,
  clickDropdown,
  committeeIndex
}) => {
  if (years.length === 0) return null
  return (
    <div className="relative mb-8">
      <button
        type="button"
        className="relative h-10 w-[175px] bg-white border-2 border-black rounded-full flex items-center justify-between px-4 z-30 cursor-pointer"
        onClick={() => toggleDropdown()}
      >
        <span className="font-body font-bold">{years[committeeIndex]}</span>
        <img src={DownArrow.src} alt="dropdown arrow" className="h-[9px]" />
      </button>
      {dropdownOn && (
        <div className="absolute top-10 left-[17.5px] w-[140px] flex flex-col items-center bg-white border-2 border-gray-400 z-20 shadow-lg">
          {years.map((year, index) => (
            <button
              type="button"
              className="w-full py-2.5 px-0 border-none bg-white hover:bg-gray-200 transition-colors cursor-pointer font-body"
              onClick={() => clickDropdown(year, index)}
              key={index}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const CommitteeProfiles = ({ committees, year }) => {
  if (committees.length === 0)
    return (
      <p className="text-center font-body text-[1.125em] text-gray-500 italic">
        No Committees to Show
      </p>
    )
  const committee = committees.filter((x) => x.data.startYear === parseInt(year)).reverse()
  if (committee === undefined) return null
  return (
    <div className="relative w-full max-w-4xl flex flex-row-reverse flex-wrap-reverse justify-evenly gap-y-12">
      {committee.map((member) => (
        <div
          className="relative w-full md:w-80 mx-5 flex flex-col items-center md:items-start"
          key={member.id}
        >
          <img
            className="h-64 w-64 object-cover rounded-full mb-4 mt-20 border-[15px] border-[#f7f7f7]"
            src={member.data.imageLink}
            alt="Exec Headshot"
          />
          <h2 className="my-1 font-heading text-3xl font-bold text-center md:text-left">
            {member.data.name}
          </h2>
          <div className="relative flex flex-row justify-center md:justify-start items-center">
            {member.data.redirectLink && (
              <a
                href={member.data.redirectLink}
                target={member.data.openInSameTab ? '' : '_blank'}
                rel="noreferrer"
                className="mr-2"
              >
                <img
                  className="h-[1.2em] hover:brightness-75 transition-all"
                  src={Link.src}
                  alt="Profile Link"
                  style={{
                    filter:
                      'invert(54%) sepia(100%) saturate(466%) hue-rotate(334deg) brightness(101%) contrast(84%)'
                  }}
                />
              </a>
            )}
            <h3 className="my-1 font-heading text-[1.5em] font-normal text-center md:text-left">
              {member.data.position}
            </h3>
          </div>
          <div className="prose prose-sm max-w-none font-body py-5 px-2.5">
            <Markdown>{member.body}</Markdown>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AboutUs({ frontmatter, committees, sections, children }) {
  // Keeps track of the current location for the sticky navbar
  const [scrollLocation, setScrollLocation] = useState('mission')
  // Toggles the dropdown menu for different executive committees
  const [dropdownOn, setDropdownOn] = useState(false)
  // Currently viewed year's executive committee
  const [isMobile, setIsMobile] = useState(false)
  const introSection = React.createRef()
  const [year, setYear] = useState(
    committees[0].data.startYear.toString() + '-' + committees[0].data.endYear.toString()
  )
  const [committeeIndex, setCommitteeIndex] = useState(0)

  const years = committees
    .map((c) => c.data.startYear.toString() + '-' + c.data.endYear.toString())
    .filter((c, i, a) => a.indexOf(c) === i)

  // Effect to update the sticky nav on scroll
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    const scrollHandler = () => {
      for (let i = 0; i < sections.length; i++) {
        const idString = sections[i].data.title
          .replace(/\s+/g, '-')
          .replace(/:/g, '')
          .replace(/[^a-z0-9]/gi, '')
          .toLowerCase()
        const selected = document.querySelector(`#${idString}`)
        if (selected) {
          const rect = selected.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setScrollLocation(sections[i].data.title)
          }
        }
      }
    }

    const scrollContainer = document.querySelector('#page-layout')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', scrollHandler)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [sections])

  function computeNavUnderline(location) {
    if (
      location ===
      scrollLocation
        .replace(/\s+/g, '-')
        .replace(/:/g, '')
        .replace(/[^a-z0-9-]/gi, '')
        .toLowerCase()
    )
      return 'text-brand-orange border-b-2 border-brand-orange'
    return 'border-b-2 border-transparent'
  }

  // Scroll to the first section when clicking arrow button on resource header
  const scrollToSection = () => {
    if (introSection.current) {
      introSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  function toggleDropdown() {
    setDropdownOn(!dropdownOn)
  }

  function clickDropdown(newYear, index) {
    setYear(newYear)
    setCommitteeIndex(index)
    toggleDropdown()
  }

  function makeIdURLFriendly(idString) {
    return idString
      .replace(/\s+/g, '-')
      .replace(/:/g, '')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase()
  }

  return (
    <div className="relative w-full">
      {isMobile || (typeof window !== 'undefined' && window.innerHeight <= 500) ? (
        <ResourcesHeader
          image={frontmatter.image}
          title={frontmatter.title}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
          arrowClickCallback={scrollToSection}
        />
      ) : (
        <ResourcesHeader
          image={frontmatter.image}
          title={frontmatter.title}
          text={frontmatter.description}
          height="max(75vh, 400px)"
          width="100%"
          arrowClickCallback={scrollToSection}
        />
      )}

      <div className="w-full flex flex-col md:flex-row">
        {/* Sticky Nav */}
        {!isMobile && (
          <aside className="hidden md:block w-[250px] shrink-0 h-fit sticky top-32 mt-24 ml-8 lg:ml-16">
            <nav className="relative flex border-r border-gray-300 pr-8">
              <ul className="flex flex-col list-none p-0 m-0 space-y-4">
                {sections.map((section) => (
                  <li key={section.id} className="py-2">
                    <a
                      href={`#${makeIdURLFriendly(section.data.title)}`}
                      className={cn(
                        'font-body text-lg transition-all hover:text-brand-orange no-underline hover:no-underline pb-1',
                        computeNavUnderline(makeIdURLFriendly(section.data.title))
                      )}
                    >
                      {section.data.title}
                    </a>
                  </li>
                ))}
                <li className="py-2">
                  <a
                    href="#exec"
                    className={cn(
                      'font-body text-lg transition-all hover:text-brand-orange no-underline hover:no-underline pb-1',
                      scrollLocation === 'Executive Committee'
                        ? 'text-brand-orange border-b-2 border-brand-orange'
                        : 'border-b-2 border-transparent'
                    )}
                  >
                    Executive Committee
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        {/* Contents of page */}
        <div className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 font-body">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:mb-8 prose-img:mt-12 prose-img:w-full prose-img:rounded-lg prose-img:shadow-lg">
            {children}
          </div>

          {/* Mini Divider */}
          <hr className="w-1/2 md:w-[700px] h-2 bg-brand-orange border-none mx-auto my-24 hidden md:block" />

          {/* Executive Committee Section */}
          <div className="flex flex-col items-center mt-12 md:mt-0" id="exec">
            <h1 className="font-heading font-bold text-3xl md:text-5xl mb-8">
              Executive Committee
            </h1>

            <CommitteeSelector
              years={years}
              toggleDropdown={toggleDropdown}
              dropdownOn={dropdownOn}
              clickDropdown={clickDropdown}
              committeeIndex={committeeIndex}
            />
            <CommitteeProfiles committees={committees} year={year} />
          </div>
        </div>
      </div>
    </div>
  )
}
