// import axios
import axios from '@src/common/services/axios'
import { toast } from 'react-toastify'

// import projects
import { failure, success } from '@src/common/services/either'
import AppError from '@src/common/services/error'

// import redux
import { dispatch } from '@src/infras/redux'
import { addListBrands } from '@src/infras/redux/reducers/customer/brands'

// get list brands service
const get_list_brands = async (data) => {
  const res = await axios.get('/api/customer/brands')
  if (res?.data?.EC !== 200) {
    toast.error(res?.data?.EM)
    return failure(new AppError(res?.data?.EM, res?.data?.EC))
  }
  // save data to redux
  // console.log(res?.data?.DT)
  dispatch(addListBrands(res?.data?.DT))

  return success(true)
}

export { get_list_brands }
