/**
 * Displays Donate Screen of website, including a link to monetory support options as well
 * as volunteer support options. This includes a PayPal Donate button.
 *
 * This page has no backend calls, and for the most part no major dependencies.
 *
 * @summary Renders and formats Donate Page.
 *
 * @author Amrit Kaur Singh
 */

import React from 'react'
import CustomButton from '../CustomButton'
import ResourcesHeader from '../ResourcesHeader'
import BeInvolved from '../Home/BeInvolved'
import { SITE_PAGES } from '../../constants/links'
import { cn } from '../../lib/utils'

export default function Donate({ frontmatter }) {
  const [isMobile, setIsMobile] = React.useState(false)
  const arrowScrollToRef = React.createRef()

  // Effect to update the sticky nav on scroll
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToRef = () => {
    // only scrolls if element has been rendered on the screen by DOM first
    if (arrowScrollToRef.current) {
      arrowScrollToRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <div id="donate-page" className="font-body">
      {isMobile || (typeof window !== 'undefined' && window.innerHeight <= 500) ? (
        <ResourcesHeader
          title={frontmatter.title}
          image={frontmatter.image}
          height="max(40vh, 300px)"
          width="100%"
          showArrow={false}
        />
      ) : (
        <ResourcesHeader
          title={frontmatter.title}
          text={frontmatter.description}
          image={frontmatter.image}
          height="max(75vh, 400px)"
          width="100%"
          arrowClickCallback={scrollToRef}
        />
      )}

      {/* All page content  */}
      <div className="flex flex-col px-4 md:px-12 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-0">
          {/* PayPal Info */}
          <section className="flex-1 flex flex-col items-center mx-0 lg:mx-8 text-center lg:text-left">
            <h1 ref={arrowScrollToRef} className="font-heading font-bold text-3xl md:text-5xl mb-4">
              {' '}
              PayPal{' '}
            </h1>
            <hr className="w-1/2 h-1.5 bg-brand-orange border-none mb-8" />
            <p className="max-w-2xl text-gray-700 leading-relaxed">
              Your donation makes a difference. In the tradition of the Buddha our work is offered
              publicly, and free of charge when possible. Consequently, the vital work Sakyadhita
              performs is funded entirely through donations, memberships, and conference fees. Your
              generosity allows us to keep conference fees low, while offering conference
              scholarships to female monastics who otherwise would not be able to attend our
              bi-annual conferences.
            </p>
            <p className="mt-6 font-bold"> Make a One-Time or Reoccuring Donation </p>
            {/* PayPal Donate Button */}
            <div className="mt-8 flex justify-center h-12">
              <form action="https://www.paypal.com/donate" method="post" target="_blank">
                <input type="hidden" name="hosted_button_id" value="78ZSMXL4ZSYJQ" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                  className="hover:opacity-90 transition-opacity"
                />
                <img
                  alt=""
                  border="0"
                  src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
            </div>
            <img
              className="mt-8 w-full max-w-[400px] h-auto rounded-lg shadow-md"
              alt="13th Conference"
              src="/assets/Donate Page/WorkingTogether-440px.jpeg"
            />
          </section>
          {/* AmazonSmile Info */}
          <section className="flex-1 flex flex-col items-center mx-0 lg:mx-8 text-center lg:text-left mt-12 lg:mt-0">
            <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4"> AmazonSmile </h1>
            <hr className="w-1/2 h-1.5 bg-brand-orange border-none mb-8" />
            <p className="max-w-2xl text-gray-700 leading-relaxed">
              You can also support Sakyadhita International by shopping online through AmazonSmile,
              a simple and automatic way for you to support Sakyadhita every time you shop, at no
              cost to you. When you shop at AmazonSmile, you’ll find the exact same low prices, vast
              selection and convenient shopping experience as Amazon.com, with the added bonus that
              Amazon will donate a portion of the purchase price to Sakyadhita.
            </p>
            <img
              className="mt-8 w-full max-w-[350px] h-auto rounded-lg shadow-md"
              alt="AmazonSmile Promo"
              src="/assets/Donate Page/AmazonSmile-01.jpeg"
            />
            <div className="mt-8">
              <CustomButton text="Support" redirect_link="http://smile.amazon.com/ch/95-4112765" />
            </div>
          </section>
        </div>

        <div className="flex justify-center hidden md:flex">
          <hr className="w-1/2 h-2.5 bg-brand-orange border-none my-24" />
        </div>

        {/* Support Us Section */}
        <section className="mt-12 md:mt-0 flex flex-col items-center md:items-start">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-8">
            {' '}
            Support Us via Involvement{' '}
          </h1>
          <p className="mb-8 text-gray-700">Get involved and support us!</p>
          <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-12 justify-evenly items-center">
            {/* Join Us  */}
            <BeInvolved
              description="Become a member of Sakyadhita!"
              image_url="/assets/Join%20Us%20Page/JoinUs.jpg"
              openInSameTab="true"
              redirect_link={SITE_PAGES.JOIN_US}
              button_title="Join Us"
            />
            {/* Volunteer  */}
            <BeInvolved
              description="Interested in helping us with anything from writing content to
                            building?"
              image_url="/assets/Join%20Us%20Page/Volunteer.jpg"
              openInSameTab="true"
              redirect_link={SITE_PAGES.VOLUNTEER}
              button_title="Volunteer"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
