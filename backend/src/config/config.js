const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    SQL_HOST: Joi.string().default('localhost'),
    SQL_USER: Joi.string().default('Root'),
    SQL_PASSWORD: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  sql: {
    host: envVars.SQL_HOST,
    user: envVars.SQL_USER,
    password: envVars.SQL_PASSWORD,
  },
  cloudinary: {
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    cloud_api_key: envVars.CLOUDINARY_API_KEY,
    cloud_api_secret: envVars.CLOUDINARY_API_SECRET,
  },
};
