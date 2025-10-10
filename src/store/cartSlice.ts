import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartState, Product } from '../types'

const initialState: CartState = { items: {} }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload
      const prev = state.items[product.id] ?? 0
      state.items[product.id] = prev + quantity
    },
    removeItem: (state, action: PayloadAction<{ productId: string }>) => {
      delete state.items[action.payload.productId]
    },
    setQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      if (quantity <= 0) delete state.items[productId]
      else state.items[productId] = quantity
    },
    clearCart: (state) => { state.items = {} },
  },
})

export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
