import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

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
      ignoreExpiration: false,
      issuer: 'practica-app',
      audience: 'practica-users',
    });
  }

  async validate(payload: any) {
    // 🔍 Diagnóstico para confirmar validación del token
    console.log('✅ JWT validado con payload:', payload);

    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Token inválido o incompleto');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username ?? '(sin username)',
      roles: payload.roles || [],
    };
  }
}