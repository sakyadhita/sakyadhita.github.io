/**
 * The pagination that supplements the Stepper.
 * Takes in a prop from parent, which updates the current
 * page the pagination should be on. Takes in a size prop
 * which is used to determine how to split the page numbers
 *
 * @summary     Custom Pagination
 * @author      Amitesh Sharma
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import '../../css/Conferences.css'

const useStyles = makeStyles((theme) => ({
  // custom styling for the paginations
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      width: '100%'
    }
  }
}))

export default function CustomPagination(props) {
  const classes = useStyles()

  // set the tabs for the pagination
  const count = parseInt(props.count / props.size, 10) + 1

  /**
   * Update the parent's page number
   *
   * @param {Event} e - event trigger
   * @param {number} page - the page number
   */
  const handleChange = (e, page) => {
    props.updatePage(page, props.size)
  }

  return (
    <div className={classes.root}>
      <Pagination count={count} size="small" onChange={(e, page) => handleChange(e, page)} />
    </div>
  )
}
