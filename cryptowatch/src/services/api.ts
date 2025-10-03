import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '@/utils/constants'
import type { Crypto } from '@/types'
import { NEWS_API_KEY } from '@/utils/constants'
import { COINGECKO_API_KEY } from '@/utils/constants'
import { CG_THROTTLE_MS } from '@/utils/constants'

// Base query without global header mutation
const rawBaseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL })

const baseQueryWithRetry: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const maxRetries = 3
  let attempt = 0
  let lastResult: any
  // Lightweight global throttle to avoid hitting CoinGecko rate limits.
  // Ensures at least THROTTLE_MS between outbound requests across this module.
  const THROTTLE_MS = CG_THROTTLE_MS
  const now = Date.now()
  const waitMs = Math.max(0, (globalThis as any).__cg_last_req_ts__ ? ((globalThis as any).__cg_last_req_ts__ + THROTTLE_MS - now) : 0)
  if (waitMs > 0) {
    await new Promise((r) => setTimeout(r, waitMs))
  }
  ;(globalThis as any).__cg_last_req_ts__ = Date.now()
  // Prepare args and conditionally attach CoinGecko headers only when calling CoinGecko
  let preparedArgs: any = args
  const ensureObjArgs = (a: any) => (typeof a === 'string' ? { url: a } : { ...a })
  const isCoinGeckoUrl = (u: string) => {
    // Relative URLs go to baseUrl which is CoinGecko in our app
    if (u.startsWith('/')) {
      // Exclude NewsAPI proxy path
      if (u.startsWith('/news-api')) return false
      return true
    }
    try {
      const host = new URL(u).host
      return /(^|\.)api\.coingecko\.com$/i.test(host)
    } catch {
      return false
    }
  }

  while (attempt < maxRetries) {
    preparedArgs = ensureObjArgs(args)
    const urlStr = preparedArgs.url as string
    // If targeting the NewsAPI proxy, convert to absolute origin URL so baseUrl is not prefixed
    if (urlStr && urlStr.startsWith('/news-api')) {
      try {
        const origin = (typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : ''
        if (origin) {
          preparedArgs.url = origin + urlStr
        }
      } catch {}
    }
    if (COINGECKO_API_KEY && urlStr && isCoinGeckoUrl(urlStr)) {
      const existing = preparedArgs.headers || {}
      preparedArgs.headers = { ...existing, 'x-cg-demo-api-key': COINGECKO_API_KEY }
    }

    lastResult = await rawBaseQuery(preparedArgs, api, extraOptions)
    const err = (lastResult as any)?.error
    if (!err) return lastResult
    const status = (err as any).status
    // Gracefully handle missing status_updates as empty
    if (status === 404 && typeof urlStr === 'string' && /\/status_updates(\?|$)/.test(urlStr)) {
      return { data: { status_updates: [] } } as any
    }
    const retriable = status === 429 || (typeof status === 'number' && status >= 500)
    if (!retriable) return lastResult
    // If 429, try to respect Retry-After header when present
    let delayMs = 400 * (attempt + 1)
    try {
      const retryAfter = (err as any)?.meta?.response?.headers?.get?.('retry-after')
      if (status === 429 && retryAfter) {
        const ra = Number(retryAfter)
        if (!Number.isNaN(ra) && ra > 0) {
          delayMs = Math.max(delayMs, ra * 1000)
        }
      }
    } catch {}
    await new Promise((r) => setTimeout(r, delayMs))
    attempt++
  }
  return lastResult
}

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: baseQueryWithRetry,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  keepUnusedDataFor: 300, // seconds
  endpoints: (builder) => ({
    getMarket: builder.query<Crypto[], { currency: string; perPage?: number }>({
      query: ({ currency, perPage = 50 }) =>
        `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1`,
    }),
    getCoin: builder.query<any, { id: string; currency: string }>({
      query: ({ id, currency }) => `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
    }),
    getHistory: builder.query<any, { id: string; days: string; currency: string }>({
      query: ({ id, days, currency }) => `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    }),
    getTickers: builder.query<any, { id: string }>({
      query: ({ id }) => `/coins/${id}/tickers?include_exchange_logo=true`,
      // Retain data longer and avoid frequent refetches
      keepUnusedDataFor: 600,
    }),
    getStatusUpdates: builder.query<any, { id: string; perPage?: number; page?: number }>({
      query: ({ id, perPage = 20, page = 1 }) => `/coins/${id}/status_updates?per_page=${perPage}&page=${page}`,
    }),
    getNews: builder.query<any, { q: string; pageSize?: number }>({
      // Route via Vite dev proxy to avoid CORS in development
      query: ({ q, pageSize = 10 }) => `/news-api/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
    }),
    getCoinList: builder.query<Array<{ id: string; symbol: string; name: string }>, void>({
      query: () => `/coins/list`,
    }),
    getTrending: builder.query<any, void>({
      query: () => `/search/trending`,
    }),
  }),
})

export const { useGetMarketQuery, useGetCoinQuery, useGetHistoryQuery, useGetTickersQuery, useGetStatusUpdatesQuery, useGetNewsQuery, useGetCoinListQuery, useGetTrendingQuery } = cryptoApi
