import React from 'react'
import CryptoDashboard from '@/features/crypto/CryptoDashboard'

export const Home: React.FC = () => {
  return (
    <main className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-gradient-to-br from-indigo-50 via-white to-white p-8 dark:border-gray-800/70 dark:from-indigo-950/30 dark:via-gray-900 dark:to-gray-900">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Track, analyze, and stay ahead of the crypto market</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Real-time prices for 200+ coins, interactive charts, and a portfolio you control. Simple for newcomers, powerful for pros.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/market" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-600">Browse Market</a>
            <a href="/portfolio" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800">Manage Portfolio</a>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
      </section>

      {/* Quick Stats (static placeholders; can be wired to global stats endpoint) */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Coins Tracked', value: '200+' },
          { label: '24h Volume', value: '$50B+' },
          { label: 'Active Alerts', value: '—' },
          { label: 'Theme', value: 'Light/Dark' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200/70 bg-white p-4 text-center shadow-sm dark:border-gray-800/70 dark:bg-gray-900">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className="mt-1 text-lg font-semibold">{s.value}</div>
          </div>
        ))}
      </section>

      {/* Dashboard */}
      <CryptoDashboard />
    </main>
  )
}
export default Home
