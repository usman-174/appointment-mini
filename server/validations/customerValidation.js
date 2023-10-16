const Joi = require("joi");
const ValidationError = require("../errors/ValidationError");

const validateCreateCustomer = (req, res, next) => {
  const customer = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string().allow("").optional(),
    country: Joi.string().allow("").optional(),
  });

  const { error } = customer.validate(req.body);

  if (error) {
    throw new ValidationError(error.details[0].message, error.details);
  }

  next();
};

module.exports = validateCreateCustomer;
