// import axios
import axios from '@src/common/services/axios'
import { toast } from 'react-toastify'

// import projects
import { failure, success } from '@src/common/services/either'
import AppError from '@src/common/services/error'

// import redux
import { dispatch } from '@src/infras/redux'

// Register service
const resgister = (data) => {
  return async () => {
    const res = await axios.post('/api/auth/register')
    if (res?.EC !== 200) return failure(new AppError(res?.EM, res?.EC))
  }
}

// Login service
const login = async (data) => {
  const res = await axios.post('/api/auth/login', { ...data })
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }
  // save data to redux
  dispatch({
    type: 'LOGIN',
    payload: {
      isLoggedIn: true,
      account: { isLoggedIn: true, token: res?.data?.DT?.token }
    }
  })

  // nofication for success
  toast.success(res?.data?.EM)

  return success(true)
}

export { resgister, login }
