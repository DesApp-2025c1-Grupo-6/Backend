import Joi from "joi";

export const createCargaSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser una cadena de texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos {#limit} caracteres",
    "string.max": "El nombre debe tener como máximo {#limit} caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  peso: Joi.number().positive().precision(2).required(),
  fecha: Joi.date().iso().required(),
  id_tipo_carga: Joi.number().integer().positive().required(),
});

export const updateCargaSchema = Joi.object({
  nombre: Joi.string().min(3).max(100),
  peso: Joi.number().positive().precision(2).messages({
    "number.base": "El peso debe ser un número",
    "number.positive": "El peso debe ser un número positivo",
    "any.required": "El peso es obligatorio",
  }),
  fecha: Joi.date().iso().messages({
    "date.base": "La fecha debe ser una fecha válida",
    "date.format": "La fecha debe tener formato ISO",
    "any.required": "La fecha es obligatoria",
  }),
  id_tipo_carga: Joi.number().integer().positive().messages({
    "number.base": "El id_tipo_carga debe ser un número",
    "number.integer": "El id_tipo_carga debe ser un número entero",
    "number.positive": "El id_tipo_carga debe ser un número positivo",
    "any.required": "El id_tipo_carga es obligatorio",
  }),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El id debe ser un número",
    "number.integer": "El id debe ser un número entero",
    "number.positive": "El id debe ser un número positivo",
    "any.required": "El id es obligatorio",
  }),
});
