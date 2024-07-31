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
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  FilterPaymentMethodDto,
} from '../dtos/payment_method.dtos';
import { PaymentMethodService } from '../services/payment_method.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Payment Methods')
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'Total count of payment methods' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.paymentMethodService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of payment methods' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterPaymentMethodDto) {
    const user = req.user as PayloadToken;
    return this.paymentMethodService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One payment method' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.paymentMethodService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create payment methods' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreatePaymentMethodDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.paymentMethodService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update payment methods' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdatePaymentMethodDto,
  ) {
    const user = req.user as PayloadToken;
    return this.paymentMethodService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove payment methods' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.paymentMethodService.delete(user.sub, rowid);
  }
}
