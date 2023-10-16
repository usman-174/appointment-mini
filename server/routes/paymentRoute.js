const express = require("express");
const paymentRoute = express.Router();
const {
  createCustomer,
  createPaymentIntent,
  paymentSuccess,
  getAllPayments,
  getPayment,
} = require("../controllers/paymentController");
const asyncHandler = require("express-async-handler");
const validateCreateCustomer = require("../validations/customerValidation");
const validatePaymentSuccess = require("../validations/paymentSuccesValidation");
paymentRoute.get("/payments", asyncHandler(getAllPayments));
paymentRoute.get("/payment/:id", asyncHandler(getPayment));
paymentRoute.post(
  "/payment/create",
  validatePaymentSuccess,
  asyncHandler(paymentSuccess)
);
paymentRoute.post(
  "/customer",
  validateCreateCustomer,
  asyncHandler(createCustomer)
);
paymentRoute.post(
  "/payment",

  asyncHandler(createPaymentIntent)
);

module.exports = paymentRoute;
