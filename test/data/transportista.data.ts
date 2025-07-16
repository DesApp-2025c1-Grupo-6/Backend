export const datos = {
  nombre: 'Transportes Express',
  telefono: '1234-5678',
  email: 'transpExpress@gmail.com'
};

// Array de casos: cada uno es [modificaciones, mensaje de error esperado, descripción]
export const casosDeError: [string, any, string][] = [
  // CAMPOS REQUERIDOS - nombre y teléfono:
  [
    'Debe dar error si falta el nombre',
    (() => { const { nombre, ...rest } = datos; return rest; })(),
    'El nombre es obligatorio'
  ],
  [
    'Debe dar error si falta el teléfono',
    (() => { const { telefono, ...rest } = datos; return rest; })(),
    'El teléfono es obligatorio'
  ],


  // VALIDACIONES QUE AGREGAMOS:
  //NOMBRE
  [
    'Debe dar error si el nombre está vacío',
    { ...datos, nombre: '' },
    'El nombre no puede estar vacío'
  ],
  [
    'Debe dar error si el nombre no es string',
    { ...datos, nombre: 123 },
    'El nombre debe ser un texto'
  ],
  [
    'Debe dar error si el nombre tiene menos de 3 caracteres',
    { ...datos, nombre: 'ss' },
    'El nombre debe tener al menos 3 caracteres'
  ],
  [
    'Debe dar error si el nombre tiene más de 50 caracteres',
     { ...datos, nombre: 'a'.repeat(51) },
    'El nombre no puede tener más de 50 caracteres'
  ],

  //TELÉFONO
  [
    'Debe dar error si el teléfono está vacío',
    { ...datos, telefono: '' },
    'El teléfono no puede estar vacío'
  ],
  [
    'Debe dar error si el teléfono no es string',
    { ...datos, telefono: 123 },
    'El teléfono debe ser un número válido, puede incluir +, paréntesis, guiones y espacios'
  ],
  [
    'Debe dar error si el teléfono tiene un formato inválido',
    { ...datos, telefono: '+54x 1111-1111' },
    'El teléfono debe ser un número válido, puede incluir +, paréntesis, guiones y espacios'
  ],
  [
    'Debe dar error si el teléfono tiene menos de 8 caracteres',
    { ...datos, telefono: '111-111' },
    'El teléfono debe tener al menos 8 caracteres'
  ],
  [
    'Debe dar error si el teléfono tiene más de 30 caracteres',
     { ...datos, telefono: '1'.repeat(31) },
    'El teléfono no puede tener más de 30 caracteres'
  ],

  //EMAIL--Ahora no lo puedo validar 
  /*
  [
    'Debe dar error si el e-mail no es string',
    { ...datos, email: 123 },
    'El e-mail debe ser un texto'
  ],
  [
    'Debe dar error si el e-mail no tiene un formato válido',
    { ...datos, email: 'e-mail@gmail' },
    'El e-mail debe tener un formato válido'
  ],
  [
    'Debe dar error si el e-mail tiene menos de 12 caracteres',
    { ...datos, email: 'email@gmail' },
    'El e-mail debe tener al menos 12 caracteres'
  ],
  [
    'Debe dar error si el e-mail tiene más de 150 caracteres',
    { ...datos, email: `${'a'.repeat(140)}@correo.com` },
    'El e-mail no puede tener más de 150 caracteres'
  ]*/
];