import Joi from "joi";

export const createUserValidationSchema = Joi.object({
  username: Joi.string().trim().min(2).max(20).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),
  displayname: Joi.string().trim().min(2).max(20).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  pasword: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string().valid("admin", "user").default("user").messages({ "any.only": "Role must be either 'admin' or 'user'" }),
  avatar: Joi.string().uri().default("https://i.pravatar.cc/150?img=0").messages({ "string.uri": "Avatar must be a valid URL" }),
});
