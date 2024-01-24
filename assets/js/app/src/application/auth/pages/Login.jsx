// import libs
import React from 'react'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// import projects
import { login } from '@src/domain/services/auth'

// import redux
import { useSelector } from '@src/infras/redux'

// initial login page
const LoginPage = (props) => {
  // init navigations
  const navigate = useNavigate()
  // init redux
  const { account } = useSelector((state) => state?.account)

  // init state formik
  const [formState, setFormState] = useState(true)

  const formik = useFormik({
    initialValues: {
      email: 'nguyen.caole@onpoint.vn',
      password: '123123'
    },
    validationSchema: Yup.object({
      email: Yup.string().max(255).email('Invalid email address').required('Email is required!'),
      password: Yup.string().max(255).required('Password is requied!')
    }),
    onSubmit: async (values) => {
      // console.log(">>>Check values:", values)
      const res = await login(values)
      if (res?.data) navigate('/admin/products')
      formik.setSubmitting(!res?.data)
    }
  })
  //
  useEffect(() => {
    // console.log(">>>Check account:", account)
  }, [])

  return (
    <div className='page-sign'>
      <Card className='card-sign'>
        <Card.Header>
          <Link to='/' className='header-logo mb-4'>
            App Demo
          </Link>
          <Card.Title>Sign In</Card.Title>
          <Card.Text>Welcome back! Please signin to continue.</Card.Text>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId='email'>
              <div className='mb-4'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Enter your email address'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <Form.Text className='text-danger'>
                  {formik.touched.email && formik.errors.email ? (
                    <div className='text-danger'>{formik.errors.email}</div>
                  ) : null}
                </Form.Text>
              </div>
            </Form.Group>
            <Form.Group controlId='password'>
              <div className='mb-4'>
                <Form.Label className='d-flex justify-content-between'>
                  Password <Link to=''>Forgot password?</Link>
                </Form.Label>
                <Form.Control
                  type='password'
                  name='passowrd'
                  placeholder='Enter your password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <Form.Text className='text-danger'>
                  {formik.touched.password && formik.errors.password ? (
                    <div className='text-danger'>{formik.errors.password}</div>
                  ) : null}
                </Form.Text>
              </div>
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              disabled={formik.isSubmitting}
              className='btn-sign'
              onClick={(values) => setFormState(values)}
            >
              {formik?.isSubmitting ? (
                <Spinner animation='border' role='status' size='sm'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          Don't have an account? <Link to='/auth/register'>Create an Account</Link>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default LoginPage
