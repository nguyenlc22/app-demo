// import axios
import axios from '@src/common/services/axios'
import { toast } from 'react-toastify'

// import projects
import { failure, success } from '@src/common/services/either'
import AppError from '@src/common/services/error'

// import redux
import { dispatch } from '@src/infras/redux'
import { addListProducts } from '@src/infras/redux/reducers/customer/products'

// get list products service
const get_list_products = async (data) => {
  const res = await axios.get('/api/customer/products')
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }
  // save data to redux
  // console.log(res?.data?.DT)
  dispatch(addListProducts(res?.data?.DT))

  return success(true)
}

// add new product
const add_new_product = async (data) => {
  const res = await axios.post('/api/customer/products', {...data})
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }

  // reload list products
  get_list_products({})
  // nofication for success
  toast.success(res?.data?.EM)
  return success(true)
}

// filter products with params
const filter_products = async (params) => {
  const path_url = Object.keys(params).reduce((currentValue, key, index) => {
    if (index < Object.keys(params).length - 1) return currentValue + `${key}=${params[key]}&`
    else return currentValue + `${key}=${params[key]}`
  }, "/api/customer/products/filter?")

  const res = await axios.get(path_url)
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }

  // update list products
  dispatch(addListProducts(res?.data?.DT))
  return success(true)
}

export { get_list_products, add_new_product, filter_products }
