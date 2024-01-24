// import libs
import React from 'react'
import { Card, Table, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// import redux
import { useSelector } from '@src/infras/redux'
import { format_money_vnd } from '@src/common/services/format'

// define product table component
export default ProductTable = () => {
  // get data from redux
  const { list_products } = useSelector((state) => state?.product)

  // 
  useEffect(() => {
    // console.log(">>>Check data:", list_products?.entries)
  }, [list_products])

  return (
    <Card className='card-one mt-2'>
      <Card.Header>
        <Card.Title as='h6'>Products List</Card.Title>
        {/* <Nav className="nav-icon nav-icon-sm ms-auto">
          <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
          <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
        </Nav> */}
      </Card.Header>
      <Table className='table-agent mb-0' responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Brand Name</th>
            {/* <th>Available</th>
            <th>Sold</th> */}
            <th>Selling Price</th>
            <th>Action</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {list_products && list_products?.entries && list_products?.entries.map((item, index) => (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center gap-2'>
                  <div className='product-thumb'>
                    <img src={item?.avatar || ''} alt='' />
                  </div>
                  <div>
                    <h6 className='mb-0'>{item?.name}</h6>
                    {/* <span className='fs-xs text-secondary'>{item.description}</span> */}
                  </div>
                </div>
              </td>
              <td>
                <span className='ff-numerals'>{item?.code}</span>
              </td>
              <td>
                <span className='fw-medium text-dark ff-numerals'>{item?.brand_name}</span>
              </td>
              {/* <td>
                <span className='fw-medium text-dark ff-numerals'>{item.available}</span>
              </td>
              <td>
                <span className='fw-medium text-dark ff-numerals'>{item.sold}</span>
              </td> */}
              <td>
                <span className='fw-medium text-dark ff-numerals'>{format_money_vnd(item.selling_price)}</span>
              </td>
              <td>
                <div className="row">
                  <Button variant="primary" className="btn-icon mx-1"><i className="ri-add-line"></i></Button>
                  <Button variant="secondary" className="btn-icon"><i className="ri-pencil-fill"></i></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
