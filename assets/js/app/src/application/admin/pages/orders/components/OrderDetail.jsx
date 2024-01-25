
// import libs
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Row, Col, Nav, ListGroup, Table, Modal } from "react-bootstrap"

// import redux
import { useSelector } from '@src/infras/redux'

import { format_money_vnd } from '@src/common/services/format'

export default OrderDetail = (props) => {
  // get data props
  const { show, setShow } = props

  // get data from redux
  const { orderSelect } = useSelector((state) => state.order)

  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col xl>
          <div className="d-flex justify-content-center">
            <p className="d-sm-flex align-items-center mb-2 mx-2">
              <span className="fs-sm">Code: <strong>{orderSelect?.code}</strong></span>
            </p>

            <p className="d-sm-flex align-items-center mb-2 mx-4">
              <span className="fs-sm">Name: <strong>{orderSelect?.customer_name}</strong></span>
            </p>

            <p className="d-sm-flex align-items-center mb-2 mx-4">
              <span className="fs-sm">Phone: <strong>{orderSelect?.customer_phone}</strong></span>
            </p>

            <p className="d-sm-flex align-items-center mb-2 mx-2">
              <span className="fs-sm">Address: <strong>{orderSelect?.address}</strong></span>
            </p>

            {/* <div className='d-flex mx-2'>
              <h6 className="fs-sm text-secondary mb-0">Customer Name</h6>
              <h6 className="fw-semibold text-dark mb-1">{orderSelect?.customer_name}</h6>
            </div>
            <div className='mx-4'>
              <h6 className="fs-sm text-secondary mb-0">Phone</h6>
              <p className="fw-semibold text-dark mb-1">{orderSelect?.customer_phone}</p>
            </div>
            <div className='mx-2'>
              <h6 className="fs-sm text-secondary mb-0">Address</h6>
              <p className="fw-semibold text-dark mb-1">{orderSelect?.address}</p>
            </div> */}
          </div>
        </Col>
        {[
          {
            "title": "Products List",
            "products": orderSelect?.products
          }
        ].map((item, index) => (
          <React.Fragment key={index}>
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
          </React.Fragment>
        ))}
      </Modal.Body>
    </Modal>
  )
}