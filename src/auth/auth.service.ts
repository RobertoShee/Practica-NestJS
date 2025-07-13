import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 🔐 Generar hash para contraseñas
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // 🔍 Validar credenciales del usuario
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // 🚀 Login y firma del token JWT
  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user._id,
      email: user.email,
      username: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        issuer: 'practica-app',
        audience: 'practica-users',
        expiresIn: '1h',
      }),
    };
  }

  // 🆕 Registro de usuario nuevo
  async register(data: RegisterDto): Promise<{ access_token: string }> {
    const { name, email, password } = data;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.login(newUser);
  }

  // 🧠 Nuevo: Obtener usuario desde MongoDB por su ID
  async getUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).select('-password'); // Oculta el hash de la contraseña
  }
}