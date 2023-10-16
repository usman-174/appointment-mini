const Stripe = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET||"sk_test_51JXk3hJxqM0Qco2YNDQNAkMhEoa3x1ctO6fUgo2P3akauQzhC2ezs7Q52MCV5i8GGhhd2lodR2aVFDGIRd0dzhIw00aZ8FzBJ7", {
   
    apiVersion: "2022-11-15",
  });
  
  module.exports = stripe