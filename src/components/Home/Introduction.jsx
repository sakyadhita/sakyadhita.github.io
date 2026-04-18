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
      <div className="prose prose-lg max-w-none font-body text-gray-700 leading-relaxed italic">
        <h1>
          {' '}
          Grassr
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 inline-block" />
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 inline-block" />
          ts{' '}
        </h1>
        <Markdown>{body}</Markdown>
      </div>
    </>
  )
}
