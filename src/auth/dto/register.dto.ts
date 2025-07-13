import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Roberto Shee',
    description: 'Nombre completo del usuario que se registra',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'roberto.shee94@gmail.com',
    description: 'Correo electrónico válido del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'ClaveSegura123',
    description: 'Contraseña con mínimo 6 caracteres',
  })
  @MinLength(6)
  password: string;
}