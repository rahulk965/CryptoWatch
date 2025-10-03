import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/news-api': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/news-api/, ''),
      },
    },
  },
})
