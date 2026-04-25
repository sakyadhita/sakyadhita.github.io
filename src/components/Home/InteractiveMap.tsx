/**
 * Displays Interactive World Map, containing custom color-coded markers on certain coordinates with custom information
 * upon hover/click. Display information for the hover and marker is required as a prop, which in turn is expected to conform
 * to a certain JSON schema. All attributes in this JSON schema are required for proper rendering.
 *
 * @summary Displays Interactive World Map.
 *
 * @author Amrit Kaur Singh
 */

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Graticule
} from 'react-simple-maps'

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip'

// loads topological map information (continents/countries, general outline) using json request
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// constrains panning extent of interactive map, preventing panning into whitespace
const mapWidth = 800
const mapHeight = 600

interface Marker {
  name: string
  latitude: number
  longitude: number
  isBranch: boolean
  siteLink?: string
  email?: string
  html?: string
}

interface InteractiveMapProps {
  markers: Marker[]
  disableZooming?: boolean
}

export default function InteractiveMap({ markers, disableZooming = false }: InteractiveMapProps) {
  return (
    <div className="size-full">
      <TooltipProvider>
        <ComposableMap>
          {/* Makes map zoomable/pannable, with default zoom set as zoomed out as possible */}
          <ZoomableGroup
            zoom={1}
            maxZoom={disableZooming ? 1 : 3}
            center={[-5, 0]}
            translateExtent={[
              [-10, 0],
              [mapWidth, mapHeight]
            ]}
          >
            {/* Creates checkered stroke pattern around map */}
            <Graticule stroke="#EAEAEC" />
            {/* Creates all continents to be displayed */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    fill="#BBDBF0"
                    geography={geo}
                    tabIndex={-1}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' }
                    }}
                  />
                ))
              }
            </Geographies>
            {/* Creates custom markers for all information passed */}
            {markers.map(({ name, latitude, longitude, isBranch }, i) => (
              <Tooltip key={name}>
                <TooltipTrigger
                  render={
                    <Marker
                      className="cursor-pointer"
                      // coordinates of marker
                      coordinates={[longitude, latitude]}
                    />
                  }
                >
                  {/* Outline/style of custom marker defined here */}
                  <g
                    fill="none"
                    className="outer"
                    stroke={isBranch ? '#d77a3d' : '#6652a0'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                  >
                    <circle cx="12" cy="10" r="4" fill={isBranch ? '#d77a3d' : '#6652a0'} />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                </TooltipTrigger>
                <TooltipContent side="left" className="home-map-tooltip">
                  <div>
                    {markers[i].siteLink ? (
                      <a
                        href={markers[i].siteLink}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          font-bold text-brand-orange
                          hover:underline
                        "
                      >
                        {markers[i].name}
                      </a>
                    ) : (
                      <span className="font-bold text-brand-dark-purple">{markers[i].name}</span>
                    )}
                    {markers[i].email && <div className="mt-1 text-sm">{markers[i].email}</div>}
                    {markers[i].html && (
                      <div
                        className="
                          prose prose-sm mt-2 max-w-none leading-tight italic
                        "
                        dangerouslySetInnerHTML={{ __html: markers[i].html }}
                      />
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </TooltipProvider>
    </div>
  )
}
