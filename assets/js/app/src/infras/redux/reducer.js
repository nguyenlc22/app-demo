// import libs
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import reducers
import accountReducer from '@src/infras/redux/reducers/account'
import customerReducer from '@src/infras/redux/reducers/customer'
import productReducer from '@src/infras/redux/reducers/customer/products'
import brandReducer from '@src/infras/redux/reducers/customer/brands'
import orderReducer from '@src/infras/redux/reducers/customer/orders'

// Initail reducers
const reducer = combineReducers({
  account: persistReducer(
    {
      key: 'account',
      storage,
      keyPrefix: 'app-'
    },
    accountReducer
  ),
  product: productReducer,
  brand: brandReducer,
  customer: customerReducer,
  order: orderReducer
})

export default reducer
