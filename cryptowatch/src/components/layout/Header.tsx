import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@/components/common/Button'
import { useTheme } from '@/hooks/useTheme'

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur-md dark:border-gray-800/70 dark:bg-gray-900/70">
      <div className="container-responsive flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={theme === 'light' ? '/lightLogo.png' : '/darkLogo.png'}
            alt="Cryptowatch"
            className="h-8 w-8"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = '/darkLogo.png' }}
          />
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji' }}>Cryptowatch</span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {[
            { to: '/', label: 'Home' },
            { to: '/market', label: 'Market' },
            { to: '/portfolio', label: 'Portfolio' },
            { to: '/alerts', label: 'Alerts' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative rounded-md px-3 py-2 transition-colors hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                  isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-1">
                  {label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded bg-primary/80" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        {/* Right controls */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-300 dark:hover:bg-gray-800/80 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {/* Simple hamburger icon */}
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile nav panel */}
      {open && (
        <div className="container-responsive md:hidden">
          <div className="mt-2 grid gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {[
              { to: '/', label: 'Home' },
              { to: '/market', label: 'Market' },
              { to: '/portfolio', label: 'Portfolio' },
              { to: '/alerts', label: 'Alerts' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100/70 dark:hover:bg-gray-800/70 ${
                    isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
export default Header

