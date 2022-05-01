import { CreateRoleDyo } from './dto/create_role.dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDyo) {
    return this.roleService.createRole(dto);
  }
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}