import React, { FC } from 'react'

type props = {
  className?: string
  imgClassName?: string
}

const Logo: FC<props> = React.forwardRef(function Layout(
  { imgClassName, className, ...props },
  ref: React.LegacyRef<any>
) {
  return (
    <a
      style={{ display: 'flex', flexShrink: 0, flexGrow: '1', justifySelf: 'end'}}
      // className={`flex shrink-0 grow self-end ${className || ''}`}
      {...props}
      ref={ref}
    >
      <img
        src="/logo.svg"
        alt="Auslan Signbank Logo"
        className={imgClassName}
      />
    </a>
  )
})

export default Logo
