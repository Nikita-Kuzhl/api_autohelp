import { CartItemService } from './../cart_item/cart-item.service';
import { Cart } from './cart.model';
import { AddCartDto } from './dto/add-cart.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
      return { message: 'Товар добавлен', cart };
    }
    const cartAdd = await this.cartRepository.create({ userId: dto.userId });
    await this.cartItemService.create(cartAdd.id, dto.productId);
    const cart = await this.cartItemService.findAll(cartAdd.id);
    return { message: 'Товар добавлен', cart };
  }
  async getCart(id: number) {
    const cartUser = await this.cartRepository.findOne({
      where: { userId: id },
    });
    const cart = await this.cartItemService.findAll(cartUser.id);
    return cart;
  }
  async delCart(id: number) {
    const cart = await this.cartRepository.destroy({ where: { id: id } });
    return { message: 'Коризна удалёна', cart };
  }
  async delCartItemOne(dto: AddCartDto) {
    try {
      const cartUser = await this.cartRepository.findOne({
        where: { userId: dto.userId },
      });
      await this.cartItemService.deleteItem({
        cartId: cartUser.id,
        productId: dto.productId,
      });
      const cart = await this.cartItemService.findAll(cartUser.id);
      return { message: 'Товар удалён', cart };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async delCartItem(dto: AddCartDto) {
    const cartUser = await this.cartRepository.findOne({
      where: { userId: dto.userId },
    });
    await this.cartItemService.delete(cartUser.id, dto.productId);
    const cart = await this.cartItemService.findAll(cartUser.id);
    return { message: 'Товар удалён', cart };
  }
}
