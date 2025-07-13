import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiOkResponse
} from '@nestjs/swagger';

import { UserProfileResponseDto } from './dto/user-profile.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🟢 Registro de usuario
  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo ya está en uso' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  // 🔐 Login con generación de token
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso. Devuelve JWT' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() credentials: LoginDto) {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login(user);
  }

  // 👤 Perfil completo del usuario desde la base de datos
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtener perfil completo desde MongoDB' })
  @ApiOkResponse({
    description: 'Perfil del usuario autenticado',
    type: UserProfileResponseDto
  })
  @ApiResponse({ status: 401, description: 'Token inválido o ausente' })
  async getProfile(@Request() req: { user: any; headers: any }) {
    console.log('🔒 Encabezados recibidos:', req.headers);
    console.log('🧩 Usuario inyectado por JwtStrategy:', req.user);

    const { userId } = req.user;

    if (!userId) {
      console.error('⚠️ req.user está mal estructurado:', req.user);
      throw new UnauthorizedException('Token válido, pero sin datos del usuario');
    }

    const usuario = await this.authService.getUserById(userId);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado en la base de datos');
    }

    return {
      userId: usuario._id,
      email: usuario.email,
      username: usuario.name,
      // registradoDesde: usuario.createdAt,  // 👈 si tu esquema lo tiene
      // roles: usuario.roles ?? []           // 👈 si estás guardando roles
    };
  }
}