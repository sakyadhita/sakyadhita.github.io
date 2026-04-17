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
    <div id="news-flash" className="prose max-w-none mb-6">
      <h1 className="font-heading font-bold mb-[30px]">{article.data.title}</h1>

      <div id="news-flash-wrapper" className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 pb-2">
          <p className="italic font-bold text-brand-dark-purple mb-4">
            {article.data.subtitle}
          </p>
          <div className="mb-6">
            <Markdown>{article.body}</Markdown>
          </div>
          <div className="flex items-center justify-center">
            <CustomButton text="Learn More" redirect_link={article.data.redirectLink} />
          </div>
        </div>
        <div className="flex-1">
          <img
            id="news-flash-img"
            className="w-full h-full object-contain rounded-lg shadow-md"
            src={article.data.image}
            alt={article.data.title}
          />
        </div>
      </div>
    </div>
  )
}
