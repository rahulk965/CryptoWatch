import React from 'react'
import CryptoList from '@/components/crypto/CryptoList'

export const Market: React.FC = () => (
  <main className="container-responsive py-6 space-y-4">
    <h1 className="text-2xl font-semibold">Market</h1>
    <CryptoList />
  </main>
)
export default Market
