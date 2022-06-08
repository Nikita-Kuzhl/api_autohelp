import { CategoryService } from './../category/category.service';
import { CategoryModule } from './../category/category.module';
import { CartItem } from './cart-item.model';
import { CartItemService } from './cart-item.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from 'src/cart/cart.model';

@Module({
  imports: [SequelizeModule.forFeature([CartItem])],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
