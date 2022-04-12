import { FC } from 'react'
import Image from 'next/image'

type props = {
  className?: string
  imgClassName?: string
}

const Layout: FC<props> = ({ imgClassName, className, ...props }) => {
  return (
    <a className={`flex shrink-0 grow self-end ${className || ''}`} {...props}>
      <img
        src="/logo.svg"
        alt="Auslan Signbank Logo"
        className={imgClassName}
      />
    </a>
  )
}

export default Layout
