import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @ApiProperty({ example: 'nueva1234' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}