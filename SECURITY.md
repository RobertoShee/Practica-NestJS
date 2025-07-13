# Medidas de Seguridad Implementadas

Este documento describe las medidas de seguridad implementadas en la aplicación para proteger los datos y prevenir ataques comunes.

## Autenticación y Autorización

- **JWT (JSON Web Tokens)**: Implementación segura para autenticación de usuarios.
- **Protección de rutas**: Todas las rutas que requieren autenticación están protegidas con JwtAuthGuard.
- **Validación de tokens**: Verificación completa de tokens JWT incluyendo firma, expiración, emisor y audiencia.
- **Manejo seguro de secretos**: El secreto JWT se configura a través de variables de entorno.
- **Asociación de recursos**: Los productos creados están asociados al usuario que los crea.

## Protección contra ataques comunes

- **Helmet**: Configuración de cabeceras HTTP de seguridad para proteger contra ataques XSS, clickjacking, etc.
- **CORS (Cross-Origin Resource Sharing)**: Configuración para controlar qué dominios pueden acceder a la API.
- **Rate Limiting**: Limitación de solicitudes para prevenir ataques de fuerza bruta y DDoS.
- **Validación de entrada**: Todos los DTOs son validados usando class-validator para prevenir inyecciones y otros ataques.

## Seguridad de datos

- **Hashing de contraseñas**: Las contraseñas se almacenan hasheadas usando bcrypt.
- **Conexión segura a MongoDB**: Opciones de seguridad configuradas para la conexión a la base de datos.
- **Sanitización de datos**: Eliminación de propiedades no decoradas en los DTOs para prevenir la sobreescritura de datos.

## Configuración de seguridad

### Variables de entorno requeridas

Para garantizar la seguridad de la aplicación, se deben configurar las siguientes variables de entorno:

- `JWT_SECRET`: Clave secreta para firmar los tokens JWT.
- `JWT_EXPIRES_IN`: Tiempo de expiración de los tokens JWT (por defecto: "1h").
- `MONGO_URI`: URI de conexión a MongoDB.
- `MONGO_SSL`: Habilitar SSL para la conexión a MongoDB ("true" o "false").
- `ALLOWED_ORIGINS`: Dominios permitidos para CORS (separados por comas).
- `PORT`: Puerto en el que se ejecutará la aplicación (por defecto: 3000).

### Ejemplo de archivo .env

```
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=1h
MONGO_URI=mongodb://localhost:27017/nestdb
MONGO_SSL=false
ALLOWED_ORIGINS=http://localhost:3000,https://tu-dominio.com
PORT=3000
```

## Recomendaciones adicionales

1. Implementar autenticación de dos factores (2FA) para mayor seguridad.
2. Configurar HTTPS en producción.
3. Realizar auditorías de seguridad periódicas.
4. Mantener todas las dependencias actualizadas.
5. Implementar registro (logging) de eventos de seguridad.