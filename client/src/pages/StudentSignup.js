import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_STUDENT } from "../utils/mutations";
import { Card, Form, Button, Modal, Container, Row } from "react-bootstrap";
 import background from '../assets/background.jpg';

function StudentSignup() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addStudent] = useMutation(ADD_STUDENT);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (error) => {
    setErrorMessage(error);
    setShowModal(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setErrorMessage("Check all fields are complete and try again");
      setShowModal(true);
    }
    setValidated(true);
    try {
      const mutationResponse = await addStudent({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.addStudent.token;
      Auth.login(token);

      // add mutation call to upload file
      // const upload = await fileUpload({
      //   variables: {
      //     file: fileInput.current.files[0],
      //   },
      // });
    } catch (err) {
      handleShowModal(err.message);
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  return (

    <Container className="py-4" style={{backgroundImage: `url(${background})`, height:'100vh', backgroundSize: 'cover'}}>
      <Row className="justify-content-md-center">
    <Card className='col-lg-8 my-3'>
      <Card.Header>
        <Card.Title>Student Signup</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3' controlId='formBasicUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              placeholder='Enter username'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit' onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
    </Row>
    </Container>
   
  );
}

export default StudentSignup;
