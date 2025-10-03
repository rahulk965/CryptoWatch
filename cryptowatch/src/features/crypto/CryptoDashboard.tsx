import React from 'react'
import CryptoList from '@/components/crypto/CryptoList'

export const CryptoDashboard: React.FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Top Cryptocurrencies</h2>
      <CryptoList />
    </section>
  )
}
export default CryptoDashboard
