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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dtos/customer.dtos';
import { CustomerService } from '../services/customer.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiOperation({ summary: 'Total count of customers' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.customerService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of customers' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterCustomerDto) {
    const user = req.user as PayloadToken;
    return this.customerService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One customer' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.customerService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create customers' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateCustomerDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.customerService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update customers' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    const user = req.user as PayloadToken;
    return this.customerService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove customers' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.customerService.delete(user.sub, rowid);
  }
}
