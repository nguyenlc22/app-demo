// third-party
import { createSlice } from '@reduxjs/toolkit'

// initial brands state
const initialState = {
  list_customers: {}
}

const customer = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // get list customers
    getListCustomers(state, action) {
      // state.list_products = action.payload;
    },
    addListCustomers(state, action) {
      state.list_customers = action.payload
    }
  }
})

// Reducer
export default customer.reducer

export const { getListCustomers, addListCustomers } = customer.actions
