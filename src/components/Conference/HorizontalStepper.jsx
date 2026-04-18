/**
 * The Horizontal Stepper is a component used for displaying
 * a list of items in a orderly fashion. This will be a
 * reusable component and has the following properties:
 *
 * Takes in the following as props
 *   color - string - prop to determine color of the stepper
 *   setParentIndex - number - used to update the parent index
 *   height - string - height of the stepper
 *   items - object - items consist of title and number
 *
 * @summary     Horizontal Stepper class
 * @author      Amitesh Sharma
 */

import React, { useState, useEffect } from 'react'
import CustomPagination from './Pagination'
import useWindowSize from '../../util/ScreenListener'
import { cn } from '../../lib/utils'

/**
 * Convert a given number into an ordinal number
 * @param {number} i
 * @returns string of ordinal number
 */
const ordinal_suffix_of = (i) => {
  const ones = i % 10
  const hundreds = i % 100

  // if the remainder is 1 and 11
  if (ones === 1 && hundreds !== 11) {
    return `${i}st`
  }
  // if the remainder is 2 and 12
  if (ones === 2 && hundreds !== 12) {
    return `${i}nd`
  }
  // if the remainder is 3 and 13
  if (ones === 3 && hundreds !== 13) {
    return `${i}rd`
  }
  return `${i}th`
}

export default function HorizontalStepper(props) {
  // a listener that checks the screen width
  const listener = useWindowSize()

  /**
   * Return all the locations and conference number as an array
   * @returns array
   */
  function getSteps() {
    const arr = []
    // loop through each item
    for (let i = 0; i < props.items.length; i++) {
      const obj = {}
      // extract only the country/state, not city
      obj.location = props.items[i].data.location
      // get the conference number
      obj.confNum = props.items[i].data.confNum

      // push it to the array
      arr.push(obj)
    }

    return arr
  }

  // keep track of the current page for pagination
  const [activeStep, setActiveStep] = useState(0)
  // update the page if the user changes pages
  const [activeIndex, setActiveIndex] = useState(0)
  // indicies to render 9 items per page
  const [indices, setIndices] = useState([0, 4])

  // initial call to get all steps
  const steps = getSteps()
  const [splitSteps, setSplitSteps] = useState(steps.slice(0, 4))

  /**
   * When the screen size changes to below 600px, updates the stepper
   */
  useEffect(() => {
    if (listener.width > 600) {
      // we want stepper of length 6 when it is greater than 600px
      if (listener.width < 900) setIndices([0, 6])
      else setIndices([0, 9])
    } else setIndices([0, 4])
  }, [listener])

  /**
   * Update the stepper to render the items depending on the page
   * @param {number} index
   * @param {number} count
   */
  const updatePage = (index, count) => {
    // determine if it is a mobile screen or tablet
    const size = count
    // update the indices range
    setIndices([(index - 1) * size, index * size])
    // when updating to new page, set the active index to 0
    setActiveIndex(0)
    // update the parent index to display proper information
    props.setParentIndex((index - 1) * size)
  }

  const updateSize = () => {
    if (listener.width < 601) return 4
    if (listener.width < 900) return 6
    return 10
  }

  // render items
  useEffect(() => {
    setSplitSteps(steps.slice(indices[0], indices[1]))
    if (props.id) {
      // find the index of the conference in the items list
      let i = props.items.findIndex((x) => x.id === props.id)
      // determine the page to change to
      if (Math.floor(i / 9) > 0) {
        const page = Math.floor(i / 9)
        i %= 9
        updatePage(page + 1, updateSize())
      }

      setActiveIndex(i)
    }
  }, [])

  // update the items on the stepper when the indices updates
  useEffect(() => {
    setSplitSteps(steps.slice(indices[0], indices[1]))
  }, [indices])

  // set the active index and step to 0 upon loading
  useEffect(() => {
    if (activeStep === -1) {
      setActiveStep(0)
    }
    if (activeIndex === -1) {
      setActiveIndex(0)
    }
  }, [activeStep, activeIndex])

  /**
   * When an item in the stepper is clicked, it's parent
   * index is updated accordingly
   *
   * @param {index} step
   */
  const handleStep = (step) => {
    setActiveStep(indices[0] + step)
    setActiveIndex(step)
    props.setParentIndex(indices[0] + step)
  }

  return (
    <div className="min-h-[10.5px]">
      <div className="flex items-center justify-center py-4">
        {splitSteps.map((step, index) => (
          <React.Fragment key={step.confNum}>
            {/* Node Button */}
            <button
              onClick={() => handleStep(index)}
              className={cn(
                'relative z-10 w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer',
                activeIndex === index ? 'text-white shadow-md' : 'bg-white hover:bg-gray-50'
              )}
              style={
                activeIndex === index
                  ? { backgroundColor: props.color, borderColor: props.color }
                  : { color: props.color, borderColor: props.color }
              }
            >
              <span className="text-sm font-bold lowercase">{ordinal_suffix_of(step.confNum)}</span>
            </button>

            {/* Connector */}
            {index < splitSteps.length - 1 && (
              <div className="h-0.5 w-14 -ml-0.5" style={{ backgroundColor: props.color }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* pagination allows user to see more conferences */}
      <div className="flex justify-center mt-2">
        <CustomPagination count={steps.length} updatePage={updatePage} size={updateSize()} />
      </div>
    </div>
  )
}
