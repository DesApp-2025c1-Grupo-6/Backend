# Gestion de tarifa de costos
### Descripción
Este es el backend de la propuesta 3 "Sistema de Gestión de Tarifas de Costos para Logística".

### Requisitos
- Node.js

### Instalación

```
npm install
npm run dev
```


## Cargar la base de datos con datos de ejemplo

Ejecutar el script seed personalizado:

```
npx ts-node src/seeders/seed.ts
```

> ⚠️ **Advertencia:** Este script elimina toda la información previa en la base (DROP + CREATE).  

**No usar `sequelize-cli db:seed:all` para este archivo.**

