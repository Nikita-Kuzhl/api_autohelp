import { ValidationPipe } from './../pipes/validation.pipe';
import { RolesGuard } from './../auth/role.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({summary:'Создание пользователя'})
  @ApiResponse({status:200,type: User})
  @Post('/add')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @ApiOperation({summary:'Получение всех пользователей'})
  @ApiResponse({status:200,type: [User]})
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

}
