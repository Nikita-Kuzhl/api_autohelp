import { AddCartDto } from './dto/add-cart.dto';
import { CartService } from './cart.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('/add')
  addCart(@Body() dto: AddCartDto) {
    return this.cartService.addItem(dto);
  }
  @Get('/:id')
  getCart(@Param('id') id: number) {
    return this.cartService.getCart(id);
  }
  @Delete('/:id')
  delCart(@Param('id') id: number) {
    return this.cartService.delCart(id);
  }
  delCartItem(){
    
  }
}
