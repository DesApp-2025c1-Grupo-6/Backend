import Joi from 'joi';

export const tipoCargaSchema = Joi.object({
  descripcion: Joi.string().min(3).max(255).required().messages({
    'string.base': 'La descripción debe ser un texto',
    'string.empty': 'La descripción no puede estar vacía',
    'string.min': 'La descripción debe tener al menos 3 caracteres',
    'string.max': 'La descripción no puede tener más de 255 caracteres',
    'any.required': 'La descripción es obligatoria',
  }),
}).unknown(true);
