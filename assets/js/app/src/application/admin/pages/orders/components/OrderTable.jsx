// import libs
import React, { useState } from 'react'
import { Card, Table, Nav, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import _ from 'lodash'

// import redux
import { useSelector } from '@src/infras/redux'
import { dispatch } from '@src/infras/redux'

// import components
import OrderDetail from '@src/application/admin/pages/orders/components/OrderDetail'

// import services
import { get_order_by_id } from '@src/domain/services/customer/orders'
import { format_money_vnd } from '@src/common/services/format'

// define Order table component
export default OrderTable = (props) => {
  const [show, setShow] = useState(false)
  // get data from redux
  const { list_orders } = useSelector((state) => state?.order)
  // 
  useEffect(() => {
    // console.log(">>>Check data:", list_orders?.entries)
  }, [list_orders])

  return (
    <Card className='card-one mt-2'>
      <Card.Header>
        <Card.Title as='h6'>Orders List</Card.Title>
      </Card.Header>
      <Table className='table-agent mb-0' responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th scope='col-2'>Code</th>
            {/* <th>Address</th> */}
            <th>Total Price</th>
            <th>Created time</th>
            <th>Action</th>
            {/* <th>&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {list_orders && list_orders?.entries && list_orders?.entries.map((item, index) => (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center gap-2'>
                  <div>
                    <h6 className='mb-0'>{item?.customer_name}</h6>
                  </div>
                </div>
              </td>
              <td>
                <span className='ff-numerals'>{item?.customer_phone}</span>
              </td>
              <td width={10}>
                <span className='fw-medium text-dark ff-numerals'>{item?.code}</span>
              </td>
              {/* <td>
                <span className='fw-medium text-dark ff-numerals'>{item?.address}</span>
              </td> */}
              <td>
                <span className='fw-medium text-dark ff-numerals'>{format_money_vnd(item?.total_price)}</span>
              </td>
              <td>
                <span className='fw-medium text-dark ff-numerals'>{item?.inserted_at}</span>
              </td>
              <td>
                <div className="row d-flex">
                  <Button variant="primary" className="btn-icon mx-1"
                    onClick={() => {
                      setShow(true)
                      get_order_by_id(item?.id)
                    }}>
                    <i className="ri-more-line"></i>
                  </Button>
                  <OrderDetail 
                    show={show}
                    setShow={setShow}
                  />
                  {/* <Button variant="secondary" className="btn-icon mx-1"
                    onClick={() => {}}>
                    <i className="ri-export-line"></i>
                  </Button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
