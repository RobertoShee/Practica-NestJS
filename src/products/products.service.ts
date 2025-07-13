import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(dto: CreateProductDto, userId: string): Promise<Product> {
    try {
      // Validar que el userId sea un ObjectId válido
      if (!Types.ObjectId.isValid(userId)) {
        throw new ForbiddenException('ID de usuario inválido');
      }

      // Crear el producto con el userId
      const newProduct = new this.productModel({
        ...dto,
        userId,
      });

      return await newProduct.save();
    } catch (error) {
      // Mejorar el manejo de errores
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }
}
