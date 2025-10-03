import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
  const variants = {
    primary: 'bg-primary text-white hover:bg-indigo-600 focus:ring-indigo-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
export default Button
