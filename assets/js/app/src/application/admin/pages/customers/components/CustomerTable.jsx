// import libs
import React from 'react'
import { Card, Table, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// import redux
import { useSelector } from '@src/infras/redux'
import { format_money_vnd } from '@src/common/services/format'

// define customer table component
export default CustomerTable = () => {
  // get data from redux
  const { list_customers } = useSelector((state) => state?.customer)

  // 
  useEffect(() => {
    // console.log(">>>Check data:", list_customers?.entries)
  }, [list_customers])

  return (
    <Card className='card-one mt-2'>
      <Card.Header>
        <Card.Title as='h6'>Customers List</Card.Title>
        {/* <Nav className="nav-icon nav-icon-sm ms-auto">
          <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
          <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
        </Nav> */}
      </Card.Header>
      <Table className='table-agent mb-0' responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Birth</th>
            <th>Action</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {list_customers && list_customers?.entries && list_customers?.entries.map((item, index) => (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center gap-2'>
                  <div className='product-thumb'>
                    <img src={item?.avatar || ''} alt='' />
                  </div>
                  <div>
                    <h6 className='mb-0'>{item?.full_name}</h6>
                  </div>
                </div>
              </td>
              <td>
                <span className='ff-numerals'>{item?.phone}</span>
              </td>
              <td>
                <span className='fw-medium text-dark ff-numerals'>{item?.address}</span>
              </td>
              <td>
                <span className='fw-medium text-dark ff-numerals'>{item?.birth}</span>
              </td>
              <td>
                <div className="row">
                  <Button variant="primary" className="btn-icon mx-1"><i className="ri-menu-line"></i></Button>
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
