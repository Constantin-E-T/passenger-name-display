// src/App.js

import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';

function App() {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    window.screen.orientation.lock('landscape');
  }

  const handleDelete = () => {
    setName('');
    window.screen.orientation.lock('portrait');
  }

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Container fluid style={{ backgroundColor: '#000000', height: '100vh' }}>
      {isLandscape ? (
        <Row className="justify-content-center align-items-center" style={{ color: '#ffffff', fontSize: '10vw', height: '100vh', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              <h1>Passenger Name Display</h1>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Passenger Name</Form.Label>
              <Form.Control type="text" value={name} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </>
      )}
      <Row className="fixed-bottom">
        <Col>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to Use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter the passenger's name and submit. The screen will automatically flip to landscape mode and display the name. To delete the name, click the Delete button.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
