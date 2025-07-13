import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de seguridad con Helmet
  app.use(helmet());

  // Configuración de CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Validaciones globales para todos los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no decoradas
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no decoradas
      transform: true, // Transforma los datos a los tipos definidos
    }),
  );

  // Configuración avanzada para Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('🧪 API Práctica NestJS')
    .setDescription('Documentación interactiva con JWT, DTOs validados y agrupación por módulos')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingrese su token JWT para acceder a rutas protegidas',
      },
      'access-token' // Nombre del esquema usado en @ApiBearerAuth()
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
