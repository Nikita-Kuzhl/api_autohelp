import { Product } from 'src/products/products.model';
import { CreateCartItemDto } from './dto/cart-item.dto';
import { CartItem } from './cart-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CartItemService {
  constructor(@InjectModel(CartItem)private cartItemRepository: typeof CartItem){}

  async create(cartId:number,productId:number){
    try {
      const cartItem = await this.cartItemRepository.findOne({where:{cartId,productId}})
      if(cartItem){
        let repeat = cartItem.repeat + 1
        await this.cartItemRepository.update({repeat:repeat},{where:{cartId:cartId,productId:productId}})
        let cart = await this.findAll(cartId)
        return cart
      }
      const cartCreateItem = await this.cartItemRepository.create({cartId,productId,repeat:1})
      return cartCreateItem
    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async findAll(cartId:number){
    const cartItem = await this.cartItemRepository.findAll({where:{cartId},include:Product})
    return cartItem
  }
  async deleteItem(dto:CreateCartItemDto){
    const cartItem = await this.cartItemRepository.findOne({where:{cartId:dto.cartId,productId:dto.productId}})
    if(cartItem.repeat>1){
      let repeat = cartItem.repeat - 1
      return await this.cartItemRepository.update({repeat:repeat},{where:{cartId:dto.cartId,productId:dto.productId}})
    }
    const cartDelItem = this.cartItemRepository.destroy({where:{cartId:dto.cartId,productId:dto.productId}})
    return cartDelItem
  }
  async delete(cartId:number,productId:number){
      try {
        const cartItem = this.cartItemRepository.destroy({where:{cartId,productId}})
        return cartItem
      } catch (error) {
        return error
      }
  }
}
