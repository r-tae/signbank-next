import React from 'react'
import { useRouter } from 'next/router'

type ButtonProps = { children: any; className?: string } & (
  | {
      onClick?: never
      href: string
    }
  | {
      href?: never
      onClick: React.MouseEventHandler
    }
)

export const Button = ({ children, onClick, href, className }: ButtonProps) => {
  const router = useRouter()

  if (href) {
    onClick = () => {
      router.push(href)
    }
  }

  return (
    <button
      onClick={onClick}
      className={`border-md slate-700 rounded border border bg-white px-2 ${className}`}
    >
      {children}
    </button>
  )
}
