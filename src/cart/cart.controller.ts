import { User } from './../users/users.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CartItem } from './../cart_item/cart-item.model';
import { Cart } from 'src/cart/cart.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddCartDto } from './dto/add-cart.dto';
import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@ApiTags('Корзина')
@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @ApiOperation({ summary: 'Добавление в корзину' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: CartItem })
  @Post('/add')
  addCart(@Body() dto: AddCartDto, @Req() all: any) {
    console.log(dto);
    dto.userId = all.user.id;
    return this.cartService.addItem(dto);
  }
  @ApiOperation({ summary: 'Коризна пользователя' })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getCart(@Req() all: any) {
    const user: number = all.user.id;
    return this.cartService.getCart(user);
  }
  @ApiOperation({ summary: 'Удаление всех корзины или совершение закзаза' })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(JwtAuthGuard)
  @Delete('/')
  delCart(@Req() all: any) {
    const id = all.user.id;
    return this.cartService.delCart(id);
  }

  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(JwtAuthGuard)
  @Delete('/item/del')
  delCartItem(@Body() dto: AddCartDto, @Req() all: any) {
    dto.userId = all.user.id;
    return this.cartService.delCartItem(dto);
  }
}
