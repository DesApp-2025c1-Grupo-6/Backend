import Joi from "joi";

export const createZonaSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede tener más de 100 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
});

export const updateZonaSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).optional().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío si se proporciona",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede tener más de 100 caracteres",
  }),
});

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El id debe ser un número",
    "number.integer": "El id debe ser un número entero",
    "number.positive": "El id debe ser un número positivo",
    "any.required": "El id es obligatorio",
  }),
});
