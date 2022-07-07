import { useState } from 'react'

export function Collapse({ header, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative overflow-hidden rounded border border-black bg-stone-300">
      <input
        type="checkbox"
        className="peer absolute inset-x-0 top-0 z-10 h-10 w-full cursor-pointer opacity-0"
      />
      <h3 className="px-4 text-lg leading-loose">{header}</h3>
      {/* absolute arrow icon here, with `peer-checked:rotate-180` and maybe a little bit of transition */}
      <div className="max-h-0 w-full overflow-hidden bg-white transition-all duration-500 peer-checked:max-h-fit">
        {children}
      </div>
    </div>
  )
}
