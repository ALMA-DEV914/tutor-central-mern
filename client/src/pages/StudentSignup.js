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
    <div className='section my-1'> 
    <h2>Hi, welcome here! Are you looking forward to dive deeper in the fields of your studies? Signup now!</h2>
     <div> <FileUpload/></div>
     <form onSubmit={handleFormSubmit}>
          <div className='column'>
          Student Basic Info
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
            placeholder="Lastname.."
            name="lastname"
            type="lastname"
            id="flastname"
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
        </div>
        <div className='column'>
        Payment Information
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Card Number:</label>
          <input
            placeholder="card number....."
            name="card"
            type="card"
            id="card"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Card Expiry</label>
          <input
            placeholder="Expiry date"
            name="expiry"
            type="expiry"
            id="expiry"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Card CVC</label>
          <input
            placeholder="Card cvc"
            name="card-cvc"
            type="card-cvc"
            id="card-cvc"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Card holder:</label>
          <input
            placeholder="Name on the card..."
            name="card-name"
            type="card-name"
            id="card-name"
            onChange={handleChange}
            
          />
        </div>
        </div>
        <div className='column'>
        Billing Address
        
          <div className="flex-row space-between my-2">
          <label htmlFor="email">Street or Building:</label>
          <input
            placeholder="Street #...."
            name="street"
            type="street"
            id="street"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">City</label>
          <input
            placeholder="City..."
            name="city"
            type="city"
            id="city"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">State</label>
          <input
            placeholder="State"
            name="state"
            type="state"
            id="state"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Country</label>
          <input
            placeholder="Country"
            name="country"
            type="country"
            id="country"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Zipcode</label>
          <input
            placeholder="Zipcode"
            name="zipcode"
            type="zipcode"
            id="zipcode"
            onChange={handleChange}
            
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit" onClick={handleFormSubmit}>Submit</button>
        </div>
        </div>
        
        </form>
      </div>
   );
}

export default Signup;
