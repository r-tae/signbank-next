import React, { FC } from 'react'

type props = {
  className?: string
  imgClassName?: string
}

const Layout: FC<props> = React.forwardRef(function Layout(
  { imgClassName, className, ...props },
  ref: React.LegacyRef<any>
) {
  return (
    <a
      className={`flex shrink-0 grow self-end ${className || ''}`}
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

export default Layout
