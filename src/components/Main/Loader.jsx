/**
    Colored loading component to indicate page load or information fetch.

    @author PatrickBrown1
 */

import React from 'react'

const Loader = () => (
  <div className="flex justify-center items-center my-[150px]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-light-purple"></div>
  </div>
)

export default Loader
