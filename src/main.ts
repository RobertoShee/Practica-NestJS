import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ Seguridad con Helmet
  app.use(helmet());

  // 🌐 CORS habilitado
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

  // ✅ Validación global con DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  // 📄 Swagger con autorización JWT
  const swaggerConfig = new DocumentBuilder()
    .setTitle('🧪 API Práctica NestJS')
    .setDescription('Documentación interactiva con JWT y validación de DTOs')
    .setVersion('1.0.0')
    .addSecurity('access-token', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Ingrese su token JWT sin incluir "Bearer", Swagger lo agregará automáticamente'
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true // 👈 Mantiene el token al recargar Swagger
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();