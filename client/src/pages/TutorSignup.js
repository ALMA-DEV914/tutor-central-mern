import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_TUTOR} from "../utils/mutations";
import { Card, Form, Button, Modal, Container,Row } from "react-bootstrap";
//import FileUploader from "../components/FileUploader";
import {GET_S3_URL_AUTHENTICATED} from "../utils/mutations"

function TutorSignup() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    hourlyRate: "",
    knownSubjects: "",
    bio: "",
    
  });
  const [imageFile, setImageFile] = useState(null);
  const [addTutor] = useMutation(ADD_TUTOR);
  const [getS3UrlAuthenticated] = useMutation(GET_S3_URL_AUTHENTICATED);

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
    } else{
     setValidated(true);
    const uniqueFilename = new Date().getTime() + ".jpg";
    
    //add mutation call to upload file
    let imageUrl = ""
    if(imageUrl){
      const urlReturnObject = await getS3UrlAuthenticated({
        variables: {
          isLoggedIn: Auth.loggedIn()
        },
      });

    const urlObject = urlReturnObject.data;
      const url = urlObject;
      const formData = new FormData();
      formData.append("file", imageFile);
      await fetch(url, {
        method: "PUT",
        headers:{
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      imageUrl = url.split("?")[0];
    }

    try {
      let variables = {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        hourlyRate: formState.hourlyRate,
        knownSubjects: formState.knownSubjects,
        bio: formState.bio,
  
      };
    
     const mutationResponse = await addTutor({
     variables,
  });
  
      console.log(mutationResponse);
      const token = mutationResponse.data.addTutor.token;
      Auth.login(token);
    } catch (err) {
      handleShowModal(err.message);
      console.log(err);
    }
  };
}
  const handleImageSelection = async (event) => {
    //get the file that was submitted by user and add to state
    const input = event.target;
    setImageFile(input.files[0]);
    
};

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Container className="p-4">
      <Row className="justify-content-md-center">
    <Card className='col-lg-8 my-3'>
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
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Hourly Rate $</Form.Label>
            <Form.Control
               type='text'
              name='hourlyRate'
              placeholder='Hourly rate'
              onChange={handleChange}
            
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='FormBasicText'>
            <Form.Label>Expertises</Form.Label>
            <Form.Control
              type='text'
              name='knownSubjects'
              placeholder='Know subjects/expertises'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicTextarea'>
            <Form.Label>Write a Short Bio</Form.Label>
            <Form.Control as="textarea" rows={3}
              type='text'
              name='bio'
              placeholder='Descriptive bio '
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
            <Form.Control
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(event) => {
                        handleImageSelection(event);
                        }}
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

export default TutorSignup;
