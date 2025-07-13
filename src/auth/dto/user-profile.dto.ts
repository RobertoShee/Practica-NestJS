import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({ example: '687344c8a4719a150c6c2ffd' })
  userId: string;

  @ApiProperty({ example: 'roberto.shee94@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Roberto Shee' })
  username: string;

  @ApiProperty({
    example: '2025-07-12T22:53:14.000Z',
    description: 'Fecha de creación del usuario en MongoDB'
  })
  registradoDesde: Date;

  @ApiProperty({
    example: ['user'],
    type: [String],
    description: 'Roles asignados al usuario'
  })
  roles: string[];

  @ApiProperty({
    example: 'https://miapp.com/avatars/roberto.png',
    description: 'URL opcional del avatar de perfil',
    required: false
  })
  avatar?: string;
}