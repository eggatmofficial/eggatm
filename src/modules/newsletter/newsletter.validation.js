const Joi = require("joi");

exports.subscribeNewsletterSchema = Joi.object({
  email: Joi.string().email().required(),
  source: Joi.string()
    .valid("website", "checkout", "popup", "admin")
    .optional(),
});
