import { Product } from 'src/products/products.model';
import { Cart } from './cart.model';
import { AddCartDto } from './dto/add-cart.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartRepository: typeof Cart) {}
  async addItem(dto: AddCartDto) {
    const cart = await this.cartRepository.create(dto);
    return { message: 'Товар добавлен', cart };
  }
  async getCart(id: number) {
    const cart = await this.cartRepository.findAll({
      where: { userId: id },
      include: Product,
    });
    return cart;
  }
  async delItem(id: number) {
    const cart = await this.cartRepository.destroy({ where: { id: id } });
    return { message: 'Товар удалён', cart };
  }
}
