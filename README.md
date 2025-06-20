# Sistema de Gestión de Tarifas de Costos para Logística

## Descripción
Backend del "Sistema de Gestión de Tarifas de Costos para Logística".

## Software Necesario
- Node.js
- Docker Desktop
- Git

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, TypeScript
- **Base de Datos**: MySQL en Docker
- **ORM**: Sequelize
- **Validación**: Joi
- **Documentación API**: Swagger

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/DesApp-2025c1-Grupo-6/Backend
cd Backend
```

2. Instalar dependencias
```bash
npm install
```

3. Variables de entorno (opcional)
```bash
# El archivo .env ya tiene valores por defecto, pero se pueden modificar si es necesario.
```

## Inicio del Proyecto

### Modo Desarrollo
```bash
npm run dev
```
Este comando:
- Inicia el contenedor Docker con MySQL (ya debe estar corriendo Docker Desktop)
- Levanta el servidor de desarrollo con nodemon

### Persistencia de Datos
Está configurado para preservar los datos entre reinicios.
- La configuración `{ force: false }` en Sequelize asegura que las tablas existentes y sus datos se mantengan.
- Solo se crearán tablas si no existen, pero no se eliminarán datos existentes

Para reiniciar la base de datos con datos, utilizar:
```bash
npm run seed
```

#### Gestión de Docker
- **Iniciar contenedor MySQL**
```bash
npm run docker:up
```

- **Detener contenedor MySQL**
```bash
npm run docker:down
```

- **Ver logs de MySQL**
```bash
npm run docker:logs
```

#### Gestión de la Base de Datos
- **Cargar datos de ejemplo**
> ⚠️⚠️ **Advertencia:** Este script elimina toda la información previa en la base (DROP + CREATE). ⚠️⚠️
```bash
npm run seed
```

#### Otros comandos
- **Construir el proyecto**
```bash
npm run build
```

- **Iniciar en modo producción**
```bash
npm start
```

## Información sobre Docker

### Configuración
- **Base de datos**: MySQL 8.0
- **Nombre de la base**: db_tarifas
- **Puerto**: 3306
- **Usuario**: backend_user
- **Contraseña**: backend_password

### Datos
Los datos de la base de datos se guardan en la carpeta `mysql_data` del proyecto.

### Versión de Docker Compose
El archivo `docker-compose.yml` está configurado para la versión más reciente de Docker Compose.

### Comandos Docker Útiles
- **Ver contenedores en ejecución**
```bash
docker ps
```

- **Entrar al contenedor MySQL**
```bash
docker exec -it backend_tarifas_mysql bash
```

- **Conectar a MySQL dentro del contenedor**
```bash
mysql -u backend_user -p
```

- **Hacer backup de la base de datos**
```bash
docker exec backend_tarifas_mysql sh -c 'exec mysqldump -u backend_user -p"backend_password" db_tarifas' > backup.sql
```

- **Restaurar backup**
```bash
docker exec -i backend_tarifas_mysql sh -c 'exec mysql -u backend_user -p"backend_password" db_tarifas' < backup.sql
```
