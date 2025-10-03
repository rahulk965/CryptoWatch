import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetCoinQuery, useGetHistoryQuery, useGetTickersQuery, useGetNewsQuery, useGetStatusUpdatesQuery, useGetCoinListQuery } from '@/services/api'
import PriceChart from '@/components/crypto/PriceChart'
import { DEFAULT_CURRENCY as CURRENCY, NEWS_API_KEY } from '@/utils/constants'
import { Skeleton, TextSkeleton } from '@/components/common/Skeleton'

export const CryptoDetails: React.FC = () => {
  const { id: rawId = '' } = useParams<{ id: string }>()
  const id = useMemo(() => decodeURIComponent(rawId), [rawId])
  const [searchParams, setSearchParams] = useSearchParams()
  const [days, setDays] = React.useState<'1' | '7' | '30' | '90' | '365' | 'max'>(
    (searchParams.get('tf') as any) || '7'
  )
  const [tab, setTab] = React.useState<'overview' | 'markets' | 'news'>(
    ((searchParams.get('tab') as any) || 'overview')
  )
  const { data: coin, isLoading, error, refetch } = useGetCoinQuery({ id, currency: CURRENCY }) as any
  const { data: history, isFetching } = useGetHistoryQuery({ id, days, currency: CURRENCY })
  const { data: tickers, isLoading: isTickersLoading } = useGetTickersQuery(
    { id },
    { skip: tab !== 'markets' || !id }
  )
  const { data: newsData, isLoading: isNewsLoading } = useGetNewsQuery({ q: coin?.name || id, pageSize: 10 }, { skip: !NEWS_API_KEY || !id })
  const { data: statusData, isLoading: isStatusLoading } = useGetStatusUpdatesQuery(
    { id, perPage: 10, page: 1 },
    { skip: tab !== 'news' || !!NEWS_API_KEY || !id }
  )
  const { data: coinList } = useGetCoinListQuery(undefined, { skip: false })
  const navigate = useNavigate()
  const [descOpen, setDescOpen] = React.useState(false)

  const [sortBy, setSortBy] = React.useState<'price' | 'spread' | 'volume' | 'trust'>('trust')
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc')

  const sortedTickers = useMemo(() => {
    const arr = [...(tickers?.tickers || [])]
    const getVal = (t: any) => {
      switch (sortBy) {
        case 'price': return t.last ?? -Infinity
        case 'spread': return t.bid_ask_spread_percentage ?? Infinity
        case 'volume': return t.volume ?? -Infinity
        case 'trust': return t.trust_score === 'green' ? 2 : t.trust_score === 'yellow' ? 1 : 0
      }
    }
    arr.sort((a, b) => {
      const va = getVal(a)
      const vb = getVal(b)
      const base = (va ?? 0) < (vb ?? 0) ? -1 : (va ?? 0) > (vb ?? 0) ? 1 : 0
      return sortDir === 'asc' ? base : -base
    })
    return arr
  }, [tickers, sortBy, sortDir])

  const toggleSort = (key: typeof sortBy) => {
    if (sortBy === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortBy(key); setSortDir('desc') }
  }

  useEffect(() => {
    const next = new URLSearchParams(searchParams)
    next.set('tf', days)
    next.set('tab', tab)
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, tab])

  const series = useMemo(() => {
    const arr: { time: number; value: number }[] = (history?.prices || []).map((p: [number, number]) => ({
      time: Math.floor(p[0] / 1000),
      value: p[1],
    }))
    return arr
  }, [history])

  if (isLoading) return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8" />
        <TextSkeleton width="w-40" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-[420px] w-full md:col-span-2" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-56" />
        </div>
      </div>
    </div>
  )
  // Show Not Found only when the API returns 404 for this coin id
  const isNotFound = (error && typeof error === 'object' && 'status' in error && (error as any).status === 404)
  if (isNotFound && coinList) {
    const q = rawId.toLowerCase()
    const candidate = coinList.find((c: any) => c.id.toLowerCase() === q || c.symbol.toLowerCase() === q || c.name.toLowerCase() === q)
    if (candidate && candidate.id !== id) {
      navigate(`/detail/${encodeURIComponent(candidate.id)}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`, { replace: true })
      return null
    }
    return (
      <div className="space-y-2">
        <div className="text-xl font-semibold">Coin not found</div>
        <div className="text-sm text-gray-500">The id "{id}" did not match a CoinGecko coin. Try selecting from the Market list.</div>
      </div>
    )
  }
  // Other errors
  if (!coin) return (
    <div className="space-y-2">
      <div className="text-xl font-semibold">Something went wrong</div>
      <button className="text-primary" onClick={() => refetch?.()}>Retry</button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <img src={coin.image?.small} alt={coin.name} className="h-8 w-8" />
        <h1 className="text-xl font-semibold sm:text-2xl">{coin.name} ({coin.symbol?.toUpperCase()})</h1>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 text-sm dark:border-gray-800">
        {([
          { k: 'overview', label: 'Overview' },
          { k: 'markets', label: 'Markets' },
          { k: 'news', label: 'News' },
        ] as const).map(t => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`rounded-md px-3 py-1 ${tab === t.k ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg border border-gray-200 p-3 sm:p-4 dark:border-gray-800">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            {[
              { k: '1', label: '24h' },
              { k: '7', label: '7d' },
              { k: '30', label: '1m' },
              { k: '90', label: '3m' },
              { k: '365', label: '1y' },
              { k: 'max', label: 'All' },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setDays(t.k as any)}
                className={`rounded-md px-2.5 py-1 ${days === t.k ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
              >
                {t.label}
              </button>
            ))}
            {isFetching && <span className="text-xs text-gray-500">Updating…</span>}
          </div>
          <PriceChart data={series as any} height={360} />
        </div>
        <div className="space-y-2 rounded-lg border border-gray-200 p-3 text-xs sm:p-4 sm:text-sm dark:border-gray-800">
          <div>Price: <b>${coin.market_data?.current_price?.[CURRENCY]?.toLocaleString?.()}</b></div>
          <div>Market Cap: <b>${coin.market_data?.market_cap?.[CURRENCY]?.toLocaleString?.()}</b></div>
          <div>24h Change: <b>{coin.market_data?.price_change_percentage_24h?.toFixed?.(2)}%</b></div>
          <div>Circulating Supply: <b>{coin.market_data?.circulating_supply?.toLocaleString?.()}</b></div>
          <div>Max Supply: <b>{coin.market_data?.max_supply?.toLocaleString?.() || '—'}</b></div>
          <div>Rank: <b>#{coin.market_cap_rank}</b></div>
        </div>
      </div>

      {/* Rich details by tab */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-3 rounded-lg border border-gray-200 p-3 sm:p-4 dark:border-gray-800 md:col-span-2">
            <h2 className="text-base font-semibold sm:text-lg">About {coin.name}</h2>
            <div className={`prose max-w-none prose-sm dark:prose-invert ${!descOpen ? 'max-h-32 overflow-hidden md:max-h-none' : ''}`} dangerouslySetInnerHTML={{ __html: coin.description?.en || 'No description available.' }} />
            {/* Show more for mobile */}
            {!descOpen && (
              <div className="md:hidden">
                <button className="text-primary text-sm" onClick={() => setDescOpen(true)}>Show more</button>
              </div>
            )}
          </div>
          <div className="space-y-3 rounded-lg border border-gray-200 p-3 text-xs sm:p-4 sm:text-sm dark:border-gray-800">
            <h3 className="font-medium">Links</h3>
            <ul className="space-y-1">
              {coin.links?.homepage?.[0] && (
                <li><a className="text-primary hover:underline" href={coin.links.homepage[0]} target="_blank" rel="noreferrer">Website</a></li>
              )}
              {coin.links?.subreddit_url && (
                <li><a className="text-primary hover:underline" href={coin.links.subreddit_url} target="_blank" rel="noreferrer">Reddit</a></li>
              )}
              {coin.links?.repos_url?.github?.[0] && (
                <li><a className="text-primary hover:underline" href={coin.links.repos_url.github[0]} target="_blank" rel="noreferrer">GitHub</a></li>
              )}
            </ul>
            <div className="mt-3 space-y-1">
              <div>Genesis Date: <b>{coin.genesis_date || '—'}</b></div>
              <div>Hashing Algorithm: <b>{coin.hashing_algorithm || '—'}</b></div>
              <div>Categories: <b>{(coin.categories || []).slice(0,3).join(', ') || '—'}</b></div>
            </div>
          </div>
        </div>
      )}

      {tab === 'markets' && (
        <div className="rounded-lg border border-gray-200 p-2 sm:p-4 text-xs sm:text-sm dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-800">
                <tr>
                  <th className="px-2 py-2 sm:px-3">Exchange</th>
                  <th className="px-2 py-2 sm:px-3">Pair</th>
                  <th className="px-2 py-2 sm:px-3 cursor-pointer" onClick={() => toggleSort('price')}>Price {sortBy==='price' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
                  <th className="px-2 py-2 sm:px-3 cursor-pointer" onClick={() => toggleSort('spread')}>Spread {sortBy==='spread' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
                  <th className="px-2 py-2 sm:px-3 cursor-pointer" onClick={() => toggleSort('volume')}>24h Volume {sortBy==='volume' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
                  <th className="px-2 py-2 sm:px-3">Last Trade</th>
                  <th className="px-2 py-2 sm:px-3 cursor-pointer" onClick={() => toggleSort('trust')}>Trust {sortBy==='trust' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
                </tr>
              </thead>
              <tbody>
                {isTickersLoading && Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-2 py-2 sm:px-3" colSpan={7}><span className="inline-block h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" /></td>
                  </tr>
                ))}
                {!isTickersLoading && sortedTickers.slice(0, 25).map((t: any, i: number) => (
                  <tr key={`${t.market?.identifier}-${t.base}-${t.target}-${i}`} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-2 py-2 sm:px-3">
                      <div className="flex items-center gap-2">
                        {t.market?.logo && <img src={t.market.logo} alt={t.market.name} className="h-4 w-4" />}
                        <span>{t.market?.name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3">{t.base}/{t.target}</td>
                    <td className="px-2 py-2 sm:px-3">{t.last ? t.last.toLocaleString() : '—'}</td>
                    <td className="px-2 py-2 sm:px-3">{t.bid_ask_spread_percentage ? `${t.bid_ask_spread_percentage.toFixed(2)}%` : '—'}</td>
                    <td className="px-2 py-2 sm:px-3">{t.volume ? t.volume.toLocaleString() : '—'}</td>
                    <td className="px-2 py-2 sm:px-3">{t.last_traded_at ? new Date(t.last_traded_at).toLocaleString() : '—'}</td>
                    <td className="px-2 py-2 sm:px-3">
                      <span className={`rounded px-2 py-0.5 text-xs ${t.trust_score === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' : t.trust_score === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'}`}>{t.trust_score || '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'news' && (
        <div className="rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-800">
          {!NEWS_API_KEY && (
            <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-300">
            
            </div>
          )}
          {NEWS_API_KEY ? (
            <div className="space-y-3">
              {isNewsLoading && Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              ))}
              {!isNewsLoading && (newsData?.articles || []).slice(0, 10).map((a: any, idx: number) => (
                <a key={idx} href={a.url} target="_blank" rel="noreferrer" className="block rounded-md border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-gray-500">{new Date(a.publishedAt).toLocaleString()} · {a.source?.name}</div>
                </a>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {isStatusLoading && Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              ))}
              {!isStatusLoading && (statusData?.status_updates || []).slice(0, 10).map((s: any, idx: number) => (
                <div key={idx} className="rounded-md border border-gray-200 p-3 dark:border-gray-800">
                  <div className="font-medium">{s.project?.name || coin?.name}</div>
                  <div className="text-xs text-gray-500">{new Date(s.created_at).toLocaleString()} · {s.user_title}</div>
                  <div className="mt-1">{s.description}</div>
                  {s.article_url && <a className="text-primary text-xs hover:underline" href={s.article_url} target="_blank" rel="noreferrer">Read more</a>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default CryptoDetails
