import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiParam
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 🟢 Crear producto
  @Post('create')
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o faltantes' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token inválido o ausente' })
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.userId;
    return this.productsService.create(createProductDto, userId);
  }

  // 🔵 Obtener todos los productos
  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  findAll() {
    return this.productsService.findAll();
  }

  // 🟡 Actualizar un producto por ID
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar producto por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // 🔴 Eliminar un producto por ID
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar producto por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}