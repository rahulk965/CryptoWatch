import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Detail from '@/pages/Detail'
import Portfolio from '@/pages/Portfolio'
import Alerts from '@/pages/Alerts'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-white to-gray-50 text-gray-900 dark:from-black dark:via-gray-950 dark:to-gray-900 dark:text-foreground-dark">
      <Header />
      <main className="container-responsive w-full flex-1 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
