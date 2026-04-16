/**
 * The ConferenceOverview page only renders the 'overview' information
 * This is a component of both Conferences page.
 *
 * Takes in the following props:
 *  - title: required, string
 *  - item: required, object consisting of:
 *      - url: required, string
 *      - description: required, string
 *
 * @summary     conferences theme component
 * @author      Amitesh Sharma
 */

import React from 'react'
import { Download } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function ConferenceOverview(props) {
  const items = props.info

  const itemList = (item) => (
    <div className="flex flex-col space-y-2 mb-8">
      {!item || item.length === 0 ? (
        <div className="text-gray-400 italic py-2 px-4 border border-dashed border-gray-200 rounded-lg">
          No info available
        </div>
      ) : (
        item.map((program) => (
          <a 
            href={program.url} 
            download 
            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-brand-orange/10 hover:text-brand-orange transition-all group border border-gray-100 no-underline hover:no-underline w-[307.2px]" 
            key={program.url}
          >
            <Download className="w-5 h-5 text-brand-dark-purple group-hover:text-brand-orange" />
            <span className="font-body font-medium">{program.description}</span>
          </a>
        ))
      )}
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 w-[80.24vw]">
      {/* The title of the conference */}
      <section className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-brand-dark-purple lowercase tracking-tight w-[35vw]">
          {props.title}
        </h1>
        {props.tabs ? props.tabs() : null}
      </section>

      {/* Header section for file downloads */}
      <section className="w-[307.2px]">
        <h4 className="text-xl font-bold font-heading italic text-gray-600 mb-8 border-l-4 border-brand-orange pl-4 lowercase">
          Conference resources are available for download as a PDF.
        </h4>
      </section>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-[31vw] space-y-2">
          {/* brochures */}
          <div className="text-sm font-bold uppercase tracking-widest text-white bg-brand-orange mb-3 p-1 px-2 font-body">Brochures</div>
          {itemList(items.data.brochures)}

          {/* programs */}
          <div className="text-sm font-bold uppercase tracking-widest text-white bg-brand-orange mb-3 p-1 px-2 font-body">Programs</div>
          {itemList(items.data.programs)}

          {/* abstracts */}
          <div className="text-sm font-bold uppercase tracking-widest text-white bg-brand-orange mb-3 p-1 px-2 font-body">Abstracts</div>
          {itemList(items.data.abstracts)}

          {/* presentations */}
          <div className="text-sm font-bold uppercase tracking-widest text-white bg-brand-orange mb-3 p-1 px-2 font-body">Presentations</div>
          {itemList(items.data.presentations)}
        </div>

        <div className="w-[42vw] ml-[50px] -mt-6 mr-[25px]">
          {props.slideShow ? props.slideShow() : null}
        </div>
      </div>
    </div>
  )
}
