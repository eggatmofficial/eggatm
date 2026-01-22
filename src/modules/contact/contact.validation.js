const Joi = require("joi");

exports.createContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional().allow(""),
  message: Joi.string().min(2).required(),
});
