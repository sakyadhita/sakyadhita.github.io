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

import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import StepConnector from '@material-ui/core/StepConnector'
import Step from '@material-ui/core/Step'
import { StepButton, StepLabel } from '@material-ui/core'
import CustomPagination from './Pagination'
import '../../css/Stepper/Stepper.css'

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

// custom node for the text within a node
const stepperNode = (index) => <div className="stepper-node">{ordinal_suffix_of(index)}</div>

export default function VerticalStepper(props) {
  // custom styling used for various components
  const useStyles = makeStyles(() => ({
    root: {
      minWidth: 'calc(11.39vw)'
    },
    stepDiv: {
      minHeight: 'calc(666.5px)'
    },
    // styling for the country/state label
    step_label_root: {
      fontSize: '16px',
      color: `${props.color} !important`,
      width: 'calc(150px)',
      textAlign: 'left',
      marginLeft: 'calc(15px)'
    },
    // this is used for the custom stepper node text
    icon_container: {
      width: '30px',
      height: '22px',
      justifyContent: 'center'
    },
    // this is styling for stepper node
    button: {
      width: '22px',
      height: '22px',
      backgroundColor: 'transparent',
      border: `2px solid ${props.color}`,
      borderRadius: '50%',
      fontWeight: '400',
      color: `${props.color}`
    },
    // when a user clicks a stepper, this class is active
    buttonActive: {
      width: '22px',
      height: '22px',
      backgroundColor: `${props.color}`,
      border: `2px solid ${props.color}`,
      borderRadius: '50%',
      color: 'white',
      fontWeight: '400'
    }
  }))

  // custom styling for the connectors on the stepper
  const ColorlibConnector = withStyles({
    line: {
      marginTop: 'calc(6.5px)',
      marginBottom: 'calc(-2px)',
      width: 2,
      minHeight: '22px',
      border: 0,
      backgroundColor: props.color,
      borderRadius: 1,
      marginLeft: 'calc(0px)'
    }
  })(StepConnector)

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

  // import the styling
  const classes = useStyles()
  // keep track of the current page for pagination
  const [activePage, setActivePage] = useState(1)
  // keep track of the current page for pagination
  const [activeStep, setActiveStep] = useState(0)
  // update the page if the user changes pages
  const [activeIndex, setActiveIndex] = useState(0)
  // indicies to render 9 items per page
  const [indices, setIndices] = useState([0, 9])
  // steps that are split based on indices
  const [splitSteps, setSplitSteps] = useState(getSteps())

  // initial call to get all steps
  const steps = getSteps()

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
   * This is called when the page is rendered
   */
  useEffect(() => {
    // render only the first nine items
    setSplitSteps(steps.slice(indices[0], indices[1]))
    if (props.id) {
      // find the index of the conference in the items list
      const ind = props.items.findIndex((x) => x.slug === props.id)
      let i = ind
      // determine the page to change to
      if (Math.floor(i / 9) > 0) {
        const page = Math.floor(i / 9)
        i %= 9
        console.log(page + 1)
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
    <div className={classes.root}>
      <div className={classes.stepDiv}>
        {/* The material-ui stepper class */}
        <Stepper
          nonLinear
          activeStep={activeStep}
          orientation="vertical"
          connector={<ColorlibConnector />}
        >
          {/* for each item in our splitSteps array */}
          {splitSteps.map((step, index) => (
            <Step key={step.confNum}>
              {/* add a step button that is clickable */}
              <StepButton
                onClick={() => handleStep(index)}
                classes={
                  activeIndex === index ? { root: classes.buttonActive } : { root: classes.button }
                }
                icon={stepperNode(step.confNum)}
              >
                {/* step label provides the location */}
                <StepLabel
                  classes={{
                    label: classes.step_label_root,
                    iconContainer: classes.icon_container,
                    active: classes.step_label_root
                  }}
                >
                  {determineLocationLabel(step.location)}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* This pagination allows user to change pages and view more conferences */}
      <div className="pagination-stepper">
        <CustomPagination count={steps.length} page={activePage} updatePage={updatePage} size={9} />
      </div>
    </div>
  )
}
