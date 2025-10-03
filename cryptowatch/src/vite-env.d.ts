/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_WS_URL?: string
  readonly VITE_DEFAULT_CURRENCY?: string
  readonly VITE_NEWS_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
