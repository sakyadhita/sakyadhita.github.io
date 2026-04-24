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

import { Download } from 'lucide-react'

export default function ConferenceOverview(props) {
  const items = props.info

  const itemList = (item) => (
    <div className="mb-8 flex flex-col space-y-2">
      {!item || item.length === 0 ? (
        <div
          className="
            rounded-lg border border-dashed border-gray-200 px-4 py-2
            text-gray-400 italic
          "
        >
          No info available
        </div>
      ) : (
        item.map((program) => (
          <a
            href={program.url}
            download
            className="
              group flex w-full items-center space-x-3 rounded-xl border
              border-gray-100 bg-gray-50 p-3 no-underline transition-all
              hover:bg-brand-orange/10 hover:text-brand-orange
              hover:no-underline
              md:w-[307.2px]
            "
            key={program.url}
          >
            <Download
              className="
                size-5 text-brand-dark-purple
                group-hover:text-brand-orange
              "
            />
            <span className="font-body font-medium">{program.description}</span>
          </a>
        ))
      )}
    </div>
  )

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 w-full space-y-10">
      {/* The title of the conference */}
      <section className="space-y-6">
        <h1
          className="
            max-w-2xl font-heading text-3xl font-bold tracking-tight
            text-brand-dark-purple lowercase
            md:text-5xl
          "
        >
          {props.title}
        </h1>
        {props.tabs ? props.tabs() : null}
      </section>

      {/* Header section for file downloads */}
      <section className="max-w-md">
        <h4
          className="
            mb-8 border-l-4 border-brand-orange pl-4 font-heading
            text-xl/relaxed font-bold text-gray-600 lowercase italic
          "
        >
          Conference resources are available for download as a PDF.
        </h4>
      </section>

      <div
        className="
          flex flex-col gap-8
          lg:flex-row lg:gap-12
        "
      >
        <div className="max-w-md flex-1 space-y-2">
          {/* brochures */}
          <div
            className="
              mb-3 bg-brand-orange p-1 px-2 font-body text-sm font-bold
              tracking-widest text-white uppercase
            "
          >
            Brochures
          </div>
          {itemList(items.data.brochures)}

          {/* programs */}
          <div
            className="
              mb-3 bg-brand-orange p-1 px-2 font-body text-sm font-bold
              tracking-widest text-white uppercase
            "
          >
            Programs
          </div>
          {itemList(items.data.programs)}

          {/* abstracts */}
          <div
            className="
              mb-3 bg-brand-orange p-1 px-2 font-body text-sm font-bold
              tracking-widest text-white uppercase
            "
          >
            Abstracts
          </div>
          {itemList(items.data.abstracts)}

          {/* presentations */}
          <div
            className="
              mb-3 bg-brand-orange p-1 px-2 font-body text-sm font-bold
              tracking-widest text-white uppercase
            "
          >
            Presentations
          </div>
          {itemList(items.data.presentations)}
        </div>

        <div
          className="
            shrink-0
            lg:w-1/2
          "
        >
          {props.slideShow ? props.slideShow() : null}
        </div>
      </div>
    </div>
  )
}
