import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from './throttler/throttler.module';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

@Module({
  imports: [
    // Conexión a MongoDB con opciones de seguridad
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/nestdb',
      {
        // Opciones de seguridad adicionales
        ssl: process.env.MONGO_SSL === 'true',
        retryWrites: true,
      }
    ),
    // Módulo de limitación de tasa de solicitudes
    ThrottlerModule,
    // Módulos de la aplicación
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
 
})
export class AppModule {}
