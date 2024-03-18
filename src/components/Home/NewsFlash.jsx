/**
 * Renders News Flash Section of the Home page.
 *
 * @summary Displays latest news on the Home Page.
 *
 * @author Jitendra Joshi
 */

import React from 'react'
import Markdown from 'react-markdown'
import CustomButton from '../CustomButton'

export default function NewsFlash({ article }) {
  return (
    <div id="news-flash">
      <h1>{article.data.title}</h1>

      <div id="news-flash-wrapper" className="row align-items-lg-stretch">
      <div className="col-lg-6 pb-2">
        <p style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'var(--darkpurple)' }}>
            {article.data.subtitle}
          </p>
          <Markdown>{article.body}</Markdown>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CustomButton text="Learn More" redirect_link={article.data.redirectLink} />
          </div>
      </div>
      <div className="col-lg-6">
        <img
          id="news-flash-img"
          style={{ objectFit: 'contain' }}
          width="100%"
          src={article.data.image}
          alt={article.data.title}
        />
      </div>
    </div>
    </div>
  )
}
