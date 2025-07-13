import {
  IsOptional,
  IsString,
  IsNumber,
  Min
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Zapatillas deportivas' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 29990 })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'Producto ideal para running y uso diario' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'calzado' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 15 })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @IsOptional()
  stock?: number;
}