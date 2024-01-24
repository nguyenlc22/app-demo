// import libs
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, Row, Col, Form, Button, Spinner, Container } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as _ from 'lodash'
import ReactDatePicker from "react-datepicker";

// import redux
import { useSelector } from '@src/infras/redux'
import OrderAdd from './OrderAdd'

// import components

// import services

// order search component
export default OrderSearch = (props) => {
  // init state
  const [show, setShow] = useState(false)
  const [isReset, setIsReset] = useState(false)

  // get data from redux

  // tracking range price
  useEffect(() => {
    $("#range").ionRangeSlider({
      type: 'double',
      grid: true,
      min: 0,
      max: 1000000000,
      to: 500
    })
  }, [])

  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));

  // init state formik
  const [formState, setFormState] = useState(true)

  // handle filter products
  const formik = useFormik({
    initialValues: {
      code: '',
      phone: ''
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      let slider = $("#range").data("ionRangeSlider");
      const data = {
        phone: values?.phone,
        code: values?.code,
        startDate: startDate.toLocaleString(),
        endDate: endDate.toLocaleString(),
        startPrice: slider?.result?.from,
        endPrice: slider?.result?.to
      }
      console.log('>>>Check data:', data)
      // console.log(">>>Check values:", values)
      // const _object = _.omitBy(values, _.isEmpty);
      // // console.log(">>>Check object:", _object)
      // const res = await filter_products(_object)
      // formik.setSubmitting(!res?.data)
    },
    onReset: async () => {
      // setIsReset(true)
      // const res = await get_list_products({})
      // setIsReset(!res?.data)
    }
  })

  return (
    <Card className='card-one'>
      <Card.Header>
        <Card.Title as='h6'>Orders Search</Card.Title>
      </Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <Row className='g-2'>
            <Col>
              <Form.Group controlId='phone'>
                <Form.Label>Phone Customer</Form.Label>
                <Form.Control
                  type='text'
                  name='phone'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </Form.Group>
            </Col>
      
            <Col>
              <Form.Group controlId='code'>
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type='text'
                  name='code'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.code}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='g-2 mt-2'>
            <Col>
              <Form.Group>
                <Form.Label>Date From</Form.Label>
                <div className="position-relative">
                  <ReactDatePicker
                    className="form-control w-100"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Date To</Form.Label>
                <div>
                  <ReactDatePicker
                    className="form-control w-100"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className='g-2 mt-2'>
            <Col>
              <Form.Group controlId='code'>
                <Form.Label>Range Price</Form.Label>
                <input id="range" type="text" className="js-range-slider" name="myrange"></input>
              </Form.Group>
            </Col>
          </Row>
          
          <div className='mt-3 d-flex justify-content-end'>
            <Button variant='primary' onClick={() => setShow(true)}>
              Create Order
            </Button>
            <OrderAdd show={show} setShow={setShow} />

            <Button type='submit' variant='success' className='mx-2'
              onClick={(values) => setFormState(values)}
              disabled={formik.isSubmitting}
            >
              {formik?.isSubmitting ? (
                <Spinner animation='border' role='status' size='sm'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              ) : (
                'Search'
              )}
            </Button>
            <Button variant='secondary' onClick={formik.handleReset}
              disabled={isReset}
            >
              {isReset ? (
                <Spinner animation='border' role='status' size='sm'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              ) : (
                'Clear'
              )}
            </Button>
          </div>
        </Card.Body>
      </Form>
    </Card>
  )
}
