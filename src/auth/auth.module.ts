import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';

dotenv.config();

// Verificar que JWT_SECRET esté definido
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no está definido en el archivo .env');
  process.exit(1); // Detener la aplicación si falta la clave secreta
}

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        // Opciones adicionales de seguridad para el token
        issuer: 'practica-app',
        audience: 'practica-users',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
