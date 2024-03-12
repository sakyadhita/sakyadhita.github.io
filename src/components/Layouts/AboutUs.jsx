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
import '../../css/About.css'
import '../../css/animations.css'

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
    <div className="dropdown">
      <button type="button" id="dropdown-button" onClick={() => toggleDropdown()}>
        <span>{years[committeeIndex]}</span>
        <img src={DownArrow.src} alt="dropdown arrow" />
      </button>
      <div id="dropdown" style={dropdownOn ? null : { display: 'none' }}>
        {years.map((year, index) => (
          <button type="button" onClick={() => clickDropdown(year, index)} key={index}>
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}

const CommitteeProfiles = ({ committees, year, computeProfileDisplay }) => {
  if (committees.length === 0) return <p id="committee-err">No Committees to Show</p>
  const committee = committees.filter((x) => x.data.startYear === parseInt(year)).reverse()
  if (committee === undefined) return null
  return (
    <div className="profiles" style={computeProfileDisplay(year)}>
      {committee
        // .slice(0)
        // .reverse()
        .map((member) => (
          <div className="profile" key={member.id}>
            <img className="headshot" src={member.data.imageLink} alt="Exec Headshot" />
            <h2>{member.data.name}</h2>
            <div className="position">
              <div className="link-holder">
                <a
                  href={member.data.redirectLink}
                  target={member.data.openInSameTab ? '' : '_blank'}
                  rel="noreferrer"
                >
                  {member.data.redirectLink === null ? null : (
                    <img className="profile-link" src={Link.src} alt="Profile Link" />
                  )}
                </a>
              </div>
              <h3>{member.data.position}</h3>
            </div>
            <Markdown>{member.body}</Markdown>
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
      if (window.innerWidth <= 600) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    document.querySelector('#page-layout').addEventListener('scroll', () => {
      for (let i = 0; i < sections.length; i++) {
        const idString = sections[i].data.title
          .replace(/\s+/g, '-')
          .replace(/:/g, '')
          .replace(/[^a-z0-9]/gi, '')
          .toLowerCase()
        const selected = document.querySelector(`#${idString}`)

        if (selected <= 1) setScrollLocation(sections[i].data.title)
      }
    })
  }, [sections])

  /**
   * Compares the desired location to the current scrollLocation to change
   * selected location on sticky nav
   *
   * @param {String} location - desired location to compare against
   * @returns {String} - underline class if desired location matches current
   */
  function computeNavUnderline(location) {
    if (location === scrollLocation) return 'orange-underline'
    return ''
  }

  // Scroll to the first section when clicking arrow button on resource header
  const scrollToSection = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (introSection.current) {
      introSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  /**
   * Toggles the dropdown state
   */
  function toggleDropdown() {
    setDropdownOn(!dropdownOn)
  }

  /**
   * Changes the currently viewed year for the committee section
   *
   * @param {String} newYear - desired year to view
   */
  function clickDropdown(newYear, index) {
    setYear(newYear)
    setCommitteeIndex(index)
    toggleDropdown()
  }

  /**
   * Choose whether or not to render a profile based on the current year
   *
   * @param {String} newYear - the year from which the profile in question belongs
   * @returns {?} - object containing display: none style if not the current year
   */
  function computeProfileDisplay(newYear) {
    if (newYear === year) return null
    return { display: 'none' }
  }

  function makeIdURLFriendly(idString) {
    return idString
      .replace(/\s+/g, '-')
      .replace(/:/g, '')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase()
  }

  return (
    <div className="page">
      {isMobile || window.innerHeight <= 500 ? (
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

      <div class="about-us-container">
        {/* Sticky Nav */}
        <div className="slider-wrapper">
            <div className="slider">
              <ul className="slider-nav">
                {sections.map((section) => (
                  <li
                    className={computeNavUnderline(makeIdURLFriendly(section.data.title))}
                    key={section.id}
                  >
                    <a href={`#${makeIdURLFriendly(section.data.title)}`}> {section.data.title} </a>
                  </li>
                ))}
                <li className={computeNavUnderline('exec')}>
                  <a href="#exec"> Executive Committee </a>
                </li>
              </ul>
              <div className="vbar" />
            </div>
        </div>

        {/* Contents of page */}
        <div className="contents">
            {children}

            <div className="divider" />

            {/* Executive Committee Section */}
            <div className="section" id="exec">
              {/* Anchor for navigation */}
              <div className="scroll" id="committee" />

              <h1>Executive Committee</h1>

              {/* Committee Profiles */}
              {/* Each year has a different set of profiles */}
              {/* Profiles will have to be put in reverse order (President goes last) */}

              <CommitteeSelector
                years={years}
                toggleDropdown={toggleDropdown}
                dropdownOn={dropdownOn}
                clickDropdown={clickDropdown}
                committeeIndex={committeeIndex}
              />
              <CommitteeProfiles
                committees={committees}
                year={year}
                computeProfileDisplay={computeProfileDisplay}
              />
            </div>
        </div>
      </div>
    </div>
  )
}
