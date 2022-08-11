import React from 'react'
import { useRouter } from 'next/router'
import styles from './button.module.scss'

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
      className={styles.button}
      onClick={onClick}
      {...props}
      disabled={props.disabled}
      // className={`${props.disabled ? 'cursor-not-allowed bg-gray-50 text-slate-500 border-gray-200' : 'bg-gray-200 text-slate-800 border-gray-300'} border-md rounded border px-2 py-1 ${className}`}
    >
      {children}
    </button>
  )
}
