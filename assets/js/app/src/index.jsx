// import libs
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

// import css toast
import '../node_modules/react-toastify/dist/ReactToastify.css'
import "../node_modules/react-datepicker/dist/react-datepicker.css";

// import projects
import App from '@src/App'
import { store, persister } from '@src/infras/redux'

// React Dom Render
ReactDOM.createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <BrowserRouter basename='/'>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
