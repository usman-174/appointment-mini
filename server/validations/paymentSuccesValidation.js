const Joi = require("joi");
const ValidationError = require("../errors/ValidationError");

const paymentSchema = Joi.object({
  customerId: Joi.string().required(),
  amount: Joi.number().required(),
  email: Joi.string().required(),
  name: Joi.string().optional().allow(""),
  country: Joi.string().optional().allow(""),
  appointment: Joi.string(),
  paid: Joi.boolean().default(false),
});

const validatePaymentSuccess = (req, res, next) => {
  const { error } = paymentSchema.validate(req.body);

  if (error) {
    throw new ValidationError(error.details[0].message, error.details);
  }

  next();
};
module.exports = validatePaymentSuccess;
