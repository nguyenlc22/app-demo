// import libs
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as _ from 'lodash'

// import redux
import { useSelector } from '@src/infras/redux'

// import components
import ProductAdd from '@src/application/admin/pages/products/components/ProductAdd'

// import services
import { filter_products, get_list_products } from '@src/domain/services/customer/products'

// product search component
export default ProductSearch = (props) => {
  // init state
  const [show, setShow] = useState(false)
  const [isReset, setIsReset] = useState(false)

  // navigate
  const navigate = useNavigate()
  // get data from redux
  const { list_brands } = useSelector((state) => state?.brand)

  // tracking list brands change
  useEffect(() => {
    // console.log(">>>Check brand:", list_brands)
  }, [list_brands])

  // init state formik
  const [formState, setFormState] = useState(true)
  // handle filter products
  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
      brand_id: ''
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      // console.log(">>>Check values:", values)
      const _object = _.omitBy(values, _.isEmpty);
      // console.log(">>>Check object:", _object)
      const res = await filter_products(_object)
      formik.setSubmitting(!res?.data)
    },
    onReset: async () => {
      setIsReset(true)
      const res = await get_list_products({})
      setIsReset(!res?.data)
    }
  })

  return (
    <Card className='card-one'>
      <Card.Header>
        <Card.Title as='h6'>Products Search</Card.Title>
      </Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <Row className='g-2'>
            <Col>
              <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
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

            <Col>
              <Form.Group controlId='brand_id'>
                <Form.Label>Brand</Form.Label>
                <Form.Select 
                  aria-label='Default select example'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.brand_id}
                  name='brand_id'
                >
                  <option value=''>Select brand</option>
                  {list_brands?.entries &&
                    list_brands?.entries.map((brand) => {
                      return (
                        <option key={brand?.id} value={brand?.id}>
                          {brand?.name}
                        </option>
                      )
                    })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className='mt-3 d-flex justify-content-end'>
            <Button variant='primary' onClick={() => setShow(true)}>
              Add Product
            </Button>
            <ProductAdd show={show} setShow={setShow} />

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
