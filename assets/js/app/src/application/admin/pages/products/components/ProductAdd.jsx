// import libs
import React from 'react'
import { useState } from 'react'
import { Button, Modal, Form, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// import redux
import { useSelector } from '@src/infras/redux'

// import service
import { add_new_product } from '@src/domain/services/customer/products'
import { format_money_vnd } from '@src/common/services/format'

// modal product add
export default ProductAdd = (props) => {
  const { show, setShow } = props
  // get data from redux
  const { list_brands } = useSelector((state) => state?.brand)

  // init state formik
  const [formState, setFormState] = useState(true)

  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
      price: 0,
      brand: ''
    },
    validationSchema: Yup.object({
      code: Yup.string().max(255).required('Code is required!'),
      name: Yup.string().max(255).required('Product name is requied!'),
      price: Yup.number().min(0).required('Price is requied!'),
      brand: Yup.string().required('Brand name is requied!')
    }),
    onSubmit: async (values) => {
      // console.log(">>>Check values:", values)
      const data = {
        name: values?.name,
        code: values?.code,
        selling_price: values?.price,
        brand_id: Number(values?.brand)
      }
      // console.log(">>>Check data:", data)
      const res = await add_new_product(data)
      if (res?.data) setShow(false)
      formik.setSubmitting(!res?.data)
    }
  })

  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group controlId='name'>
            <div className='mb-3'>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter product name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <Form.Text className='text-danger'>
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-danger'>{formik.errors.name}</div>
                ) : null}
              </Form.Text>
            </div>
          </Form.Group>
          <Form.Group controlId='code'>
            <div className='mb-3'>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type='text'
                name='code'
                placeholder='Enter product code'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
              />
              <Form.Text className='text-danger'>
                {formik.touched.code && formik.errors.code ? (
                  <div className='text-danger'>{formik.errors.code}</div>
                ) : null}
              </Form.Text>
            </div>
          </Form.Group>
          <Form.Group controlId='price'>
            <div className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                name='price'
                placeholder='Enter product price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              <Form.Text className='text-danger'>
                {formik.touched.price && formik.errors.price ? (
                  <div className='text-danger'>{formik.errors.price}</div>
                ) : null}
              </Form.Text>
            </div>
          </Form.Group>
          <Form.Group controlId='brand'>
            <div className='mb-3'>
              <Form.Label>Brand</Form.Label>
              <Form.Select 
                aria-label='Default select example' 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
              >
                <option>Select brand</option>
                {list_brands?.entries &&
                  list_brands?.entries.map((brand) => {
                    return (
                      <option key={brand?.id} value={brand?.id}>
                        {brand?.name}
                      </option>
                    )
                  })}
              </Form.Select>
              <Form.Text className='text-danger'>
                {formik.touched.brand && formik.errors.brand ? (
                  <div className='text-danger'>{formik.errors.brand}</div>
                ) : null}
              </Form.Text>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Close
          </Button>
          <Button type='submit' variant='primary' 
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
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
