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
    // <div className='container my-1'>
    //   <div className='column'>
    //     <form onSubmit={handleFormSubmit}>
    //       <div className='flex-row space-between my-2'>
    //         <label htmlFor='firstName'>Username:</label>
    //         <input
    //           placeholder='First'
    //           name='username'
    //           type='username'
    //           id='firstName'
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div className='flex-row space-between my-2'>
    //         <label htmlFor='email'>Email:</label>
    //         <input
    //           placeholder='youremail@test.com'
    //           name='email'
    //           type='email'
    //           id='email'
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div className='flex-row space-between my-2'>
    //         <label htmlFor='pwd'>Password:</label>
    //         <input
    //           placeholder='******'
    //           name='password'
    //           type='password'
    //           id='pwd'
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div className='flex-row flex-end'>
    //         <button type='submit' onClick={handleFormSubmit}>
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    //   <div className='flex-row flex-end2'>
    //     <div className='column'>
    //       <img src={tutorPic} alt='tutor' />
    //       <h2>
    //         {" "}
    //         Tutors, please register here to find your tutoring job worldwide and
    //         start your dream tutoring career.
    //       </h2>
    //       <button>
    //         {" "}
    //         <Link to='/:dashboard'>Join as a tutor</Link>
    //       </button>
    //     </div>
    //     <div className='column'>
    //       <img src={studentsPic} alt='students' />
    //       <h2>
    //         {" "}
    //         Students/Parents, please register here to find your best
    //         Tutors/Institution.
    //       </h2>
    //       <button>
    //         <Link to='/:dashboard'>Sign up as a student</Link>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Signup;
