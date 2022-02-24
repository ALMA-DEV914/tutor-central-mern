import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import tutorPic from '../assets/tutor.jpeg';
import studentsPic from '../assets/students.jpeg';

function Signup(props) {
  const mainHeight = "150px";
  const mainWidth = "250px";

const [formState, setFormState] = useState({username: '', email: '', password: '' });
const [addUser] = useMutation(ADD_USER);

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const mutationResponse = await addUser({
    variables: {
      email: formState.email,
      password: formState.password,
      username: formState.username,
    },
  });
  const token = mutationResponse.data.addUser.token;
  Auth.login(token);
};

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormState({
    ...formState,
    [name]: value,
  });
};

  return (

    <div className='container my-1'> 
    <div className='column'>
     <form onSubmit={handleFormSubmit}>
      <Link to="/login"><img src="https://www.freeiconspng.com/uploads/login-icon-17.jpg" width={mainWidth} height={mainHeight} alt="Svg Login Icon" /></Link>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Username:</label>
          <input
            placeholder="First"
            name="username"
            type="username"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit" onClick={handleFormSubmit}>Submit</button>
        </div>
        </form>
      </div>
      <div className="flex-row flex-end2">
        <div className='column'>
          <img src={tutorPic} alt="tutor"/>
        <h2> Tutors, please register here to find your tutoring job worldwide and start your dream tutoring career.</h2>
        <button > <Link to="/:dashboard">Join as a tutor</Link>
        </button>
      </div>
      <div className='column'>
        <img src={studentsPic} alt="students" />
        <h2> Students/Parents, please register here to find your best Tutors/Institution.</h2>
         <button><Link to="/:dashboard">Sign up as a student</Link></button>
      </div>
      </div>
      </div> 
  );
}

export default Signup;
