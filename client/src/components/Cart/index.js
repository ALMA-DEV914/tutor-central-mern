import React from "react";
//import Auth from "../utils/auth";
import axios from 'axios';
import Stripe from "react-stripe-checkout";


const Cart = (props) => {
    const handleToken =(totalAmount, token)=>{
        try{
          axios.post("http://localhost:3000/api/stripe/pay", {
            token:token.id,
            amount:totalAmount
          });
  
        } catch(error){
          console.log(error)
        };
    }
    const tokenHandler =(token) => {
      handleToken(100, token);
    }

return(
    
        
        <Stripe stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
                  token={tokenHandler}
                />
        
    
   );
}

export default Cart;