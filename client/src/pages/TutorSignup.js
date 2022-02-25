import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Form, Button } from "react-bootstrap";

function Signup() {
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  return (
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
  );
}

export default Signup;
