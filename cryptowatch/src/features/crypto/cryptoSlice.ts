import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  favoriteIds: string[]
}

const initialState: State = {
  favoriteIds: [],
}

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter(x => x !== id)
      } else {
        state.favoriteIds.push(id)
      }
    },
  },
})

export const { toggleFavorite } = cryptoSlice.actions
export default cryptoSlice.reducer
