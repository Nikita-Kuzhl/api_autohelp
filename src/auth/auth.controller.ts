import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create_user.dto';
import { ApiTags } from '@nestjs/swagger';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('/signin')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }
  @Post('/signup')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
  }
}
