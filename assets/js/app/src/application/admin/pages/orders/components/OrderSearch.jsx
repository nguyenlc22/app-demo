// import libs
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, Row, Col, Form, Button, Spinner, Container } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import ReactDatePicker from "react-datepicker";
import moment from 'moment'

// import redux
import { useSelector } from '@src/infras/redux'
import OrderAdd from './OrderAdd'

// import components

// import services
import { filter_orders, get_list_orders } from '@src/domain/services/customer/orders'

// order search component
export default OrderSearch = (props) => {
  // init state
  const [show, setShow] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [checkedTime, setCheckedTime] = useState(false)
  const [checkedPrice, setCheckedPrice] = useState(false)

  // get data from redux

  // tracking range price
  useEffect(() => {
    $("#range").ionRangeSlider({
      type: 'double',
      grid: true,
      min: 0,
      max: 1000000,
      to: 500
    })
  }, [checkedPrice])

  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));

  // init state formik
  const [formState, setFormState] = useState(true)


  const convertDateToTimeStamp = (value) => {
    const date = new Date(value);
    // ✅ If you need to convert to Seconds
    const timestampSeconds = Math.floor(date.getTime() / 1000);
    return new Date(timestampSeconds * 1000).toISOString().slice(0, 19)
  }

  // handle filter products
  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone: '',
      code: '',
      inserted_at: [],
      total_price: []
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      let valuesClone = _.cloneDeep(values)
      // processing data for search date range
      if (checkedTime) 
        valuesClone = {
          ...valuesClone, 
          inserted_at: [
            startDate.toISOString().replace('T', ' '),
            endDate.toISOString().replace('T', ' ')
          ]
        }
    
      if (checkedPrice) {
        let slider = $("#range").data("ionRangeSlider");
        valuesClone = {
          ...valuesClone, 
          total_price: [slider?.result?.from, slider?.result?.to]
        }
      }
      console.log(valuesClone)
      const _object = _.omitBy(valuesClone, _.isEmpty)
      // check if search with date time

      console.log(">>>Check object:", _object)
      const res = await filter_orders(_object)
      formik.setSubmitting(!res?.data)
    },
    onReset: async () => {
      setIsReset(true)
      const res = await get_list_orders({})
      setIsReset(!res?.data)
    }
  })

  return (
    <Card className='card-one'>
      <Card.Header>
        <Card.Title as='h6'>Orders Search</Card.Title>
      </Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <ul className="legend mb-3 d-flex">
            <Form.Check checked={checkedTime} type="switch" label="Search with range date" onChange={() => {
              setCheckedTime(!checkedTime)
              get_list_orders({})
            }} />
            <Form.Check checked={checkedPrice} className='mx-4' type="switch" label="Search with range price" onChange={() => {
              setCheckedPrice(!checkedPrice)
              get_list_orders({})
            }} />
          </ul>
          <Row className='g-2'>
            <Col>
              <Form.Group controlId='full_name'>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type='text'
                  name='full_name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.full_name}
                />
              </Form.Group>
            </Col>
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

          {checkedTime && 
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
          }

          {checkedPrice && 
            <Row className='g-2 mt-2'>
              <Col>
                <Form.Group controlId='code'>
                  <Form.Label>Range Price</Form.Label>
                  <input id="range" type="text" className="js-range-slider" name="myrange"></input>
                </Form.Group>
              </Col>
            </Row>
          }
          
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
