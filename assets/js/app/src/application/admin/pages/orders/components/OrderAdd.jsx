// import libs
import React, { useEffect, useState } from "react"
import { Modal, Spinner, Form, Col, Row, Card, Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'

// import components
import ProductTable from '@src/application/admin/pages/products/components/ProductTable'
import ProductSearch from '@src/application/admin/pages/products/components/ProductSearch'

// import redux
import { useSelector } from '@src/infras/redux'
import { dispatch } from '@src/infras/redux'
import { updateOrderDraft } from '@src/infras/redux/reducers/customer/orders'

// import services
import { get_list_products } from '@src/domain/services/customer/products'
import { get_list_brands } from '@src/domain/services/customer/brands'
import { get_list_customers } from "@src/domain/services/customer"
import { add_new_order } from "@src/domain/services/customer/orders"

// import function
import { format_money_vnd } from '@src/common/services/format'

export default OrderAdd = (props) => {
  // get data props
  const { show, setShow } = props

  // get data from redux
  const { list_customers } = useSelector((state) => state?.customer)
  const { orders_draft } = useSelector((state) => state?.order)

  // useEffect
  useEffect(() => {
    get_list_products({})
    get_list_brands({})
    get_list_customers({})
  }, [])

  // init state formik
  const [formState, setFormState] = useState(true)
  const formik = useFormik({
    initialValues: {
      customer: '',
      address: ''
    },
    validationSchema: Yup.object({
      customer: Yup.string().required('Customer is required!'),
      address: Yup.string().required('Address is required!'),
    }),
    onSubmit: async (values) => {
      if (orders_draft.length === 0) return
      // console.log(">>>Check values:", values)
      // Generate random numbers for order
      const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase()
      const randomNumbers = Math.floor(1000 + Math.random() * 90000)
      // console.log(">>>Check data draft:", orders_draft)
      const total_price = orders_draft.reduce((currentValue, item) => {
        return currentValue + item?.quantity*item?.price
      }, 0)
      const data_order = {
        code: randomTxt + randomNumbers,
        customer_id: Number(values?.customer),
        total_price: total_price,
        address: values?.address
      }
      // console.log(">>>Check data:", data_order, orders_draft)
      // processing date order detail
      const _randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase()
      const _randomNumbers = Math.floor(1000 + Math.random() * 90000)
      // console.log(data_order)
      let data_order_detail = []
      orders_draft.map(item => {
        const data = {
          product_id: Number(item?.id),
          bill_code: _randomTxt + _randomNumbers,
          selling_price: item?.price,
          quantity: item?.quantity.toString(),
          product_name: item?.name
        }
        data_order_detail.push(data)
      })

      const dataAdd = { data_order: data_order, data_order_detail: data_order_detail}
      const res = await add_new_order(dataAdd)
      if (res?.data) setShow(false)
      formik.setSubmitting(!res?.data)
    }
  })

  // handle update products order
  const handleUpdateOrderDraft = (data, type) => {
    // console.log(">>>Check data:", data)
    let draftClone = _.cloneDeep(orders_draft)
    if (type === 'add') {
      _.set(_.find(draftClone, {id: data?.id}), 'quantity', data?.quantity + 1)
    } else if (type === 'subtract') {
      _.set(_.find(draftClone, {id: data?.id}), 'quantity', data?.quantity - 1)
    } else if (type === 'remove') {
      _.remove(draftClone, ele => ele?.id === data?.id)
    }
    dispatch(updateOrderDraft(draftClone))
  }

  return (
    <Modal size='xl' show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new order</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Card className='card-one mt-2'>
            <Card.Header>
              <Card.Title as='h6'>Order Information</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="g-2">
                <Col>
                  <Form.Group controlId='customer'>
                      <div className='mb-3'>
                        <Form.Label>Customer</Form.Label>
                        <Form.Select 
                          aria-label='Default select example' 
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.cusotmer}
                        >
                          <option>Select customer</option>
                          {list_customers?.entries &&
                            list_customers?.entries.map((customer) => {
                              return (
                                <option key={customer?.id} value={customer?.id}>
                                  {customer?.full_name}
                                </option>
                              )
                            })}
                        </Form.Select>
                        <Form.Text className='text-danger'>
                          {formik.touched.customer && formik.errors.customer ? (
                            <div className='text-danger'>{formik.errors.customer}</div>
                          ) : null}
                        </Form.Text>
                      </div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='address'>
                      <div className='mb-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type='text'
                          name='address'
                          placeholder='Enter address'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                        />
                        <Form.Text className='text-danger'>
                          {formik.touched.address && formik.errors.address ? (
                            <div className='text-danger'>{formik.errors.address}</div>
                          ) : null}
                        </Form.Text>
                      </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="g-2">
                <Form.Group controlId='customer'>
                  <Form.Label>Products Order</Form.Label>
                  {orders_draft && orders_draft.map((item, index) => (
                    <div className="product-wrapper" key={index}>
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <div className="product-thumb">
                                <img src={item.image} alt="" />
                              </div>
                            </td>
                            <td>
                              <h6 className="mb-1">
                                <Link to="">{item.name}</Link>
                              </h6>
                            </td>
                            <td>
                              <label className="d-block text-secondary fs-sm mb-1">Price</label>
                              <span className="d-block fw-medium text-dark ff-numerals">{format_money_vnd(item.price)}</span>
                            </td>
                            <td>
                              <label className="d-block text-secondary fs-sm mb-1">Quantity</label>
                              <span className="d-block fw-medium text-dark ff-numerals">{item.quantity}</span>
                            </td>
                            <td>
                              <span className="d-block fw-medium text-dark ff-numerals">
                                <div className="row">
                                  <Button variant="primary" className="btn-icon" 
                                    onClick={() => handleUpdateOrderDraft(item, 'add')}>
                                    <i className="ri-add-line"></i>
                                  </Button>
                                  <Button variant="warning" className="btn-icon mx-2" 
                                    onClick={() => handleUpdateOrderDraft(item, 'subtract')}>
                                    <i className="ri-subtract-line"></i>
                                  </Button>
                                  <Button variant="danger" className="btn-icon"
                                    onClick={() => handleUpdateOrderDraft(item, 'remove')}>
                                    <i className="ri-delete-bin-6-line"></i>
                                  </Button>
                                </div>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  ))}
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className='mt-3 d-flex justify-content-end'>
                <Button variant='secondary' onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button type='submit' variant='primary' className="mx-2" 
                  onClick={(values) => setFormState(values)}
                  disabled={formik.isSubmitting}
                >
                  {formik?.isSubmitting ? (
                    <Spinner animation='border' role='status' size='sm'>
                      <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Form>
      <div className="mt-2">
        <ProductSearch isAdd={false}/>
      </div>
      <ProductTable />
    </Modal>
  )
}