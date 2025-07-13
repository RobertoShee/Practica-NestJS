import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Aquí podemos agregar lógica personalizada antes de la validación JWT
    return super.canActivate(context);
  }

  handleRequest<T = any>(err: any, user: T, _info: any): T {
    // Puedes agregar lógica personalizada para manejar errores
    if (err || !user) {
      // Si hay un error o no hay usuario, lanzamos una excepción
      throw new UnauthorizedException(
        err?.message || 'No estás autorizado para acceder a este recurso',
      );
    }
    return user;
  }
}