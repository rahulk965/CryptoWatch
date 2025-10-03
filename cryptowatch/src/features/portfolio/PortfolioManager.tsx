import React, { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useDispatch } from 'react-redux'
import { addItem } from './portfolioSlice'

export const PortfolioManager: React.FC = () => {
  const [id, setId] = useState('bitcoin')
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()

  return (
    <div className="space-y-2 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="grid grid-cols-3 gap-2">
        <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="coin id" />
        <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} placeholder="amount" />
        <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="buy price" />
      </div>
      <Button onClick={() => dispatch(addItem({ id, amount, buyPrice: price }))}>Add to Portfolio</Button>
    </div>
  )
}
export default PortfolioManager
