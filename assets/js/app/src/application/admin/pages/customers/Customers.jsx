// import libs
import React from "react"
import { useEffect } from "react"

// import components
import CustomerTable from "@src/application/admin/pages/customers/components/CustomerTable"

// import services
import { get_list_customers } from "@src/domain/services/customer"

const Customerpage = (props) => {
  // 
  useEffect(() => {
    get_list_customers({})
  }, [])

  return (
    <CustomerTable />
  )
}

export default Customerpage