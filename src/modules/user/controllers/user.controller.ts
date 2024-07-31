import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dtos';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Total count of users' })
  @Get('count')
  count() {
    return this.userService.count();
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List of users' })
  @Get()
  get(@Query() params: FilterUserDto) {
    return this.userService.findAll(params);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'One user' })
  @Get(':rowid')
  getOne(@Param('rowid', ParseIntPipe) rowid: number) {
    return this.userService.findOne(rowid);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create users' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update users' })
  @Patch(':rowid')
  update(@Param('rowid') rowid: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(rowid, payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remove users' })
  @Delete(':rowid')
  delete(@Param('rowid') rowid: number) {
    return this.userService.delete(rowid);
  }
}
