const Joi = require("joi");
const ValidationError = require("../errors/ValidationError");

const validateCreateAppointment = (req, res, next) => {
  const appointmentSchema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    status: Joi.string().default("pending"),
  });

  const { error } = appointmentSchema.validate(req.body);

  if (error) {
    throw new ValidationError(error.details[0].message, error.details);
  }

  next()
};

module.exports = validateCreateAppointment;
