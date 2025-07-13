import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

// Verificar que JWT_SECRET esté definido
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no está definido en el archivo .env');
  process.exit(1);
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false, // Asegura que tokens expirados sean rechazados
      issuer: 'practica-app',
      audience: 'practica-users',
    });
  }

  async validate(payload: any) {
    // Validación adicional del payload si es necesario
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Token inválido');
    }

    return { 
      userId: payload.sub, 
      email: payload.email,
      roles: payload.roles || [] // Soporte para roles si se implementan después
    };
  }
}
