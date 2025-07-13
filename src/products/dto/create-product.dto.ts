import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Camiseta técnica',
    description: 'Nombre comercial del producto',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Tela dry-fit, ideal para entrenamientos intensos',
    description: 'Breve descripción con beneficios o características',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 19990,
    description: 'Precio en pesos chilenos (CLP)',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 20,
    description: 'Cantidad disponible en stock',
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 'ropa-deportiva',
    description: 'Categoría del producto (ropa, accesorios, tecnología...)',
  })
  @IsString()
  category: string;
}