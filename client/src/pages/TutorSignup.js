import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_TUTOR, GET_S3_URL } from "../utils/mutations";
import { Card, Form, Button, Modal } from "react-bootstrap";

function TutorSignup() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const fileInput = React.createRef();
  const [addTutor] = useMutation(ADD_TUTOR);
  const [getS3Url] = useMutation(GET_S3_URL);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (error) => {
    setErrorMessage(error);
    setShowModal(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(fileInput);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setErrorMessage("Check all fields are complete and try again");
      setShowModal(true);
    }
    setValidated(true);
    try {
      const mutationResponse = await addTutor({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.addTutor.token;

      //add mutation call to upload file
      if (fileInput.files[0].size > 1024 * 1024 * 10) {
        // 10mb file size limit
        handleShowModal("photo is too big. 10Mb file size limit exceeded");
        return;
      }
      const uploadUrl = await getS3Url({
        variables: {
          file: `${mutationResponse.data.addTutor.userId._id}.jpg`,
        },
      });

      const formData = new FormData();
      formData.append(
        "file",
        fileInput.files[0],
        `${mutationResponse.data.addTutor.userId._id}.jpg`
      );
      const img_response = await fetch(uploadUrl, {
        method: "PUT",
        body: formData,
      });
      if (img_response.ok) {
        console.log("image upload success");
      } else {
        console.log("image upload failed");
      }

      Auth.login(token);
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
    <Card className='my-3'>
      <Card.Header>
        <Card.Title>Tutor Signup</Card.Title>
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
          <Form.Group className='mb-3' controlId='formFileInput'>
            <Form.Label>Photo</Form.Label>
            <input
              className='file-input form-control'
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
      </Card.Body>
    </Card>
  );
}

export default TutorSignup;
