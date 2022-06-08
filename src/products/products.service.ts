import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}
  async create(dto: CreateProductDto) {
    const post = await this.productRepository.create(dto);
    return post;
  }
  async getAll() {
    const products = this.productRepository.findAll();
    return products;
  }
  async findAllCat(id: number) {
    const products = await this.productRepository.findAll({
      where: { categoryId: id },
    });
    if (!products.length) {
      throw new HttpException(
        'Таких продуктов не существует в категории',
        HttpStatus.BAD_REQUEST,
      );
    }
    return products;
  }
  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new HttpException(
        'Такого продукта не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return product;
  }
}
