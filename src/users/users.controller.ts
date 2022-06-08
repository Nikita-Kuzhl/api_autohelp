import { UpdateUserDto } from './dto/update_user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { RolesGuard } from './../auth/role.guard';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @ApiOperation({ summary: 'Обновления данных пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/update/:id')
  update(@Body() userDto: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.updateUser(userDto, id);
  }
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/delete/:id')
  delUser(@Param('id') id: number) {
    return this.usersService.delUser(id);
  }
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
  @ApiOperation({ summary: 'Получение информации о пользователе' })
  @ApiResponse({ status: 200, type: User })
  @Roles('user')
  @UseGuards(JwtAuthGuard)
  @Get('/user/')
  getUserByToken(@Req() req: any) {
    const id = req.user.id;
    return this.usersService.getUserByToken(id);
  }
}
