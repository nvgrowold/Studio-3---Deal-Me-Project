import Header from '../Components/Header'
import React, { useState, useRef } from 'react'; 
import Container from 'react-bootstrap/Container';

import emailjs from '@emailjs/browser';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


export default function ContactUsPage() {
  const form = useRef(); // Reference to the form for submission and reset

  // State to control the visibility of the success message modal
  const [showModal, setShowModal] = useState(false);

  // Function to handle form submission
  const sendEmail = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      // Send the form data to EmailJS
      emailjs.sendForm('service_mlltxsa', 'template_f9fv20l', form.current, {
          publicKey: 'JYSJRqcDimHR41Lp-',
      }).then(
          (result) => {
              console.log(result.text); // Log success message
              setShowModal(true); // Show success modal on successful submission
              form.current.reset(); // Reset form fields after submission
          },
          (error) => {
              console.log(error.text); // Log any error
          }
      );
  };

  // Function to close the success message modal
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Header/>
      {/* Contact form setup */}
      <Container style={{ marginTop: '100px', maxWidth: '600px' }}>
          <Form ref={form} onSubmit={sendEmail}>
              <h4 className="text-center mb-4">Contact Us</h4>
              {/* Form fields for name, email, and message */}
              <Row className="mb-3">
                  <Form.Label column sm={2}>Name</Form.Label>
                  <Col sm={10}>
                      <Form.Control type="text" name="user_name" />
                  </Col>
              </Row>
              <Row className="mb-3">
                  <Form.Label column sm={2}>Email</Form.Label>
                  <Col sm={10}>
                      <Form.Control type="email" name="user_email" />
                  </Col>
              </Row>
              <Row className="mb-3">
                  <Form.Label column sm={2}>Message</Form.Label>
                  <Col sm={10}>
                      <Form.Control as="textarea" name="message" />
                  </Col>
              </Row>
              <button className='w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900'
               type="submit">Send</button>
          </Form>
      </Container>
            
      {/* Modal for displaying success message upon form submission */}
      <Modal show={showModal} onHide={handleClose} className="custom-modal" dialogClassName="custom-modal-dialog">
          <Modal.Header closeButton>
              <Modal.Title>Message Sent</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your message has been sent. We will get in touch with you shortly.</Modal.Body>
          <Modal.Footer>
              <button className='w-full bg-sky-700 text-white px-7 py-2 mb-6 text-sm font-medium uppercase rounded shadow-lg hover:bg-sky-800 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900'
               onClick={handleClose}>Close</button>
          </Modal.Footer>
      </Modal>      
    </div>
  )
}
