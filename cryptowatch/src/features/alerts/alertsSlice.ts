import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AlertRule } from '@/types'

interface State {
  rules: AlertRule[]
}

const initialState: State = { rules: [] }

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addRule(state, action: PayloadAction<AlertRule>) {
      state.rules.push(action.payload)
    },
    toggleRule(state, action: PayloadAction<string>) {
      const r = state.rules.find(x => x.id === action.payload)
      if (r) r.active = !r.active
    },
  },
})

export const { addRule, toggleRule } = alertsSlice.actions
export default alertsSlice.reducer
