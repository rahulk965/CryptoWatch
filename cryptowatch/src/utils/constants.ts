export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.coingecko.com/api/v3'
export const DEFAULT_CURRENCY = import.meta.env.VITE_DEFAULT_CURRENCY || 'usd'
export const WS_URL = import.meta.env.VITE_WS_URL || ''
export const WS_TOP_SYMBOLS = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'ripple']
// Prefer VITE_NEWS_API_KEY (correct for Vite). Fallback to NEWS_API_KEY to be forgiving.
export const NEWS_API_KEY = (import.meta.env.VITE_NEWS_API_KEY || (import.meta.env as any).NEWS_API_KEY || '')
// CoinGecko: only set if provided. Do not send an invalid demo key by default.
export const COINGECKO_API_KEY = (import.meta.env.VITE_COINGECKO_API_KEY || '')
// Optional: throttle (ms) between CoinGecko requests to avoid 429. Default 350ms.
export const CG_THROTTLE_MS: number = Number(import.meta.env.VITE_CG_THROTTLE_MS || 350)
