const { Router } = require('express');
const express = require('express');

const stripe = require("stripe")('pk_test_TYooMQauvdEDq54NiTphI7jx');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Payment is received");
    res.json({
        message: "Thank you for your purchase. We recieved your payment successfully!"
    })
})
router.post("/pay", (req,res,next) => {
    console.log(req,body.token);
    const {token, amount} = req.body;

    return stripePromise.customers.create({
        email:token.email,
        source:token
    }).then(customer=>{
        stripePromise.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }).then(result => {
            res.status(200).json(result)
        }).catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router;