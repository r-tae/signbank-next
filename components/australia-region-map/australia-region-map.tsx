import { FC } from 'react'
import MapSvg from 'public/australia_map.svg'
// import { ReactSVG } from 'react-svg'
interface Props {
  select: string
  className?: string
}

const regionSelections: { [key: string]: string } = {
  VIC: 'select_vic',
  NTH: 'select_nth',
  STH: 'select_sth',
  WA: 'select_wa',
  SA: 'select_sa',
  NT: 'select_nt',
  QLD: 'select_qld',
  NSW: 'select_nsw',
  TAS: 'select_tas',
}

/* namespace */
const SVG_CSS_PREFIX = 'australia_map_svg__'

const AustraliaRegionMap: FC<Props> = ({ select, className }) => {
  return (
    <MapSvg
      className={`${SVG_CSS_PREFIX}${regionSelections[select]} ${
        className || ''
      }`}
    />
  )
}

export default AustraliaRegionMap
