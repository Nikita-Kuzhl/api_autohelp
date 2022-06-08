import { CartItemService } from '../cart_item/cart-item.service';
import { Cart } from './cart.model';
import { AddCartDto } from './dto/add-cart.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartRepository: typeof Cart,
    private cartItemService: CartItemService,
  ) {}
  async addItem(dto: AddCartDto) {
    const cartRepeat = await this.cartRepository.findOne({
      where: { userId: dto.userId },
    });
    if (cartRepeat) {
      await this.cartItemService.create(cartRepeat.id, dto.productId);
      const cart = await this.cartItemService.findAll(cartRepeat.id);
      return { message: 'Услуга добавлена', cart };
    }
    const cartAdd = await this.cartRepository.create({ userId: dto.userId });
    await this.cartItemService.create(cartAdd.id, dto.productId);
    const cart = await this.cartItemService.findAll(cartAdd.id);
    return { message: 'Услуга добавлена', cart };
  }
  async getCart(id: number) {
    const cartUser = await this.cartRepository.findOne({
      where: { userId: id },
    });
    if (!cartUser) throw new HttpException('Корзина пуста', 200);
    return await this.cartItemService.findAll(cartUser.id);
  }
  async delCart(id: number) {
    try {
      const cart = await this.cartRepository.findOne({ where: { userId: id } });
      await this.cartItemService.deleteItem(cart.id);
      await this.cartRepository.destroy({ where: { userId: id } });
      return { message: 'Коризна удалена', cart };
    } catch (error) {
      return error;
    }
  }

  async delCartItem(dto: AddCartDto) {
    const cartUser = await this.cartRepository.findOne({
      where: { userId: dto.userId },
    });
    await this.cartItemService.delete(cartUser.id, dto.productId);
    const cart = await this.cartItemService.findAll(cartUser.id);
    return { message: 'Услуга удалена', cart };
  }
}
