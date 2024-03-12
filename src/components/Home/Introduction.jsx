/**
 * Introduction section of Home page.
 *
 * @summary Renders section content.
 *
 * @author Amrit Kaur Singh
 */

import React from 'react'
import Markdown from 'react-markdown'

export default function Introduction({ body }) {
  // return <div id="home-introduction" dangerouslySetInnerHTML={{ __html: `${body}` }} />
  return (
    <>
      <h1> Grassr<img src="/logo.svg" alt="Logo" id="logo" /><img src="/logo.svg" alt="Logo" id="logo" />ts </h1>
      <Markdown>
        {body}
      </Markdown>
    </>
  )
}