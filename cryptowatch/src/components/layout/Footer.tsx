import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 border-t border-gray-100 bg-gradient-to-b from-transparent to-gray-50 py-6 text-sm text-gray-600 dark:border-gray-800 dark:to-gray-900">
      <div className="container-responsive flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          {new Date().getFullYear()} <span className="font-medium text-gray-700 dark:text-gray-300">Cryptowatch</span>. All rights reserved.
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
          <a className="rounded px-1.5 py-0.5 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:hover:text-gray-300" href="/market">Market</a>
          <span className="hidden h-3 w-px bg-gray-300 md:inline-block" />
          <a className="rounded px-1.5 py-0.5 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:hover:text-gray-300" href="/portfolio">Portfolio</a>
          <span className="hidden h-3 w-px bg-gray-300 md:inline-block" />
          <a className="rounded px-1.5 py-0.5 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:hover:text-gray-300" href="/alerts">Alerts</a>
        </nav>
      </div>
    </footer>
  )
}
export default Footer

