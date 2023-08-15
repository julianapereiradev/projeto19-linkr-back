import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).trim().required(),
  username: joi.string().trim().required(),
  pictureUrl: joi.string().uri().trim().required()
  });
  
  export const signinSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
  });