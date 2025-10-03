import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { PortfolioItem } from '@/types'

interface State {
  items: PortfolioItem[]
}

const initialState: State = {
  items: [],
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PortfolioItem>) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.amount += action.payload.amount
        existing.buyPrice = action.payload.buyPrice
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
  },
})

export const { addItem, removeItem } = portfolioSlice.actions
export default portfolioSlice.reducer
