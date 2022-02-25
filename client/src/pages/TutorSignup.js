import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER, SINGLE_FILE_UPLOAD } from "../utils/mutations";
import { Form, Button, Modal } from "react-bootstrap";

function Signup() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const fileInput = React.createRef();
  const [addUser] = useMutation(ADD_USER);
  const [fileUpload] = useMutation(SINGLE_FILE_UPLOAD);

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
      const mutationResponse = await addUser({
        variables: {
          firstname: "tom",
          lastname: "bellenger",
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });

      const token = mutationResponse.data.addUser.token;
      Auth.login(token);

      // add mutation call to upload file
      const fileUpload = await fileUpload({
        variables: {
          file: fileInput.current.files[0],
        },
      });
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
    <>
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
        <Form.Group className='mb-3' controlId='formFileInput'>
          <Form.Label>Photo</Form.Label>
          <input
            id='formFileInput'
            className='file-input form-control'
            name='file'
            type='file'
            accept='image/png, image/jpeg'
            ref={fileInput}
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
    </>
  );
}

export default Signup;
