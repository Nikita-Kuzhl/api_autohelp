import { CartService } from './../cart/cart.service';
import { Orders, StatusOrdersType } from './orders.model';
import { InjectModel } from '@nestjs/sequelize';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpException } from '@nestjs/common';
import { CreateOrderDto } from './dto/orders.dto';
import * as moments from 'moment';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders) private ordersRepository: typeof Orders,
    private cartServise: CartService,
  ) {}
  async create(dto: any) {
    const products = [];
    dto.products.map((item) => products.push(item.products));
    const price = products.reduce((prev, curent) => (prev += curent.price), 0);
    dto.products = JSON.stringify(products);
    const order = await this.ordersRepository.create({ ...dto, price });
    await this.cartServise.delCart(dto.userId);
    return order;
  }
  async getAll() {
    const orders = await this.ordersRepository.findAll();
    orders.forEach((item) => (item.products = JSON.parse(item.products)));
    return orders;
  }
  async getByUser(id: number) {
    const orders = await this.ordersRepository.findAll({
      where: { userId: id },
    });
    if (!orders) {
      throw new HttpException({ message: 'Заказы отсутсвуют' }, 200);
    }
    orders.forEach((item) => {
      item.products = JSON.parse(item.products);
      item.date = moments(String(item.date)).format('DD.MM.YYYY HH:mm');
    });
    return orders;
  }
  async canceledOrder(id: number) {
    await this.ordersRepository.update(
      { status: StatusOrdersType.Canceled },
      { where: { id } },
    );
    return new HttpException({ message: 'Ok' }, 200);
  }
  async updateStatus(id: number, status: string, comment: string) {
    try {
      if (
        status === StatusOrdersType.Canceled ||
        status === StatusOrdersType.Canceled ||
        status === StatusOrdersType.Completed
      ) {
        await this.ordersRepository.update(
          { status, comment },
          { where: { id: id } },
        );
      }
      return new HttpException({ message: 'Ok' }, 200);
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }
  async addComment(id: number, comment: string) {
    await this.ordersRepository.update({ comment }, { where: { id } });
    return new HttpException({ message: 'Ok' }, 200);
  }
}
