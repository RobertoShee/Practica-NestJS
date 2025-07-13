import {
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  // 🟢 Crear producto
  async create(dto: CreateProductDto, userId: string): Promise<Product> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new ForbiddenException('ID de usuario inválido');
    }

    const newProduct = new this.productModel({
      ...dto,
      userId
    });

    return newProduct.save();
  }

  // 🔵 Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // 🟡 Actualizar producto por ID
  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de producto inválido');
    }

    const updated = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true }
    );

    if (!updated) {
      throw new NotFoundException('Producto no encontrado');
    }

    return updated;
  }

  // 🔴 Eliminar producto por ID
  async remove(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID de producto inválido');
    }

    const deleted = await this.productModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Producto no encontrado');
    }

    return deleted;
  }
}