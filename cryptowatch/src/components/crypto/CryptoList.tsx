import React, { useMemo, useState } from 'react'
import { useGetMarketQuery, useGetTrendingQuery } from '@/services/api'
import CryptoCard from './CryptoCard'
import SearchBar from '@/components/common/SearchBar'
import { useNavigate } from 'react-router-dom'
import { CardSkeleton } from '@/components/common/Skeleton'

export const CryptoList: React.FC = () => {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, error, refetch } = useGetMarketQuery({ currency: 'usd', perPage: 50 }) as any
  const { data: trending, isLoading: isTrendingLoading } = useGetTrendingQuery()
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return (data || []).filter((c: any) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.symbol.toLowerCase().includes(query.toLowerCase())
    )
  }, [data, query])

  if (isLoading) return (
    <div className="space-y-3">
      <SearchBar value={query} onChange={setQuery} placeholder="Search coins" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
  if (isError) return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 font-medium">Error loading market data.</div>
        {error && (
          <div className="text-xs text-gray-500">
            {('status' in error) ? `Status: ${(error as any).status}` : ''}
          </div>
        )}
        <button className="text-primary" onClick={() => refetch()}>Retry</button>
      </div>

      <div>
        <div className="mb-2 font-medium">Trending coins (fallback)</div>
        {isTrendingLoading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (<CardSkeleton key={i} />))}
          </div>
        )}
        {!isTrendingLoading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(trending?.coins || []).map((c: any) => (
              <button
                key={c.item.id}
                onClick={() => navigate(`/detail/${c.item.id}`)}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-left hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <img src={c.item.thumb} alt={c.item.name} className="h-6 w-6 rounded-full" />
                  <div>
                    <div className="font-semibold tracking-tight">{c.item.name} <span className="text-xs text-gray-500">{c.item.symbol.toUpperCase()}</span></div>
                    <div className="text-xs text-gray-500">Rank: {c.item.market_cap_rank ?? '-'}</div>
                  </div>
                </div>
                <span className="text-xs text-primary">Open</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-3">
      <SearchBar value={query} onChange={setQuery} placeholder="Search coins" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item: any) => (
          <CryptoCard key={item.id} item={item} onClick={() => navigate(`/detail/${item.id}`)} />
        ))}
      </div>
    </div>
  )
}
export default CryptoList
