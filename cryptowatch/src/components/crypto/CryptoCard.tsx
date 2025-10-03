import React from 'react'
import type { Crypto } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/formatters'

type Props = {
  item: Crypto
  onClick?: () => void
}

export const CryptoCard: React.FC<Props> = ({ item, onClick }) => {
  const change = item.price_change_percentage_24h || 0
  const changeColor = change >= 0 ? 'text-success' : 'text-danger'
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-gray-200/70 bg-white p-4 text-left shadow-sm transition-all hover:translate-y-[-1px] hover:shadow-md dark:border-gray-800/70 dark:bg-gray-900"
    >
      <div className="flex items-center gap-3">
        <img src={item.image} alt={item.name} className="h-8 w-8" />
        <div>
          <div className="font-semibold tracking-tight">{item.name} <span className="text-xs text-gray-500">{item.symbol.toUpperCase()}</span></div>
          <div className={`mt-0.5 inline-flex items-center rounded px-1.5 py-0.5 text-xs ${change >= 0 ? 'bg-green-50 text-success dark:bg-green-900/20' : 'bg-red-50 text-danger dark:bg-red-900/20'}`}>{formatPercent(change)}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold tabular-nums">{formatCurrency(item.current_price)}</div>
        <div className="text-xs text-gray-500">MC: {item.market_cap ? item.market_cap.toLocaleString() : '-'}</div>
      </div>
    </button>
  )
}
export default CryptoCard
