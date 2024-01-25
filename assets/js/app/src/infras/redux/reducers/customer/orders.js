// third-party
import { createSlice } from '@reduxjs/toolkit'

// initial orders state
const initialState = {
  list_orders: {},
  orders_draft: [],
  orderSelect: {}
}

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // order select
    selectOrder(state, action) {
      state.orderSelect = action.payload;
    },
    addListOrders(state, action) {
      state.list_orders = action.payload
    },
    updateOrderDraft(state, action) {
      state.orders_draft = action.payload
    }
  }
})

// Reducer
export default product.reducer

export const { addListOrders, updateOrderDraft, selectOrder } = product.actions
