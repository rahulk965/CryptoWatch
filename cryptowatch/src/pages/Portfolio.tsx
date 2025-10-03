import React from 'react'
import PortfolioManager from '@/features/portfolio/PortfolioManager'
import PortfolioSummary from '@/features/portfolio/PortfolioSummary'

export const Portfolio: React.FC = () => (
  <main className="container-responsive space-y-4 py-6">
    <h1 className="text-2xl font-semibold">Portfolio</h1>
    <PortfolioSummary />
    <PortfolioManager />
  </main>
)
export default Portfolio
