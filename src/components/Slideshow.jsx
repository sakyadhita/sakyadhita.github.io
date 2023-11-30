/**
 * Slideshow component built with react-slideshow-image. Takes in children
 * components (should be divs) and renders them in a slideshow with custom
 * arrows and indicators. The slideshow requires height and width props, that
 * update the size of the component, BUT THE SLIDES MUST BE THE SAME SIZE or
 * else you will have padding issues.
 * @author PatrickBrown1
 */

import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image'
import LeftArrow from '../media/leftarrow.svg'
import RightArrow from '../media/rightarrow.svg'

import '../css/Slideshow.css'

const Slideshow = (props) => (
  // required props: height, width, isMobile
  <Fade
    autoPlay
    duration={4000}
    transitionDuration={500}
    prevArrow={
      // custom left arrow component
      <div
        style={
          !props.isMobile
            ? { width: '50px', marginRight: '-50px' }
            : { width: '25px', marginRight: '-25px' }
        }
      >
        <img
          className={!props.isMobile ? 'Slideshow_arrowleft' : 'Slideshow_arrowleft--mobile'}
          src={LeftArrow.src}
          alt="left arrow"
        />
      </div>
    }
    nextArrow={
      // custom right arrow component
      <div
        style={
          !props.isMobile
            ? { width: '50px', marginLeft: '-100px' }
            : { width: '25px', marginLeft: '-40px' }
        }
      >
        <img
          className={!props.isMobile ? 'Slideshow_arrowright' : 'Slideshow_arrowright--mobile'}
          src={RightArrow.src}
          alt="right arrow"
        />
      </div>
    }
    arrows={!props.isMobile}
    pauseOnHover
    indicators={() => <div className="dot" />}
    style={{ maxHeight: props.height, minHeight: props.height, width: props.width }}
    className="Slideshow"
  >
    {props.children}
  </Fade>
)
export default Slideshow
