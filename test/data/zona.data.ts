export const datos = {
  nombre: 'GBA (Gran Buenos Aires)'
};

export const casosDeError: [string, any, string][] = [
  // CAMPO REQUERIDO - nombre:
  [
    'Debe dar error si falta el nombre',
    {},
    'El nombre es obligatorio'
  ],

  
  // VALIDACIONES QUE AGREGAMOS:
  [
    'Debe dar error si el nombre está vacío',
    { nombre: '' },
    'El nombre no puede estar vacío'
  ],
  [
    'Debe dar error si el nombre no es string',
    { nombre: 123 },
    'El nombre debe ser un texto'
  ],
  [
    'Debe dar error si el nombre tiene menos de 3 caracteres',
    { nombre: 'ss' },
    'El nombre debe tener al menos 3 caracteres'
  ],
  [
    'Debe dar error si el nombre tiene más de 50 caracteres',
     { nombre: 'a'.repeat(51) },
    'El nombre no puede tener más de 50 caracteres'
  ]
];