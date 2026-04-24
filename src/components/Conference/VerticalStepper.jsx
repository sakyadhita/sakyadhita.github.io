/**
 * The Vertical Stepper is a component used for displaying
 * a list of items in a orderly fashion. This will be a
 * reusable component and has the following properties:
 *
 * Takes in the following as props
 *   color - string - prop to determine color of the stepper
 *   setParentIndex - number - used to update the parent index
 *   height - string - height of the stepper
 *   items - object - items consist of title and number
 *
 * @summary     Vertical Stepper class
 * @author      Amitesh Sharma
 */

import { useState, useEffect } from 'react'

import CustomPagination from './Pagination'
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

export default function VerticalStepper(props) {
  /**
   * Return all the locations and conference number as an array
   * @returns array
   */
  function getSteps() {
    const arr = []
    // loop through each item
    for (let i = 0; i < props.items.length; i++) {
      const obj = { location: props.items[i].data.location, confNum: props.items[i].data.confNum }
      // extract only the country/state, not city
      // get the conference number

      // push it to the array
      arr.push(obj)
    }

    return arr
  }

  // keep track of the current page for pagination
  const [activePage, setActivePage] = useState(1)
  // keep track of the current page for pagination
  const [activeStep, setActiveStep] = useState(0)
  // update the page if the user changes pages
  const [activeIndex, setActiveIndex] = useState(0)
  // indicies to render 9 items per page
  const [indices, setIndices] = useState([0, 9])

  // initial call to get all steps
  const steps = getSteps()
  const [splitSteps, setSplitSteps] = useState(steps.slice(0, 9))

  /**
   * Update the stepper to render the 9 items depending on the page
   * @param {number} index
   */
  const updatePage = (index) => {
    setIndices([(index - 1) * 9, index * 9])
    setActiveIndex(0)
    setActivePage(index)
    props.setParentIndex((index - 1) * 9)
  }

  /**
   * Convert the location string to a shorter location string if
   * it contains more than the format (city, state)
   *
   * @param {string} location - the location for the conference
   * @returns a string
   */
  const determineLocationLabel = (location) => {
    const splitLocation = location.split(',')
    if (splitLocation.length > 2) {
      splitLocation.shift()
    }

    return splitLocation.join(', ')
  }

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

  /**
   * This is a component for the vertical stepper.
   */
  useEffect(() => {
    // render only the first nine items
    setSplitSteps(steps.slice(indices[0], indices[1]))
    if (props.id) {
      // find the index of the conference in the items list
      const ind = props.items.findIndex((x) => x.id === props.id)
      let i = ind
      // determine the page to change to
      if (Math.floor(i / 9) > 0) {
        const page = Math.floor(i / 9)
        i %= 9
        updatePage(page + 1)
      }

      handleStep(i)
    }
  }, [])

  // update the items on the stepper when the indices updates
  useEffect(() => {
    setSplitSteps(steps.slice(indices[0], indices[1]))
  }, [indices])

  return (
    <div className="w-fit">
      <div className="flex min-h-[666.5px] flex-col items-start px-2">
        {splitSteps.map((step, index) => (
          <div key={step.confNum} className="
            group flex w-full flex-col items-start
          ">
            <div className="flex w-full items-center">
              {/* Node Button */}
              <button
                onClick={() => handleStep(index)}
                className={cn(
                  `
                    relative z-10 flex size-9 shrink-0 cursor-pointer
                    items-center justify-center rounded-full border-2
                    transition-all duration-300
                  `,
                  activeIndex === index
                    ? `
                      scale-105 border-brand-dark-purple bg-brand-dark-purple
                      text-white shadow-lg
                    `
                    : `
                      border-brand-dark-purple bg-white text-brand-dark-purple
                      hover:bg-brand-dark-purple hover:text-white
                    `
                )}
                style={
                  activeIndex === index
                    ? { backgroundColor: props.color, borderColor: props.color }
                    : { color: props.color, borderColor: props.color }
                }
              >
                <span className="
                  pointer-events-none text-xs font-bold lowercase
                ">
                  {ordinal_suffix_of(step.confNum)}
                </span>
              </button>

              {/* Label */}
              <button
                type="button"
                className={cn(
                  `
                    ml-4 max-w-40 cursor-pointer truncate border-none
                    bg-transparent p-0 text-left font-body text-base
                    transition-colors
                    hover:underline
                  `,
                  activeIndex === index ? 'font-bold opacity-100' : 'opacity-80'
                )}
                style={{ color: props.color }}
                onClick={() => handleStep(index)}
              >
                {determineLocationLabel(step.location)}
              </button>
            </div>

            {/* Connector below */}
            {index < splitSteps.length - 1 && (
              <div
                className="my-1 ml-4 min-h-8 w-0.5 opacity-40"
                style={{ backgroundColor: props.color }}
              />
            )}
          </div>
        ))}
      </div>

      {/* This pagination allows user to change pages and view more conferences */}
      <div className="mt-4">
        <CustomPagination count={steps.length} page={activePage} updatePage={updatePage} size={9} />
      </div>
    </div>
  )
}
