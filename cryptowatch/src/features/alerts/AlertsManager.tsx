import React, { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addRule, toggleRule } from './alertsSlice'

export const AlertsManager: React.FC = () => {
  const [coinId, setCoinId] = useState('bitcoin')
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  const rules = useSelector((s: any) => s.alerts.rules)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Input value={coinId} onChange={(e) => setCoinId(e.target.value)} placeholder="coin id" />
        <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="target price" />
        <Button onClick={() => dispatch(addRule({ id: Math.random().toString(36).slice(2), coinId, targetPrice: price, direction: 'above', active: true }))}>Add Alert</Button>
      </div>
      <ul className="space-y-2">
        {rules.map((r: any) => (
          <li key={r.id} className="flex items-center justify-between rounded border border-gray-200 p-2 text-sm dark:border-gray-800">
            <span>{r.coinId} {r.direction} ${r.targetPrice}</span>
            <Button variant="secondary" onClick={() => dispatch(toggleRule(r.id))}>{r.active ? 'Disable' : 'Enable'}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default AlertsManager
