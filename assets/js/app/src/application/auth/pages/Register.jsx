// import libs
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// initial register page
const RegisterPage = (props) => {
  return (
    <div className='page-sign'>
      <Card className='card-sign'>
        <Card.Header>
          <Link to='/' className='header-logo mb-4'>
            App Demo
          </Link>
          <Card.Title>Sign Up</Card.Title>
          <Card.Text>It's free to signup and only takes a minute.</Card.Text>
        </Card.Header>
        <Card.Body>
          <div className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='text' placeholder='Enter your email address' />
          </div>
          <div className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter your password' />
          </div>
          <div className='mb-3'>
            <Form.Label>Password Confirm</Form.Label>
            <Form.Control type='password' placeholder='Enter your password confirm' />
          </div>
          <div className='mb-3'>
            <Form.Label>Full name</Form.Label>
            <Form.Control type='text' placeholder='Enter your full name' />
          </div>
          <div className='mb-3'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type='text' placeholder='Enter your phone' />
          </div>
          <div className='mb-4'>
            <small>
              By clicking <strong>Create Account</strong> below, you agree to our terms of service and privacy
              statement.
            </small>
          </div>
          <Button variant='primary' className='btn-sign'>
            Create Account
          </Button>
        </Card.Body>
        <Card.Footer>
          Already have an account? <Link to='/auth/login'>Sign In</Link>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default RegisterPage
