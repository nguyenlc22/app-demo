
// import libs
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Row, Col, Nav, ListGroup, Table, Modal } from "react-bootstrap"

// import redux
import { useSelector } from '@src/infras/redux'
import { dispatch } from '@src/infras/redux'
import { selectOrder } from '@src/infras/redux/reducers/customer/orders'

import { format_money_vnd } from '@src/common/services/format'

export default OrderDetail = (props) => {
  // get data props
  const { show, setShow } = props

  // get data from redux
  const { orderSelect } = useSelector((state) => state.order)

  useEffect(() => {}, [orderSelect])

  return (
    <Modal size='lg' show={show} onHide={() => {
      setShow(false)
      dispatch(selectOrder({}))
    }} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="divider divider-start fw-medium">
          <span>Information Custoner</span>
        </div>
        <Col xl>
          <div className="d-flex justify-content-center">
            <div className="input-group mx-1">
              <span className="input-group-text">Code</span>
              <input
                disabled
                id="inputPhoneNumber" 
                type="text" name='code'
                className="form-control fw-medium" 
                defaultValue={orderSelect?.code}
                onChange={() => {}}
              />
            </div>
            <div className="input-group mx-1">
              <span className="input-group-text">Name</span>
              <input
                disabled
                id="inputPhoneNumber" 
                type="text" name='name'
                className="form-control fw-medium" 
                defaultValue={orderSelect?.customer_name}
                onChange={() => {}}
              />
            </div>
            <div className="input-group mx-1">
              <span className="input-group-text">Total Price</span>
              <input
                disabled
                id="inputPhoneNumber" 
                type="text" name='total_price'
                className="form-control fw-medium" 
                defaultValue={orderSelect?.total_price}
                onChange={() => {}}
              />
            </div>
          </div>
        </Col>
        <Col className='mt-2'>
          <div className="d-flex justify-content-center">
            <div className="input-group mx-1">
                  <span className="input-group-text">Phone</span>
                  <input
                    disabled
                    id="inputPhoneNumber" 
                    type="text" name='phone'
                    className="form-control fw-medium" 
                    defaultValue={orderSelect?.customer_phone}
                    onChange={() => {}}
                  />
            </div>
            <div className="input-group mx-1">
              <span className="input-group-text">Address</span>
              <input
                disabled
                id="inputPhoneNumber" 
                type="text" name='address'
                className="form-control fw-medium" 
                defaultValue={orderSelect?.address}
                onChange={() => {}}
              />
            </div>
          </div>
        </Col>
      
        {[
          {
            "title": "Products List",
            "products": orderSelect?.products
          }
        ].map((item, index) => (
          <div key={index}>
            <div className={"divider divider-start fw-medium" + ((index === 0) ? "mt-2" : "")}>
              <span>{item.title}</span>
            </div>
            <ListGroup as="ul" className="list-group-one">
              {item?.products && item?.products.map((item, ind) => (
                <ListGroup.Item key={ind} as="li" className="px-0 d-flex align-items-center gap-2">
                  <div className={`avatar border border-2 border-success text-success`}><i className="ri-suitcase-line"></i></div>
                  <div className='w-30'>
                    <h6 className="mb-0">{item?.product_name}</h6>
                  </div>
                  <div>
                    <h6 className="ff-numerals mb-0">Quantity</h6>
                    <small>{item?.quantity}</small>
                  </div>
                  <div className="ms-auto text-end">
                    <h6 className="ff-numerals mb-0">Price</h6>
                    <small>{format_money_vnd(item?.selling_price)}</small>
                  </div>
                  <div className="ms-auto text-end">
                    <h6 className="ff-numerals mb-0">Total</h6>
                    <small>{format_money_vnd(item?.selling_price * Number(item?.quantity))}</small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  )
}