const Joi = require("joi");

exports.createFranchiseSchema = Joi.object({
  shopName: Joi.string().min(3).required(),
  address: Joi.string().min(10).required(),
  city: Joi.string().required(),
  
  contact: Joi.array()
    .items(Joi.string().pattern(/^\d{10}$/))
    .min(1)
    .required(),
    
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  
  mapLink: Joi.string().optional(),
  whatsapp: Joi.string().pattern(/^\d{10}$/).optional(),
  
  isActive: Joi.boolean().optional(),
});

exports.updateFranchiseSchema = Joi.object({
  shopName: Joi.string().min(3).optional(),
  address: Joi.string().min(10).optional(),
  city: Joi.string().optional(),
  
  contact: Joi.array()
    .items(Joi.string().pattern(/^\d{10}$/))
    .optional(),
    
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
  
  mapLink: Joi.string().optional(),
  whatsapp: Joi.string().pattern(/^\d{10}$/).optional(),
  
  isActive: Joi.boolean().optional(),
});