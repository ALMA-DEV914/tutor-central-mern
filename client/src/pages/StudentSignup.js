import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import FileUpload from "../components/FileUpload";

function Signup(props) {
  
const [formState, setFormState] = useState({firstname: '', lastname: '', email: '', password: '' });
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
      <FileUpload/>
      </div>
      <div className='column'>
     <form onSubmit={handleFormSubmit}>
      <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Firstname:</label>
          <input
            placeholder="Firstname.."
            name="firstname"
            type="firstname"
            id="firstName"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Lastname:</label>
          <input
            placeholder="Last"
            name="lastname"
            type="lastname"
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
      </div>
  );
}

export default Signup;
