import { CartModule } from './../cart/cart.module';
import { AuthModule } from './../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([Orders]), AuthModule, CartModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
