const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

// Load .env
dotenv.config({
  path: path.join(process.cwd(), ".env"),  
});
//  console.log("path env",path)

// Joi schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "staging", "test")
    .default("development"),

  PORT: Joi.number().default(5000),

  MONGO_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().min(10).required(),

  JWT_EXPIRES_IN: Joi.string().default("7d"),

  LOG_LEVEL: Joi.string()
    .valid("error", "warn", "info", "http", "debug")
    .default("info"),

  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: Joi.number().default(100),

  CORS_ORIGIN: Joi.string().default("*"),

  CLOUDINARY_CLOUD_NAME: Joi.string().required(),

  CLOUDINARY_API_KEY: Joi.string().required(),

  CLOUDINARY_API_SECRET: Joi.string().required(),
})
  .unknown()
  .required();

const { value: envVars, error } = envSchema.validate(process.env);

// console.log("env schema",envSchema);


if (error) {
  throw new Error(`❌ ENV VALIDATION ERROR: ${error.message}`);
}

module.exports = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
  JWT_SECRET: envVars.JWT_SECRET,
  JWT_EXPIRES_IN: envVars.JWT_EXPIRES_IN,
  LOG_LEVEL: envVars.LOG_LEVEL,
  RATE_LIMIT_WINDOW_MS: envVars.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: envVars.RATE_LIMIT_MAX,
  CORS_ORIGIN: envVars.CORS_ORIGIN,
  CLOUDINARY_CLOUD_NAME: envVars.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: envVars.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: envVars.CLOUDINARY_API_SECRET,
};
