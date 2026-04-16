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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'

export default function CustomPagination(props) {
  // set the tabs for the pagination
  const count = Math.ceil(props.count / props.size)

  /**
   * Update the parent's page number
   *
   * @param {number} page - the page number
   */
  const handlePageChange = (page) => {
    if (page < 1 || page > count) return
    props.updatePage(page, props.size)
  }

  const pages = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <Pagination className="mt-4 w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(props.page - 1)
            }}
            className={props.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={props.page === p}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(p)
              }}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(props.page + 1)
            }}
            className={props.page === count ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
