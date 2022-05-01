import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create_user.dto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByTelephone(
      userDto.telephone,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким номером телефона уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  async generateToken(user: User) {
    const payload = {
      telephone: user.telephone,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByTelephone(userDto.telephone);
    if (!user) {
      throw new HttpException(
        'Пользователя не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message:'Неверный пароль'})
  }
}
