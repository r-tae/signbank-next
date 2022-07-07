# Region map

The region map is built with an SVG with internal CSS to highlight a region based on the parents class, and a React component that grants the corresponding class for the value in the DB.

> As SB is a WIP, the map component and SVG are hardcoded, but in the future they will take configuration files at startup to change the map to work with non-australian maps.

An illustrative example follows ():

> australia-region-map.svg

```html
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="100"
    height="93"
    viewBox="0 0 200 186"
    id="svg2">
<style>

  g {
    fill: rgb(31 41 55);
    stroke: white;
  }


  /* Dialects */
  .australia_map_svg__select_aus #VIC,
  .australia_map_svg__select_aus #SA,
  .australia_map_svg__select_aus #WA,
  .australia_map_svg__select_aus #TAS,
  .australia_map_svg__select_aus #NT,
  .australia_map_svg__select_aus #QLD,
  .australia_map_svg__select_aus #NSW,
  .australia_map_svg__select_aus #ACT,

  .australia_map_svg__select_nth #QLD,
  .australia_map_svg__select_nth #NSW,
  .australia_map_svg__select_nth #ACT,

  .australia_map_svg__select_sth #VIC,
  .australia_map_svg__select_sth #SA,
  .australia_map_svg__select_sth #WA,
  .australia_map_svg__select_sth #TAS,
  .australia_map_svg__select_sth #NT,

  /* Indiv states */
  .australia_map_svg__select_vic #VIC,

  .australia_map_svg__select_wa #WA,

  .australia_map_svg__select_sa #SA,

  .australia_map_svg__select_nt #NT,

  .australia_map_svg__select_qld #QLD,

  .australia_map_svg__select_nsw #NSW,
  .australia_map_svg__select_nsw #ACT,

  .australia_map_svg__select_tas #TAS {
    fill: #699bd5;
  }
</style>
<defs id="defs5" />
  <g id="root" fill="#d3d3d3" stroke="black">
  <path id="NSW" />
  <path id="ACT" />
  <path id="WA" />
  <path id="VIC" />
  <path id="QLD" />
  <path id="TAS" />
  <path id="NT" />
  <path id="SA" />
</svg>
```

```jsx
function RegionMap({ select }) {
  return (
    <MapSvg className={`australia_map_svg__select_${select.toLowerCase()}`} />
  )
}
```
