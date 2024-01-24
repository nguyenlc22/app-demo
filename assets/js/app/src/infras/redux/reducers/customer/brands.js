// third-party
import { createSlice } from '@reduxjs/toolkit'

// initial brands state
const initialState = {
  list_brands: {}
}

const brand = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    // get list brands
    getListBrands(state, action) {
      // state.list_products = action.payload;
    },
    addListBrands(state, action) {
      state.list_brands = action.payload
    }
  }
})

// Reducer
export default brand.reducer

export const { getListBrands, addListBrands } = brand.actions
