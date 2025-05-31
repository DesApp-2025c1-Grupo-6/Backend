import Joi from "joi";

export const zonaSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede tener más de 100 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
});
