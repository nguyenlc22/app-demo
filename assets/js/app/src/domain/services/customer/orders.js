// import axios
import axios from '@src/common/services/axios'
import { toast } from 'react-toastify'

// import projects
import { failure, success } from '@src/common/services/either'
import AppError from '@src/common/services/error'

// import redux
import { dispatch } from '@src/infras/redux'
import { addListOrders, selectOrder } from '@src/infras/redux/reducers/customer/orders'

// get list order
const get_list_orders = async (data) => {
  const res = await axios.get('/api/customer/orders')
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }

  // save data to redux
  dispatch(addListOrders(res?.data?.DT))

  return success(true)
}

// create order service
const add_new_order = async (data) => {
  const res = await axios.post('/api/customer/orders', {...data})
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }
  // save data to redux
  // console.log(res?.data?.DT)
  toast.success(res?.data?.EM)
  
  get_list_orders({})
  return success(true)
}

// filter orders with params
const filter_orders = async (params) => {
  const path_url = Object.keys(params).reduce((currentValue, key, index) => {
    if (index < Object.keys(params).length - 1) return currentValue + `${key}=${params[key]}&`
    else return currentValue + `${key}=${params[key]}`
  }, "/api/customer/orders/filter?")

  const res = await axios.get(path_url)
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }

  // update list products
  dispatch(addListOrders(res?.data?.DT))
  return success(true)
}

// get order by id
const get_order_by_id = async (id) => {
  const res = await axios.get(`/api/customer/orders/${id}`)
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }
  // save data to redux
  dispatch(selectOrder(res?.data?.DT))
  return success(true)
}

export { add_new_order, get_list_orders, filter_orders, get_order_by_id }
