export const datos = {
  descripcion: 'Regular'
};

export const casosDeError: [string, any, string][] = [
  // CAMPO REQUERIDO - descripcion:
  [
    'Debe dar error si falta la descripción',
    {},
    'La descripción es obligatoria'
  ],

  
  // VALIDACIONES QUE AGREGAMOS:
  [
    'Debe dar error si la descripción está vacía',
    { descripcion: '' },
    'La descripción no puede estar vacía'
  ],
  [
    'Debe dar error si la descripción no es string',
    { descripcion: 123 },
    'La descripción debe ser un texto'
  ],
  [
    'Debe dar error si la descripción tiene menos de 3 caracteres',
    { descripcion: 'ss' },
    'La descripción debe tener al menos 3 caracteres'
  ],
  [
    'Debe dar error si la descripción tiene más de 50 caracteres',
     { descripcion: 'a'.repeat(51) },
    'La descripción no puede tener más de 50 caracteres'
  ]
];