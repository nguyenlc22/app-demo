// import libs
import React from "react"
import { useEffect } from "react"

// import components
import OrderSearch from "@src/application/admin/pages/orders/components/OrderSearch"
import OrderTable from "@src/application/admin/pages/orders/components/OrderTable"

// import services
import { get_list_orders } from "@src/domain/services/customer/orders"

const OrderPage = (props) => {
  // 
  useEffect(() => {
    get_list_orders({})
  }, [])
  
  return (
    <React.Fragment>
      <OrderSearch />
      <OrderTable />
    </React.Fragment>
  )
}

export default OrderPage