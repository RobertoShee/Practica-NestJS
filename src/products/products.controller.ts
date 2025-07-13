import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token inválido o ausente' })
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    // Asociar el producto con el usuario autenticado
    const userId = req.user.userId;
    return this.productsService.create(createProductDto, userId);
  }
}
