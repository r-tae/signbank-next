import React from 'react'
import { useRouter } from 'next/router'

type ButtonProps = { children: any; className?: string } & (
  | {
      onClick?: never
      href: string
    }
  | {
      onClick: React.MouseEventHandler
      href?: never
    }
) & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = ({ children, onClick, href, className = "", ...props}: ButtonProps) => {
  const router = useRouter()

  if (href) {
    onClick = () => {
      router.push(href)
    }
  }

  return (
    <button
      onClick={onClick}
      {...props}
      className={`${props.disabled ? 'cursor-not-allowed bg-gray-50 text-slate-500 border-gray-200' : 'bg-gray-200 text-slate-800 border-gray-300'} border-md rounded border px-2 ${className}`}
    >
      {children}
    </button>
  )
}
