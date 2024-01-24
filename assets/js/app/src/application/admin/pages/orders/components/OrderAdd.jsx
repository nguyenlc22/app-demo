// import libs
import React from "react"
import { Modal, Button, Spinner } from "react-bootstrap"

export default OrderAdd = (props) => {
  // get data props
  const { show, setShow } = props

  return (
    <Modal size='xl' show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Content</h1>
      </Modal.Body>
      <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Close
          </Button>
          <Button type='submit' variant='primary' 
            onClick={() => {}}
          >
            {false ? (
              <Spinner animation='border' role='status' size='sm'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : (
              'Save'
            )}
          </Button>
        </Modal.Footer>
    </Modal>
  )
}