export const casosDeErrorID: [string, any, string][] = [
  [
    'Debe dar error si el ID no es un número',
    's',
    'El id debe ser un número'
  ],
  [
    'Debe dar error si el ID no es un número entero',
    1.5,
    'El id debe ser un número entero'
  ],
  [
    'Debe dar error si el ID no es un número positivo',
    0,
    'El id debe ser un número positivo'
  ]
];