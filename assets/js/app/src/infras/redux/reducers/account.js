// Initial account state
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  account: null
}

// Define account reducer
const accountReducer = (state = initialState, action) => {
  switch (action?.type) {
    case 'REGISTER': {
      const { account } = action?.payload
      return { ...state, account }
    }
    case 'LOGIN': {
      const { account } = action?.payload
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: true,
        account: account
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default accountReducer
