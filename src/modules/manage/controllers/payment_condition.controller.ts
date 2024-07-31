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
  CreatePaymentConditionDto,
  UpdatePaymentConditionDto,
  FilterPaymentConditionDto,
} from '../dtos/payment_condition.dtos';
import { PaymentConditionService } from '../services/payment_condition.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Payment Conditions')
@Controller('payment-conditions')
export class PaymentConditionController {
  constructor(private paymentConditionService: PaymentConditionService) {}

  @ApiOperation({ summary: 'Total count of payments conditions' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.paymentConditionService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of payments conditions' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterPaymentConditionDto) {
    const user = req.user as PayloadToken;
    return this.paymentConditionService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One payment condition' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.paymentConditionService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create payments conditions' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreatePaymentConditionDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.paymentConditionService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update payments conditions' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdatePaymentConditionDto,
  ) {
    const user = req.user as PayloadToken;
    return this.paymentConditionService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove payments conditions' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.paymentConditionService.delete(user.sub, rowid);
  }
}
