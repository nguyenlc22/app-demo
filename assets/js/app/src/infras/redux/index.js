// import libs
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { persistStore } from 'redux-persist'

// import root reducer
import rootReducer from '@src/infras/redux/reducer'

// configure store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
})

// configure persiststore
const persister = persistStore(store)

const { dispatch } = store

const useDispatch = () => useAppDispatch()

const useSelector = useAppSelector

export { store, persister, dispatch, useSelector, useDispatch }
