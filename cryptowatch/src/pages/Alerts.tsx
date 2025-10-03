import React from 'react'
import AlertsManager from '@/features/alerts/AlertsManager'

export const Alerts: React.FC = () => (
  <main className="container-responsive space-y-4 py-6">
    <h1 className="text-2xl font-semibold">Alerts</h1>
    <AlertsManager />
  </main>
)
export default Alerts
