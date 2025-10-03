import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import cryptoReducer from '@/features/crypto/cryptoSlice'
import portfolioReducer from '@/features/portfolio/portfolioSlice'
import alertsReducer from '@/features/alerts/alertsSlice'
import { cryptoApi } from '@/services/api'

const isDev = import.meta.env.DEV

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    portfolio: portfolioReducer,
    alerts: alertsReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault({
      // These checks are helpful but can be expensive with large API payloads/graphs in dev.
      // They are disabled in production by default.
      immutableCheck: isDev ? { warnAfter: 128 } : false,
      serializableCheck: isDev ? { warnAfter: 128 } : false,
    }).concat(cryptoApi.middleware),
})

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
