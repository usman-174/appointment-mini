const Payment = require("../models/payments");
const stripe = require("../utils/getStriple");

const createCustomer = async (req, res) => {
  const { email, name, country } = req.body;

  const { id } = await stripe.customers.create({
    description: "Customer From TheWebJobs",
    email,
    name: name,
    address: {
      country,
    },
  });

  return res.json({ id });
};

const getAllPayments = async(req,res)=>{
  const payments  = await Payment.find().populate("appointment")
  return res.json(payments)
}
const getPayment = async(req,res)=>{
  const {id} = req.params

  const payment = await Payment.findOne({appointment:id}).populate("appointment")
 

  return res.json(payment)
}
const createPaymentIntent = async (req, res) => {
  const id = req.body.id;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50,
    customer: id,
    currency: "USD",
  });

  return res.json({ secret: paymentIntent.client_secret });
};
const paymentSuccess = async (req, res) => {
  const { email, customerId, amount, country, appointment, paid } = req.body;
  const payment = new Payment({
    email,
    customerId,
    amount,
    country,
    appointment,
    paid,
  });

  const response = await payment.save();
  return res.json(response);
};
module.exports = {
  createCustomer,
  createPaymentIntent,getAllPayments,getAllPayments,
  paymentSuccess,getPayment
};
