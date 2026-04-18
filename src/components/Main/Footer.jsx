/**
 * Renders the responsive Footer component for the general website. Footer is coded to display after end of all content,
 * but is not guranteed to be always at the bottom of the page for small content pages.
 *
 * This component has no dependencies, and works independently.
 *
 * @author Amrit Kaur Singh
 */
import React, { useEffect, useState } from 'react'
import { siFacebook, siYoutube, siPinterest, siRss, siGoodreads } from 'simple-icons'
import SimpleIcon from './SimpleIcon'
import Brand from './Brand'
import Logo from '../../media/logo.svg'
import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'

const FACEBOOK_LINK = 'https://www.facebook.com/sakyadhita.international'
const YOUTUBE_LINK = 'https://www.youtube.com/channel/UCLOIc4vqaqPKcjaRqmn6-yg/playlists'
const PINTEREST_LINK = 'https://www.pinterest.com/sakyadhita/'
const ABW_BLOG_LINK = 'http://awakeningbuddhistwomen.blogspot.com/'
const GOODREADS_LINK = 'https://www.goodreads.com/group/show/94269-women-in-buddhism'

export default function Footer() {
  const socialIconClasses = 'w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 transition-all shrink-0'

  const subitem = (text, redirect_link) => (
    <a
      href={redirect_link}
      className="text-xs md:text-sm text-[#cee5ec] hover:text-brand-orange transition-colors flex items-center mt-1"
    >
      <img src={Logo.src} alt="Logo" className="w-5 h-auto mr-2" />
      {text}
    </a>
  )

  const cclicense = (
    <div className="text-white text-center text-sm md:text-base mt-4 font-body">
      <img width={64} src="/by-nc-nd.png" alt="license" className="inline-block mb-2 md:mb-0" />
      <span className="block md:inline-block md:ml-2">
        Website is licensed under a
        <a
          target="_blank"
          rel="noreferrer"
          href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
          className="hover:text-brand-orange transition-colors mx-1"
        >
          Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License
        </a>
        .
      </span>
    </div>
  )

  const headingClasses =
    'font-heading font-bold text-lg md:text-2xl text-white capitalize hover:no-underline mb-2 block'

  return (
    <div className="relative mt-auto">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-[-1] w-full h-full bg-cover bg-[position:center,top] bg-no-repeat blur-[5px] rounded-md shadow-[inset_0_0_0_1000px_rgba(26,23,194,0.4)]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2996&q=80")'
        }}
      ></div>

      <div className="relative z-0 bg-brand-light-purple/90 w-full min-h-[550px] flex flex-col justify-center items-center px-6 md:px-20 py-10 md:py-16 overflow-hidden font-body">
        {/* Pages Links */}
        <section className="w-full flex flex-col md:flex-row justify-between flex-1 space-y-8 md:space-y-0">
          <div className="flex flex-col">
            <a href={SITE_PAGES.HOME} className={headingClasses}>
              Home
            </a>
            <div className="flex flex-col ml-1 md:ml-0">
              {subitem('Join Us', SITE_PAGES.JOIN_US)}
              {subitem('Volunteer', SITE_PAGES.VOLUNTEER)}
              {subitem('Donate', SITE_PAGES.DONATE)}
            </div>
          </div>

          <div className="flex flex-col text-left">
            <a href={SITE_PAGES.CONFERENCES} className={headingClasses}>
              Conferences
            </a>
            <div className="flex flex-col ml-1 md:ml-0">
              {subitem('2025 19th conference, (Sarawak, Malaysia)', '/conferences/19')}
              {subitem('2023 18th conference, (Seoul, Korea)', '/conferences/18')}
              {subitem('2021 17th conference, (online)', '/conferences/17')}
              {subitem('2019 16th conference, (Blue Mountains, Australia)', '/conferences/16')}
            </div>
          </div>

          <div className="flex flex-col">
            <a href={SITE_PAGES.RESOURCES_LANDING} className={headingClasses}>
              Resources
            </a>
            <div className="flex flex-col ml-1 md:ml-0">
              {subitem('Newsletters', SITE_PAGES.RESOURCES_NEWSLETTERS)}
              {subitem('Publications', SITE_PAGES.RESOURCES_EPUBS)}
              {subitem('Buddhist Culture', SITE_PAGES.RESOURCES_BUDDHIST_CULTURE)}
              {subitem('Ordination', SITE_PAGES.RESOURCES_ORDINATION_ISSUE)}
            </div>
          </div>

          <div>
            <a href={SITE_PAGES.ABOUT_US} className={headingClasses}>
              About
            </a>
          </div>

          <div>
            <a href={SITE_PAGES.CONTACT_US} className={headingClasses}>
              Contact
            </a>
          </div>
        </section>

        {/* Bottom Section: Social Media & Brand */}
        <section className="w-full flex flex-col md:flex-row justify-between items-center mt-12 space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start text-white">
            <span className="mb-4 text-lg md:text-xl font-bold">
              Check us out on these platforms!
            </span>
            <div className="flex flex-row space-x-6">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <SimpleIcon
                  icon={siFacebook}
                  className={cn(socialIconClasses, 'text-white group-hover:bg-[#3b5998] p-1')}
                />
              </a>
              <a
                href={YOUTUBE_LINK}
                target="_blank"
                rel="noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <SimpleIcon
                  icon={siYoutube}
                  className={cn(
                    socialIconClasses,
                    'text-white group-hover:bg-[#c4302b] rounded-xl p-1'
                  )}
                />
              </a>
              <a
                href={PINTEREST_LINK}
                target="_blank"
                rel="noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <SimpleIcon
                  icon={siPinterest}
                  className={cn(
                    socialIconClasses,
                    'text-white group-hover:bg-[#E60023] rounded-2xl p-2'
                  )}
                />
              </a>
              <a
                href={ABW_BLOG_LINK}
                target="_blank"
                rel="noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <SimpleIcon
                  icon={siRss}
                  className={cn(socialIconClasses, 'text-white group-hover:text-brand-orange p-1')}
                />
              </a>
              <a
                href={GOODREADS_LINK}
                target="_blank"
                rel="noreferrer"
                className="group transition-transform hover:scale-110"
              >
                <SimpleIcon
                  icon={siGoodreads}
                  className={cn(socialIconClasses, 'text-white group-hover:text-[#e9e5cd] p-1')}
                />
              </a>
            </div>
          </div>

          <Brand location="footer" />
        </section>

        <div className="mt-12 w-full border-t border-white/20 pt-8">{cclicense}</div>
      </div>
    </div>
  )
}
