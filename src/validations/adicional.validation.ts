import Joi from 'joi';

export const adicionalSchema = Joi.object({
  tipo: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El tipo debe ser una cadena de texto',
    'string.empty': 'El tipo no puede estar vacío',
    'string.min': 'El tipo debe tener al menos 3 caracteres',
    'string.max': 'El tipo no puede tener más de 100 caracteres',
    'any.required': 'El tipo es obligatorio',
  }),
  costo_default: Joi.number().positive().precision(2).required().messages({
    'number.base': 'El costo_default debe ser un número',
    'number.positive': 'El costo_default debe ser un número positivo',
    'any.required': 'El costo_default es obligatorio',
  }),
}).unknown(true);
