import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El id debe ser un número",
    "number.integer": "El id debe ser un número entero",
    "number.positive": "El id debe ser un número positivo",
    "any.required": "El id es obligatorio",
  }),
});
