// third-party
import { createSlice } from '@reduxjs/toolkit'

// initial products state
const initialState = {
  list_products: {}
}

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // get list products
    getListProducts(state, action) {
      // state.list_products = action.payload;
    },
    addListProducts(state, action) {
      state.list_products = action.payload
    }
  }
})

// Reducer
export default product.reducer

export const { addListProducts } = product.actions
