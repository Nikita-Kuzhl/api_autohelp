import { CartItem } from './../cart_item/cart-item.model';
import { Cart } from 'src/cart/cart.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddCartDto } from './dto/add-cart.dto';
import { CartService } from './cart.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@ApiTags('Корзина')
@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @ApiOperation({summary:'Добавление в корзину'})
  @ApiResponse({status:200,type: CartItem})
  @Post('/add')
  addCart(@Body() dto: AddCartDto) {
    return this.cartService.addItem(dto);
  }
  @ApiOperation({summary:'Коризна пользователя'})
  @ApiResponse({status:200,type: Cart})
  @Get('/:id')
  getCart(@Param('id') id: number) {
    return this.cartService.getCart(id);
  }
  @ApiOperation({summary:'Удаление всех корзины или совершение закзаза'})
  @ApiResponse({status:200,type: Cart})
  @Delete('/:id')
  delCart(@Param('id') id: number) {
    return this.cartService.delCart(id);
  }
  @ApiOperation({summary:'Удаление одного предмета'})
  @ApiResponse({status:200,type: Cart})
  @Delete('/item/del/one')
  delCartItemOne(@Body() dto:AddCartDto){
    return this.cartService.delCartItemOne(dto)
  }
  @ApiOperation({summary:'Удаление предмета'})
  @ApiResponse({status:200,type: Cart})
  @Delete('/item/del')
  delCartItem(@Body() dto:AddCartDto){
    return this.cartService.delCartItem(dto)
  }
}
