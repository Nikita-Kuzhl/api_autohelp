import { RolesGuard } from 'src/auth/role.guard';
import { CreateOrderDto } from './dto/orders.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Orders } from './orders.model';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
@ApiTags('Заказы')
@Controller('/order')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 200, type: Orders })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addOrder(@Body() dto: CreateOrderDto, @Req() req: any) {
    dto.userId = req.user.id;
    return this.ordersService.create(dto);
  }
  @ApiOperation({ summary: 'Получение заказов пользователя' })
  @ApiResponse({ status: 200, type: Orders })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getByUser(@Req() req: any) {
    const id = req.user.id;
    return this.ordersService.getByUser(id);
  }
  @ApiOperation({ summary: 'Отмена заказа' })
  @ApiResponse({ status: 200, type: 'ok' })
  @UseGuards(JwtAuthGuard)
  @Post('/canceled/:id')
  canceledOrder(@Param('id') id: number) {
    return this.ordersService.canceledOrder(id);
  }
  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: 'ok' })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }
  @ApiOperation({ summary: 'Обновление статуса' })
  @ApiResponse({ status: 200, type: 'Ok' })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/update/status/:id')
  updateStatus(@Param(':id') id: number, @Body() { status, comment }) {
    return this.ordersService.updateStatus(id, status, comment);
  }
  @ApiOperation({ summary: 'Добавление комментария к заказу' })
  @ApiResponse({ status: 200, type: Orders })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/comment/add/:id')
  addComment(@Param(':id') id: number, @Body() comment: string) {
    return this.ordersService.addComment(id, comment);
  }
}
