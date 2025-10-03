import React from 'react'
import { useSelector } from 'react-redux'

export const PortfolioSummary: React.FC = () => {
  const items = useSelector((state: any) => state.portfolio.items)
  const totalInvested = items.reduce((sum: number, i: any) => sum + i.amount * i.buyPrice, 0)
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="text-sm text-gray-500">Total Invested</div>
      <div className="text-2xl font-semibold">${totalInvested.toLocaleString()}</div>
    </div>
  )
}
export default PortfolioSummary
