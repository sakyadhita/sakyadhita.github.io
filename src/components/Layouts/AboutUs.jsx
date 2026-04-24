/**
 * About page containing content on the mission, history, committees, and
 * founding of Sakyadhita. Also includes a stickied navbar that updates
 * as you scroll through the page.
 *
 * @summary     About page with mission, history, committee, and founding sections.
 * @author      Aaron Kirk
 */

import React, { useState, useEffect } from 'react'

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
        className="
          relative z-30 flex h-10 w-44 cursor-pointer items-center
          justify-between rounded-full border-2 border-black bg-white px-4
        "
        onClick={() => toggleDropdown()}
      >
        <span className="font-body font-bold">{years[committeeIndex]}</span>
        <img src={DownArrow.src} alt="dropdown arrow" className="h-2" />
      </button>
      {dropdownOn && (
        <div
          className="
            absolute top-10 left-[17.5px] z-20 flex w-36 flex-col items-center
            border-2 border-gray-400 bg-white shadow-lg
          "
        >
          {years.map((year, index) => (
            <button
              type="button"
              className="
                w-full cursor-pointer border-none bg-white px-0 py-2.5 font-body
                transition-colors
                hover:bg-gray-200
              "
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
  const committee = committees.filter((x) => x.data.startYear === Number.parseInt(year)).reverse()
  if (committee === undefined) return null
  return (
    <div
      className="
        relative flex w-full max-w-4xl flex-row-reverse flex-wrap-reverse
        justify-evenly gap-y-12
      "
    >
      {committee.map((member) => (
        <div
          className="
            relative mx-5 flex w-full flex-col items-center
            md:w-80 md:items-start
          "
          key={member.id}
        >
          <img
            className="
              mt-20 mb-4 size-64 rounded-full border-15 border-[#f7f7f7]
              object-cover
            "
            src={member.data.optimizedImage || member.data.imageLink}
            alt="Exec Headshot"
          />
          <h2
            className="
              my-1 text-center font-heading text-3xl font-bold
              md:text-left
            "
          >
            {member.data.name}
          </h2>
          <div
            className="
              relative flex flex-row items-center justify-center
              md:justify-start
            "
          >
            {member.data.redirectLink && (
              <a
                href={member.data.redirectLink}
                target={member.data.openInSameTab ? '' : '_blank'}
                rel="noreferrer"
                className="mr-2"
              >
                <img
                  className="
                    h-[1.2em] transition-all
                    hover:brightness-75
                  "
                  src={Link.src}
                  alt="Profile Link"
                  style={{
                    filter:
                      'invert(54%) sepia(100%) saturate(466%) hue-rotate(334deg) brightness(101%) contrast(84%)'
                  }}
                />
              </a>
            )}
            <h3
              className="
                my-1 text-center font-heading text-[1.5em] font-normal
                md:text-left
              "
            >
              {member.data.position}
            </h3>
          </div>
          <div
            className="prose prose-sm max-w-none px-2.5 py-5 font-body"
            dangerouslySetInnerHTML={{ __html: member.data.htmlBody }}
          />
        </div>
      ))}
    </div>
  )
}

export default function AboutUs({ committees, sections, children }) {
  // Keeps track of the current location for the sticky navbar
  const [scrollLocation, setScrollLocation] = useState('mission')
  // Toggles the dropdown menu for different executive committees
  const [dropdownOn, setDropdownOn] = useState(false)
  // Currently viewed year's executive committee
  const [year, setYear] = useState(
    committees[0].data.startYear.toString() + '-' + committees[0].data.endYear.toString()
  )
  const [committeeIndex, setCommitteeIndex] = useState(0)

  const years = committees
    .map((c) => c.data.startYear.toString() + '-' + c.data.endYear.toString())
    .filter((c, i, a) => a.indexOf(c) === i)

  // Effect to update the sticky nav on scroll
  useEffect(() => {
    const scrollHandler = () => {
      for (const section of sections) {
        const idString = makeIdURLFriendly(section.data.title)
        const selected = document.querySelector(`#${idString}`)
        if (selected) {
          const rect = selected.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setScrollLocation(section.data.title)
          }
        }
      }
    }

    const scrollContainer = document.querySelector('#page-layout')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', scrollHandler)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [sections])

  function computeNavUnderline(location) {
    if (
      location ===
      scrollLocation
        .replaceAll(/\s+/g, '-')
        .replaceAll(':', '')
        .replaceAll(/[^a-z0-9-]/gi, '')
        .toLowerCase()
    )
      return 'text-brand-orange border-b-2 border-brand-orange'
    return 'border-b-2 border-transparent'
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
      .replaceAll(/\s+/g, '-')
      .replaceAll(':', '')
      .replaceAll(/[^a-z0-9-]/gi, '')
      .toLowerCase()
  }

  return (
    <div className="relative w-full">
      <div
        className="
          flex w-full flex-col
          md:flex-row
        "
      >
        {/* Sticky Nav */}
        <aside
          className="
            sticky top-32 mt-24 ml-8 hidden h-fit w-64 shrink-0
            md:block
            lg:ml-16
          "
        >
          <nav className="relative flex border-r border-gray-300 pr-8">
            <ul className="m-0 flex list-none flex-col space-y-4 p-0">
              {sections.map((section) => (
                <li key={section.id} className="py-2">
                  <a
                    href={`#${makeIdURLFriendly(section.data.title)}`}
                    className={cn(
                      `
                        pb-1 font-body text-lg no-underline transition-all
                        hover:text-brand-orange hover:no-underline
                      `,
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
                    `
                      pb-1 font-body text-lg no-underline transition-all
                      hover:text-brand-orange hover:no-underline
                    `,
                    scrollLocation === 'Executive Committee'
                      ? 'border-b-2 border-brand-orange text-brand-orange'
                      : 'border-b-2 border-transparent'
                  )}
                >
                  Executive Committee
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Contents of page */}
        <div
          className="
            mx-auto w-full max-w-4xl flex-1 px-6 py-12 font-body
            md:px-12 md:py-24
          "
        >
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:mb-8 prose-headings:font-heading
              prose-headings:font-bold
              prose-img:mt-12 prose-img:w-full prose-img:rounded-lg
              prose-img:shadow-lg
            "
          >
            {children}
          </div>

          {/* Mini Divider */}
          <hr
            className="
              mx-auto my-24 hidden h-2 w-1/2 border-none bg-brand-orange
              md:block md:w-3/4
            "
          />

          {/* Executive Committee Section */}
          <div
            className="
              mt-12 flex flex-col items-center
              md:mt-0
            "
            id="exec"
          >
            <h1
              className="
                mb-8 font-heading text-3xl font-bold
                md:text-5xl
              "
            >
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
