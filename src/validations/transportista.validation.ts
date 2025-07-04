import Joi from 'joi';

export const transportistaSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede tener más de 50 caracteres',
    'any.required': 'El nombre es obligatorio',
  }),
  telefono: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]*$/).min(8).max(30).required().messages({
    'string.pattern.base': 'El teléfono debe ser un número válido, puede incluir +, paréntesis, guiones y espacios',
    'string.base': 'El teléfono debe ser un número válido, puede incluir +, paréntesis, guiones y espacios',
    'string.empty': 'El teléfono no puede estar vacío',
    'string.min': 'El teléfono debe tener al menos 8 caracteres',
    'string.max': 'El teléfono no puede tener más de 30 caracteres',
    'any.required': 'El teléfono es obligatorio',
  }),
  email: Joi.alternatives().try(
    Joi.string().email().min(12).max(150),
    Joi.string().allow('').optional()
  ).optional().messages({
    'string.base': 'El e-mail debe ser un texto',
    'string.email': 'El e-mail debe tener un formato válido',
    'string.min': 'El e-mail debe tener al menos 12 caracteres',
    'string.max': 'El e-mail no puede tener más de 150 caracteres'
  }),
}).unknown(true);