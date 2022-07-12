import { FC } from 'react'
import Svg from 'public/australia_map.svg'
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
  AUS: 'select_aus',
}

/* namespace */
const SVG_CSS_PREFIX = 'region_map_svg__'

export const MapSvg: FC<Props> = ({ select, className }) => {
  return (
    <Svg
      className={`${SVG_CSS_PREFIX}${regionSelections[select]} ${
        className || ''
      }`}
    />
  )
}
