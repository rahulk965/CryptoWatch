import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navigation: React.FC = () => {
  const base = 'rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800'
  const active = 'text-primary'
  return (
    <aside className="hidden w-56 border-r border-gray-200 p-3 dark:border-gray-800 md:block">
      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Home</NavLink>
        <NavLink to="/market" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Market</NavLink>
        <NavLink to="/portfolio" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Portfolio</NavLink>
        <NavLink to="/alerts" className={({isActive}) => `${base} ${isActive ? active : ''}`}>Alerts</NavLink>
      </nav>
    </aside>
  )
}
export default Navigation
