// import libs
import React from 'react'
import { useEffect } from 'react'

// import components
import ProductTable from '@src/application/admin/pages/products/components/ProductTable'
import ProductSearch from '@src/application/admin/pages/products/components/ProductSearch'

// import redux
import { useSelector } from '@src/infras/redux'
import { get_list_products } from '@src/domain/services/customer/products'
import { get_list_brands } from '@src/domain/services/customer/brands'

// initial prodcuts page
const ProductPage = (props) => {
  // get data from redux
  //
  useEffect(() => {
    get_list_products({})
    get_list_brands({})
  }, [])

  // tracking products data change

  return (
    <React.Fragment>
      <ProductSearch isAdd={true}/>
      <ProductTable />
    </React.Fragment>
  )
}

export default ProductPage
