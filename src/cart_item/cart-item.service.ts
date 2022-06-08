import { CategoryService } from './../category/category.service';
import { Product } from 'src/products/products.model';
import { CreateCartItemDto } from './dto/cart-item.dto';
import { CartItem } from './cart-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem) private cartItemRepository: typeof CartItem, // private CategortService: CategoryService,
  ) {}

  async create(cartId: number, productId: number) {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { cartId, productId },
      });
      if (cartItem) {
        return new HttpException('Услуга уже в корзине', 200);
      }
      const cartCreateItem = await this.cartItemRepository.create({
        cartId,
        productId,
        repeat: 1,
      });
      return cartCreateItem;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAll(cartId: number) {
    const cartItem = await this.cartItemRepository.findAll({
      attributes: ['productId'],
      where: { cartId },
      include: Product,
    });
    if (!cartItem) {
      throw new HttpException('Корзина пуста', HttpStatus.ACCEPTED);
    }
    // cartItem.forEach((item) => {
    //   // @ts-ignore
    //   return (item.products.image = this.CategortService.getCatByValue(
    //     item.products.categoryId,
    //   ));
    // });
    return cartItem;
  }
  async deleteItem(cartId: number) {
    const cartDelItem = this.cartItemRepository.destroy({
      where: { cartId: cartId },
    });
    return cartDelItem;
  }
  async delete(cartId: number, productId: number) {
    try {
      const cartItem = this.cartItemRepository.destroy({
        where: { cartId, productId },
      });
      return cartItem;
    } catch (error) {
      return error;
    }
  }
}
