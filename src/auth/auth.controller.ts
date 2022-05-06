import { LogInUserDto } from './dto/log-in.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create_user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @ApiOperation({summary:'Авторизацая'})
  @ApiResponse({status:200,description:"Получение токена"})
  @Post('/signin')
  login(@Body() userDto: LogInUserDto) {
    return this.authService.login(userDto)
  }
  @ApiOperation({summary:'Регистрация'})
  @ApiResponse({status:200,description:"Получение токена"})
  @Post('/signup')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }
}
