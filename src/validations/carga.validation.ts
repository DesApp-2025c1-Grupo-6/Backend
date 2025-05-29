import Joi from "joi";

export const createCargaSchema = Joi.object({
  peso: Joi.number().positive().precision(2).required().messages({
    "number.base": "El peso debe ser un número",
    "number.positive": "El peso debe ser un número positivo",
    "any.required": "El peso es obligatorio",
  }),
  volumen: Joi.number().positive().precision(2).required().messages({
    "number.base": "El volumen debe ser un número",
    "number.positive": "El volumen debe ser un número positivo",
    "any.required": "El volumen es obligatorio",
  }),

  requisitos_especiales: Joi.string().max(255).optional().messages({
    "string.base": "Los requisitos especiales deben ser texto",
    "string.max":
      "Los requisitos especiales no pueden superar los 255 caracteres",
  }),
  id_tipo_carga: Joi.number().integer().positive().required().messages({
    "number.base": "El id_tipo_carga debe ser un número",
    "number.integer": "El id_tipo_carga debe ser un número entero",
    "number.positive": "El id_tipo_carga debe ser un número positivo",
    "any.required": "El id_tipo_carga es obligatorio",
  }),
}).unknown(true);

export const updateCargaSchema = Joi.object({
  peso: Joi.number().positive().precision(2).messages({
    "number.base": "El peso debe ser un número",
    "number.positive": "El peso debe ser un número positivo",
    "any.required": "El peso es obligatorio",
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
